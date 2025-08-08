import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import "../../dist/index.js"

const meta: Meta = {
  title: 'LitPlayground/Icon',
  tags: ['autodocs'],
  render: (args) => html`
      <lit-icon icon=${args.icon} size=${args.size} class=${args.class || ''}></lit-icon>  
  `,
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: [
        'info',
        'success',
        'warning',
        'error',
        'close'
      ]
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l']
    },
    class: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    icon: "info",
    size: "m"
  }
}

export const Small: Story = {
  args: {
    icon: "info",
    size: "s"
  }
}

export const Large: Story = {
  args: {
    icon: "info",
    size: "l"
  }
}



export const WithCustomClass: Story = {
  args: {
    icon: "info",
    size: "m",
    class: "text-blue-500"
  }
}

export const Success: Story = {
  args: {
    icon: "success",
    size: "m"
  }
}

export const Warning: Story = {
  args: {
    icon: "warning",
    size: "m"
  }
}

export const Error: Story = {
  args: {
    icon: "error",
    size: "m"
  }
}

export const Close: Story = {
  args: {
    icon: "close",
    size: "m"
  }
}

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <lit-icon icon="info" size="s"></lit-icon>
      <lit-icon icon="info" size="m"></lit-icon>
      <lit-icon icon="info" size="l"></lit-icon>
    </div>
  `
}

export const AllIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <lit-icon icon="info" size="m"></lit-icon>
      <lit-icon icon="success" size="m"></lit-icon>
      <lit-icon icon="warning" size="m"></lit-icon>
      <lit-icon icon="error" size="m"></lit-icon>
      <lit-icon icon="close" size="m"></lit-icon>
    </div>
  `
}
