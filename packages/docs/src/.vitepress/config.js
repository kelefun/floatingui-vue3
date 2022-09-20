module.exports = {
  title: 'Floatingui Vue3',
  description: 'Tooltips & dropdowns made easy',
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],

  themeConfig: {
    repo: 'https://github.com/kelefun',
    editLinks: true,
    docsDir: 'packages/docs/src',
    docsBranch: 'next',
    editLinkText: '',
    lastUpdated: true,
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'API Reference',
        link: '/api/',
      },
      {
        text: 'Theme editor',
        link: '/theme-editor',
      },
      {
        text: '💚️ Sponsor',
        link: 'https://github.com/sponsors/kelefun',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'installation',
            'component',
            'directive',
            'config',
            'themes',
            'css',
            'custom-component',
          ],
        },
      ],
    },
  },
}
