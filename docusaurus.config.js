// docusaurus.config.js — dark-only config (overwrite)
let lightCodeTheme;
let darkCodeTheme;

try {
  lightCodeTheme = require('prism-react-renderer/themes/github');
  darkCodeTheme = require('prism-react-renderer/themes/dracula');
} catch (e) {
  try {
    lightCodeTheme = require('prism-react-renderer/themes/oceanicNext');
    darkCodeTheme = require('prism-react-renderer/themes/vsDark');
  } catch (err) {
    lightCodeTheme = undefined;
    darkCodeTheme = undefined;
  }
}

module.exports = {
  title: 'Zocah Docs',
  tagline: 'Build without local installs. Deploy without DevOps hires.',
  url: 'https://zocah.github.io',
  baseUrl: '/zocah-docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'zocah',
  projectName: 'zocah-docs',
  i18n: { defaultLocale: 'en', locales: ['en'] },

  // early script still helpful (we will force dark there)
  scripts: [{ src: '/js/theme-init.js', async: false }],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/zocah/zocah-docs/edit/main',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          routeBasePath: 'blog',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Zocah',
      
      logo: { alt: 'Zocah', src: 'static/img/logo.svg' },
      items: [
        { to: '/docs/api', label: 'Docs', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { href: 'https://github.com/zocah/zocah', label: 'GitHub', position: 'right' },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        { title: 'Docs', items: [{ label: 'API', to: '/docs/api' }] },
        { title: 'Community', items: [{ label: 'GitHub', href: 'https://github.com/zocah' }] },
      ],
      copyright: `© ${new Date().getFullYear()} Zocah`,
    },

    // DARK-ONLY: defaultMode 'dark' + disableSwitch true (hides toggle)
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

    prism: {
      theme: lightCodeTheme ?? undefined,
      darkTheme: darkCodeTheme ?? undefined,
    },
  },
};
