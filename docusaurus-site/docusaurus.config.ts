import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { gitbookRemarkPlugin } from "./gitbookRemarkPlugin";

const githubEditUrl =
  "https://github.com/idos-network/gitbook/edit/master/";

const config: Config = {
  title: "idOS Documentation",
  tagline: "Identity Operating System — self-custodial data for the onchain economy",
  favicon: "img/idos.svg",

  future: {
    v4: true,
  },

  url: "https://docs.idos.network",
  baseUrl: "/",

  organizationName: "idos-network",
  projectName: "gitbook",

  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",
  onDuplicateRoutes: "throw",
  markdown: {
    // Treat .md files as standard CommonMark (not MDX) to avoid JSX-parse
    // errors on GitBook content that uses bare {, <br>, etc.
    format: "detect",
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },

  stylesheets: [
    {
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      type: "text/css",
    },
  ],

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    [
      "@signalwire/docusaurus-plugin-llms-txt",
      {
        content: {
          enableMarkdownFiles: true,
        },
      },
    ],
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: "/",
        docsDir: "..",
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          path: "..",
          include: ["**/*.md"],
          exclude: [
            "docusaurus-site/**",
            "node_modules/**",
            ".git/**",
            ".github/**",
            ".gitbook/**",
            "SUMMARY.md",
            "how-it-works/bug-bounty-program.md",
            "integrate/copy-of-idos-sdks.md",
            "integrate/getting-started-with-the-sdks.md",
          ],
          sidebarPath: "./sidebars.ts",
          // Serve docs at site root (no /docs/ prefix) to match GitBook URLs
          routeBasePath: "/",
          editUrl: ({ docPath }) =>
            `${githubEditUrl}${docPath.replace(/^\.\.\//, "")}`,
          beforeDefaultRemarkPlugins: [gitbookRemarkPlugin],
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "idOS Documentation",
      logo: {
        alt: "idOS Logo",
        src: "img/idos.svg",
        srcDark: "img/idos.svg",
      },
      items: [
        {
          href: "https://idos.network",
          label: "idos.network",
          position: "right",
        },
        {
          href: "https://github.com/idos-network",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} idOS Association. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
