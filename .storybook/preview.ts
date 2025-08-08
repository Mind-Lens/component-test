import type { Preview } from "@storybook/web-components";
import { themes } from '@storybook/theming';
import './preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      // Override the default dark theme
      dark: { ...themes.dark, },
      // Override the default light theme
      light: { ...themes.normal },
      classTarget: 'html',
      stylePreview: true,
      // Configure iframe background
      current: 'light'
    }
  },
};

export default preview;
