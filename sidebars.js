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
  docsSidebar: [
    "intro",
    {
      type: "category",
      label: "How Nata Network Works",
      link: {
        type: "generated-index",
      },
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Privacy",
          link: {
            type: "doc",
            id: "how-natanetwork-works/privacy",
          },
          items: ["how-natanetwork-works/privacy-sets"],
        },
        "how-natanetwork-works/accounts",
        "how-natanetwork-works/tokens",
        "how-natanetwork-works/earn",
        "how-natanetwork-works/Tokenomics",
        "how-natanetwork-works/roadmap",
        "how-natanetwork-works/faq",
      ],
    },
    {
      type: "category",
      label: "Technical Specification",
      items: [
        "spec/SUMMARY",
        "spec/intro",
        {
          type: "category",
          label: "General",
          items: [
            "spec/primitives",
            {
              type: "doc",
              id: "spec/schnorr",
              label: "Schnorr Signatures",
            },
            "spec/schnorr_multisig",
            {
              type: "doc",
              id: "spec/uint",
              label: "Unsigned Integers",
            },
            "spec/notes_and_nullifiers",
          ],
        },
        {
          type: "category",
          label: "'App' Circuits",
          items: [
            "spec/account_circuit",
            "spec/join_split_circuit",
          ],
        },
        {
          type: "category",
          label: "Rollup Circuits",
          items: [
            "spec/rollup_circuit",
            "spec/root_rollup_circuit",
            "spec/root_verifier_circuit",
          ],
        },
        "spec/rollup_contract",
      ],
    },
    "compliance",
    "glossary",
  ],
  nataNetworkSidebar: [
    "app/userguide",
    "app/fees",
    "app/assetvaluation",
    "app/troubleshooting"
  ],
  nataRouterSidebar: [
    "router/userguide",
    "router/routes"
  ],
};

module.exports = sidebars;
