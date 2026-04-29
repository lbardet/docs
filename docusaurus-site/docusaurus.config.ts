import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "idOS Documentation",
  tagline: "Identity Operating System — self-custodial data for the onchain economy",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://docs.idos.network",
  baseUrl: "/",

  organizationName: "idos-network",
  projectName: "gitbook",

  // Warn rather than throw so a few stale GitBook internal refs don't block the build
  onBrokenLinks: "warn",
  markdown: {
    // Treat .md files as standard CommonMark (not MDX) to avoid JSX-parse
    // errors on GitBook content that uses bare {, <br>, etc.
    format: "detect",
    hooks: {
      onBrokenMarkdownLinks: "warn",
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
          sidebarPath: "./sidebars.ts",
          // Serve docs at site root (no /docs/ prefix) to match GitBook URLs
          routeBasePath: "/",
          editUrl: "https://github.com/idos-network/gitbook/edit/main/",
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
        src: "img/idos-logo.jpg",
        srcDark: "img/idos-logo.jpg",
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
