import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "storybook-dark-mode"
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
};
export default config;

//import type { StorybookConfig } from "@storybook/react-vite";

//const config: StorybookConfig = {
//  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
//  addons: [
//    "@storybook/addon-onboarding",
//    "@storybook/addon-links",
//    "@storybook/addon-essentials",
//    "@chromatic-com/storybook",
//    "@storybook/addon-interactions",
//  ],
//  framework: {
//    name: "@storybook/react-vite",
//    options: {},
//  },
//};
//export default config;
