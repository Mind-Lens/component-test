import type { Preview } from "@storybook/web-components-vite";
import { Decorator } from "@storybook/web-components";

const THEMES = {
  light: "theme-light",
  dark: "theme-dark",
  brand: "theme-brand",
};

const withTheme: Decorator = (storyFn, context) => {
  const theme = context.globals.theme || "light";
  // Remove all theme classes
  Object.values(THEMES).forEach((cls) => document.body.classList.remove(cls));
  // Add the selected theme class
  document.body.classList.add(THEMES[theme]);
  return storyFn();
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withTheme],
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "brand", title: "Brand" },
        ],
        showName: true,
      },
    },
  },
};

export default preview;
