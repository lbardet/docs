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

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

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
      title: "idOS Docs",
      logo: {
        alt: "idOS Logo",
        src: "img/logo.svg",
        srcDark: "img/logo.svg",
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
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "idOS",
          items: [
            { label: "Website", href: "https://idos.network" },
            { label: "Dashboard", href: "https://dashboard.idos.network" },
            { label: "GitHub", href: "https://github.com/idos-network" },
          ],
        },
        {
          title: "Community",
          items: [
            { label: "Twitter / X", href: "https://twitter.com/idOS_network" },
            { label: "Discord", href: "https://discord.gg/idos" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} idOS Association. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
