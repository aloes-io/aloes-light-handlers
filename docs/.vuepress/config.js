module.exports = {
  title: 'Aloes Light Handlers',
  base: '/aloes-light-handlers/',
  dest: 'public',
  themeConfig: {
    logo: '/logo.png',
    repo: 'https://framagit.org/aloes/aloes-light-handlers',
    repoLabel: 'Git',
    docsDir: 'docs',
    nav: [{text: 'AloesLight', link: '/aloeslight/'}],
    sidebar: [['/readme/', 'Readme'], ['/aloeslight/', 'AloesLight']],
    serviceWorker: {
      updatePopup: true, // Boolean | Object, default to undefined.
      // If set to true, the default text config will be:
      updatePopup: {
        message: 'New content is available.',
        buttonText: 'Refresh',
      },
    },
  },
};
