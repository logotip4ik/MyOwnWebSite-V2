/* eslint-disable global-require */
export default [
  {
    name: 'Color Game',
    img: require('./assets/ColorGameLogo.png'),
    desc: "This is simple game in web. You need to guess color by it's hex.",
    techUsed: [
      { id: Math.random() * 100, content: 'Javascript' },
      { id: Math.random() * 100, content: 'Vue' },
      { id: Math.random() * 100, content: 'Vuetify' },
      { id: Math.random() * 100, content: 'IndexDB' },
    ],
    source: 'https://github.com/logotip4ik/ColorGame',
    live: 'https://color-game-virid.vercel.app/',
  },
  {
    name: 'My journal',
    img: require('./assets/MyJournalLogo.png'),
    desc: 'Simple Vue project with index db for logging my homework.',
    techUsed: [
      { id: Math.random() * 100, content: 'Javascript' },
      { id: Math.random() * 100, content: 'Vue' },
      { id: Math.random() * 100, content: 'Vuetify' },
      { id: Math.random() * 100, content: 'IndexDB' },
    ],
    source: 'https://github.com/logotip4ik/My-journal',
    live: 'https://my-journal.vercel.app/',
  },
  {
    name: 'Todo Web App',
    img: require('./assets/TodoWebAppLogo.png'),
    desc: 'Your todos in browser. Synced between all devices.',
    techUsed: [
      { id: Math.random() * 100, content: 'Javascript' },
      { id: Math.random() * 100, content: 'NodeJS' },
      { id: Math.random() * 100, content: 'Vue' },
      { id: Math.random() * 100, content: 'Vuetify' },
      { id: Math.random() * 100, content: 'Feathers.js' },
    ],
    source: 'https://github.com/logotip4ik/TodoWebApp',
    live: 'https://todo-web-app.vercel.app',
  },
  {
    name: 'Pixel Drawer',
    img: require('./assets/PixelDrawerLogo.png'),
    desc: 'Website were you can draw your staff in pixel theme.',
    techUsed: [
      { id: Math.random() * 100, content: 'Javascript' },
      { id: Math.random() * 100, content: 'Vue' },
      { id: Math.random() * 100, content: 'Vuetify' },
    ],
    source: 'https://github.com/logotip4ik/Pixel-Drawer',
    live: 'https://pixel-drawer.vercel.app',
  },
];