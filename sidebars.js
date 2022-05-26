/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
  // introSidebar: [{type: 'autogenerated', dirName: 'how-aztec-works'}],
  // guidesSidebar: [{type: 'autogenerated', dirName: 'guides'}],
  docs: [
    'intro',
    {
      type: 'category',
      label: 'How Aztec Works',
      link:{
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        'how-aztec-works/privacy',
        'how-aztec-works/aztec-connect',
        'how-aztec-works/accounts',
        'how-aztec-works/tokens',
        'how-aztec-works/talks-videos',
        'how-aztec-works/faq'
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      link:{
        type: 'generated-index',
      },
      items: [
        'guides/overview',
        'guides/wallet-support',
        'guides/create-bridge',
        'guides/element-review',
        'guides/lido-review',
        'guides/goerli-testing',
      ],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
};

module.exports = sidebars;
