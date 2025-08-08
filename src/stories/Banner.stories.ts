import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import "../../dist/index.js"

const meta: Meta = {
  title: 'LitPlayground/Banner',
  tags: ['autodocs'],
  render: (args) => html`
    <lit-banner 
      type=${args.type} 
      size=${args.size}
      variant=${args.variant || ''}
      ?show-close-button=${args.showCloseButton}
      title=${args.title || ''}
      timeout=${args.timeout || ''}
      theme=${args.theme || 'light'}
    >
      ${args.content}
    </lit-banner>
  `,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error', 'internet-lost'],
      description: 'The type of banner'
    },
    size: {
      control: { type: 'select' },
      options: ['m', 'l', 'xl', 'full'],
      description: 'The size of the banner'
    },
    variant: {
      control: { type: 'select' },
      options: ['notification', 'page-banner'],
      description: 'The variant of the banner'
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'brand'],
      description: 'The theme of the banner'
    },
    showCloseButton: {
      control: { type: 'boolean' },
      description: 'Whether to show the close button'
    },
    title: {
      control: { type: 'text' },
      description: 'The title of the banner (only shown for page-banner variant)'
    },
    timeout: {
      control: { type: 'number' },
      description: 'Timeout in seconds before auto-hiding'
    },
    content: {
      control: { type: 'text' },
      description: 'The content of the banner'
    }
  },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: {
    type: 'info',
    size: 'xl',
    content: 'This is an informational banner with important details.',
    showCloseButton: true
  }
}

export const Success: Story = {
  args: {
    type: 'success',
    size: 'xl',
    content: 'Operation completed successfully!',
    showCloseButton: true
  }
}

export const Warning: Story = {
  args: {
    type: 'warning',
    size: 'xl',
    content: 'Please review your input before proceeding.',
    showCloseButton: true
  }
}

export const Error: Story = {
  args: {
    type: 'error',
    size: 'xl',
    content: 'An error occurred while processing your request.',
    showCloseButton: true
  }
}

export const InternetLost: Story = {
  args: {
    type: 'internet-lost',
    size: 'xl',
    content: 'Connection lost. Please check your internet connection.',
    showCloseButton: true
  }
}

export const PageBanner: Story = {
  args: {
    type: 'info',
    size: 'full',
    variant: 'page-banner',
    title: 'Page Banner Title',
    content: 'This is a page banner with a title and content.',
    showCloseButton: true
  }
}

export const Notification: Story = {
  args: {
    type: 'success',
    size: 'l',
    variant: 'notification',
    content: 'This is a notification banner that appears at the top of the page.',
    showCloseButton: true
  }
}

export const WithTimeout: Story = {
  args: {
    type: 'info',
    size: 'xl',
    content: 'This banner will auto-hide after 5 seconds.',
    showCloseButton: true,
    timeout: 5
  }
}

export const SmallSize: Story = {
  args: {
    type: 'info',
    size: 'm',
    content: 'This is a small banner.',
    showCloseButton: true
  }
}

export const LargeSize: Story = {
  args: {
    type: 'info',
    size: 'l',
    content: 'This is a large banner.',
    showCloseButton: true
  }
}

export const DarkTheme: Story = {
  args: {
    type: 'info',
    size: 'xl',
    content: 'This banner uses the dark theme.',
    showCloseButton: true,
    theme: 'dark'
  }
}

export const BrandTheme: Story = {
  args: {
    type: 'info',
    size: 'xl',
    content: 'This banner uses the brand theme.',
    showCloseButton: true,
    theme: 'brand'
  }
}

export const AllTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <lit-banner type="info" size="xl" theme="light">
        Information banner
      </lit-banner>
      <lit-banner type="success" size="xl" theme="light">
        Success banner
      </lit-banner>
      <lit-banner type="warning" size="xl" theme="light">
        Warning banner
      </lit-banner>
      <lit-banner type="error" size="xl" theme="light">
        Error banner
      </lit-banner>
      <lit-banner type="internet-lost" size="xl" theme="light">
        Internet lost banner
      </lit-banner>
    </div>
  `
}

export const AllThemes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <lit-banner type="info" size="xl" theme="light">
        Light theme banner
      </lit-banner>
      <lit-banner type="info" size="xl" theme="dark">
        Dark theme banner
      </lit-banner>
      <lit-banner type="info" size="xl" theme="brand">
        Brand theme banner
      </lit-banner>
    </div>
  `
}

