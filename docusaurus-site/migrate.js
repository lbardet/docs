#!/usr/bin/env node
// Migration script: GitBook → Docusaurus
// Reads from /home/user/gitbook, writes into docs/ and static/assets/

const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");
const DOCS_OUT = path.resolve(__dirname, "docs");
const STATIC_ASSETS_OUT = path.resolve(__dirname, "static/assets");

// ─── Helpers ────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFileSync(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

// Walk a directory, returning all file paths
function walkDir(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full, results);
    else results.push(full);
  }
  return results;
}

// ─── Asset copy ─────────────────────────────────────────────────────────────

function copyAssets() {
  const assetsDir = path.join(REPO_ROOT, ".gitbook", "assets");
  if (!fs.existsSync(assetsDir)) return;
  ensureDir(STATIC_ASSETS_OUT);
  const files = walkDir(assetsDir);
  for (const src of files) {
    const rel = path.relative(assetsDir, src);
    copyFileSync(src, path.join(STATIC_ASSETS_OUT, rel));
  }
  console.log(`✓ Copied ${files.length} assets → static/assets/`);
}

// ─── Markdown transformation ─────────────────────────────────────────────────

function transformMarkdown(content, relativeToRoot) {
  // 1. Fix image paths: .gitbook/assets/ or ../.gitbook/assets/ → /assets/
  content = content.replace(
    /src="(?:\.\.\/)*\.gitbook\/assets\/([^"]+)"/g,
    'src="/assets/$1"'
  );
  content = content.replace(
    /!\[([^\]]*)\]\((?:\.\.\/)*\.gitbook\/assets\/([^)]+)\)/g,
    "![$1](/assets/$2)"
  );

  // 1b. Decode HTML entities in asset paths (e.g. &#x26; → &)
  content = content.replace(
    /(!\[[^\]]*\]\(\/assets\/[^)]+)\)/g,
    (match) => match.replace(/&#x26;/g, '&').replace(/&#x20;/g, ' ')
  );
  content = content.replace(
    /(src="\/assets\/[^"]+)"/g,
    (match) => match.replace(/&#x26;/g, '&').replace(/&#x20;/g, ' ')
  );

  // 2. Convert GitBook <figure> tags to plain markdown images
  // <figure><img src="..." alt="text"><figcaption>caption</figcaption></figure>
  content = content.replace(
    /<figure><img\s+src="([^"]+)"\s+alt="([^"]*)"\s*(?:\/>|>)<figcaption>([^<]*)<\/figcaption><\/figure>/g,
    (_, src, alt, caption) => {
      const label = alt || caption || "";
      return `![${label}](${src})`;
    }
  );
  // Variant with no figcaption text
  content = content.replace(
    /<figure><img\s+src="([^"]+)"\s+alt="([^"]*)"\s*(?:\/>|>)<figcaption><\/figcaption><\/figure>/g,
    (_, src, alt) => `![${alt}](${src})`
  );
  // Any remaining bare <figure> tags
  content = content.replace(/<\/?figure>/g, "");

  // 3. Clean &#x20; (GitBook appends these as trailing spaces)
  content = content.replace(/&#x20;/g, " ");

  // 4. Clean other common HTML entities
  content = content.replace(/&#xD83D;/g, ""); // stray emoji bytes

  // 5. Clean GitBook's \ line-break escapes at end of lines
  // In GitBook source, \ at EOL means hard line break (rendered as <br>)
  // In Docusaurus/standard MD, two trailing spaces does the same but most
  // of the time these are just paragraph separators → replace with blank line
  content = content.replace(/\\\s*\n/g, "\n\n");

  // 6. Strip GitBook-specific frontmatter keys; keep description + title only if non-empty
  content = content.replace(/^---\n([\s\S]*?)\n---\n/, (match, fm) => {
    const lines = fm.split("\n");
    const kept = lines.filter((l) => {
      const colonIdx = l.indexOf(":");
      if (colonIdx === -1) return false;
      const key = l.slice(0, colonIdx).trim();
      const val = l.slice(colonIdx + 1).trim();
      // Keep only known safe keys with non-empty, non-null values
      return (
        ["description", "title", "slug"].includes(key) &&
        val !== "" &&
        val !== "null"
      );
    });
    if (kept.length === 0) return "";
    return `---\n${kept.join("\n")}\n---\n`;
  });

  return content;
}

// ─── Markdown file copy + transform ─────────────────────────────────────────

function collectMdFiles() {
  const ignore = new Set([
    "SUMMARY.md",
    "docusaurus-site",
    "node_modules",
    ".git",
    ".gitbook",
  ]);
  const results = [];

  function walk(dir, rel) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ignore.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      const relPath = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.isDirectory()) walk(full, relPath);
      else if (entry.name.endsWith(".md")) results.push({ full, rel: relPath });
    }
  }

  walk(REPO_ROOT, "");
  return results;
}

function copyMarkdown() {
  const files = collectMdFiles();
  let count = 0;

  for (const { full, rel } of files) {
    // README.md → index.md (Docusaurus convention for category pages)
    const destRel = rel.replace(/README\.md$/, "index.md");
    const dest = path.join(DOCS_OUT, destRel);

    let content = fs.readFileSync(full, "utf8");
    content = transformMarkdown(content, rel);

    // For the root README.md → add slug: / so it becomes the homepage
    if (rel === "README.md") {
      if (!content.startsWith("---")) {
        content = `---\nslug: /\n---\n\n${content}`;
      } else {
        content = content.replace(/^---\n/, "---\nslug: /\n");
      }
    }

    ensureDir(path.dirname(dest));
    fs.writeFileSync(dest, content, "utf8");
    count++;
  }

  console.log(`✓ Transformed and copied ${count} markdown files → docs/`);
}

// ─── Sidebar generation from SUMMARY.md ─────────────────────────────────────

function docId(mdPath) {
  // Convert a markdown file path (relative to repo root) to a Docusaurus doc id
  // e.g. "how-it-works/system-design.md" → "how-it-works/system-design"
  // "how-it-works/key-flows/README.md" → "how-it-works/key-flows/index"
  return mdPath
    .replace(/\.md$/, "")
    .replace(/\/README$/, "/index")
    .replace(/^README$/, "index");
}

function parseSummary() {
  const summary = fs.readFileSync(path.join(REPO_ROOT, "SUMMARY.md"), "utf8");
  const lines = summary.split("\n");

  const sidebar = [];
  const categoryStack = []; // stack of { label, items }
  let currentCategory = null;

  for (const line of lines) {
    // Section header: ## OVERVIEW  →  category label
    const sectionMatch = line.match(/^## (.+)/);
    if (sectionMatch) {
      if (currentCategory) sidebar.push(currentCategory);
      currentCategory = { type: "category", label: titleCase(sectionMatch[1]), items: [] };
      categoryStack.length = 0;
      categoryStack.push(currentCategory);
      continue;
    }

    // Horizontal rule (***) → close current category, start uncategorised
    if (line.trim() === "***") {
      if (currentCategory) sidebar.push(currentCategory);
      currentCategory = null;
      categoryStack.length = 0;
      continue;
    }

    // List item: * [Label](path.md) or   * [Label](path.md)
    const itemMatch = line.match(/^(\s*)\* \[([^\]]+)\]\(([^)]+)\)/);
    if (!itemMatch) continue;

    const indent = itemMatch[1].length;
    const label = itemMatch[2];
    const mdPath = itemMatch[3];

    // Skip anchor-only or external links
    if (mdPath.startsWith("http") || mdPath.startsWith("#")) continue;

    const id = docId(mdPath);
    const item = { type: "doc", id, label };

    if (indent === 0) {
      // Top-level item in current category
      const target = currentCategory || sidebar;
      if (currentCategory) {
        currentCategory.items.push(item);
      } else {
        sidebar.push(item);
      }
      categoryStack.length = currentCategory ? 1 : 0;
      if (currentCategory) categoryStack[0] = currentCategory;
      // Track as potential parent for nested items
      item._parent = currentCategory;
    } else {
      // Nested item: find the last top-level item and nest under it
      const parent = categoryStack[categoryStack.length - 1];
      if (parent && parent.items) {
        // Check if last item in parent should become a sub-category
        const siblings = parent.items;
        const last = siblings[siblings.length - 1];

        if (last && last.type === "doc") {
          // Promote last doc to a category if it gets children
          if (!last._children) {
            last._children = [];
          }
          last._children.push(item);
        } else if (last && last.type === "category") {
          last.items.push(item);
        }
      }
    }
  }

  if (currentCategory) sidebar.push(currentCategory);

  // Post-process: convert docs with _children into categories
  function promoteChildren(items) {
    const result = [];
    for (const item of items) {
      if (item._children && item._children.length > 0) {
        result.push({
          type: "category",
          label: item.label,
          link: { type: "doc", id: item.id },
          items: item._children.map((c) => {
            delete c._parent;
            return c;
          }),
        });
      } else {
        const clean = { ...item };
        delete clean._parent;
        delete clean._children;
        result.push(clean);
      }
    }
    return result;
  }

  function deepPromote(items) {
    return promoteChildren(items).map((item) => {
      if (item.type === "category") {
        item.items = deepPromote(item.items || []);
      }
      return item;
    });
  }

  return deepPromote(sidebar);
}

function titleCase(str) {
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function generateSidebars() {
  const items = parseSummary();
  const ts = `import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docs: ${JSON.stringify(items, null, 2)},
};

export default sidebars;
`;
  fs.writeFileSync(path.join(__dirname, "sidebars.ts"), ts, "utf8");
  console.log("✓ Generated sidebars.ts from SUMMARY.md");
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log("Starting GitBook → Docusaurus migration...\n");

// Clean docs/ output (keep intro.md placeholder deleted)
ensureDir(DOCS_OUT);
// Remove default Docusaurus placeholder docs
for (const f of fs.readdirSync(DOCS_OUT)) {
  const full = path.join(DOCS_OUT, f);
  fs.rmSync(full, { recursive: true, force: true });
}

copyAssets();
copyMarkdown();
generateSidebars();

console.log("\n✅ Migration complete!");
console.log("   Next: cd docusaurus-site && npm install && npm run build");
