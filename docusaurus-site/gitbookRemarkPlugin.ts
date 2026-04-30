import path from "node:path";

const repoRoot = path.resolve(__dirname, "..");

function decodeGitBookEntities(value: string): string {
  return value
    .replace(/&#x20;/g, " ")
    .replace(/&#x26;/g, "&")
    .replace(/&#xD83D;/g, "");
}

function rewriteGitBookAssetUrl(url: string, filePath?: string): string {
  const decodedUrl = decodeGitBookEntities(url);
  const assetPath = decodedUrl.replace(/^(?:\.\.\/)*\.gitbook\/assets\//, "");
  if (assetPath === decodedUrl || !filePath) {
    return decodedUrl;
  }

  const absoluteAssetPath = path.join(repoRoot, ".gitbook", "assets", assetPath);
  const relativeAssetPath = path
    .relative(path.dirname(filePath), absoluteAssetPath)
    .split(path.sep)
    .join("/");

  return encodeURI(relativeAssetPath);
}

function visitMarkdownAst(
  node: any,
  visitor: (node: any, index?: number, parent?: any) => void,
) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node.children)) {
    node.children.forEach((child: any, index: number) => {
      visitor(child, index, node);
      visitMarkdownAst(child, visitor);
    });
  }
}

export function gitbookRemarkPlugin() {
  return (tree: any, file: any) => {
    visitMarkdownAst(tree, (node, index, parent) => {
      if (typeof node.value === "string") {
        node.value = decodeGitBookEntities(node.value);
      }

      if (node.type === "image" && typeof node.url === "string") {
        node.url = rewriteGitBookAssetUrl(node.url, file.path);
      }

      if (node.type !== "html" || typeof node.value !== "string" || !parent) {
        return;
      }

      const figureMatch = node.value.match(
        /^<figure><img\s+src="([^"]+)"\s+alt="([^"]*)"\s*(?:\/>|>)<figcaption>(.*?)<\/figcaption><\/figure>$/s,
      );
      if (!figureMatch) return;

      const [, src, alt, caption] = figureMatch;
      parent.children.splice(index, 1, {
        type: "paragraph",
        children: [
          {
            type: "image",
            url: rewriteGitBookAssetUrl(src, file.path),
            alt: decodeGitBookEntities(alt || caption || ""),
          },
        ],
      });
    });
  };
}
