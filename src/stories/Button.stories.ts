import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../Button/Button.ts';

const meta: Meta = {
  title: 'LitComponents/Button',
  tags: ['autodocs'],
  render: (args) => html`
      <lit-button variant=${args.variant} color=${args.color} icon=${args.icon} ?disabled=${args.disabled} type=${args.type} href=${args.href} target=${args.target} rel=${args.rel}>${args.text}</lit-button>  
  `,
  argTypes: {
    text: {
      if: { arg: 'variant', neq: 'icon-only' },
      control: { type: 'text' },
    },
    variant: {
      control: { type: 'select' },
      options: [
        'text-only',
        'left-icon',
        'right-icon',
        'icon-only',
      ]
    },
    color: {
      control: { type: 'select' },
      options: [
        'btn-info',
        'btn-info-secondary',
        'btn-success',
        'btn-success-secondary',
        'btn-warning',
        'btn-warning-secondary',
        'btn-error',
        'btn-error-secondary',
      ]
    },
    icon: {
      if: { arg: 'variant', neq: 'text-only' },
      control: { type: 'select' },
      options: [
        'info',
        'error',
        'warning',
        'success',
        'internet-lost',
        'close',
        'info-service',
        'edit'
      ],
      description: 'Name of the icon to display (for icon variants)'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled'
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'link'],
      description: 'Button type: button or link'
    },
    href: {
      if: { arg: 'type', eq: 'link' },
      control: { type: 'text' },
      description: 'Link URL (used when type is link)'
    },
    target: {
      if: { arg: 'type', eq: 'link' },
      control: { type: 'select' },
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Link target (used when type is link)'
    },
    rel: {
      if: { arg: 'type', eq: 'link' },
      control: { type: 'text' },
      description: 'Link rel (used when type is link)'
    },
  },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-info",
    type: 'button',
    disabled: false
  }
}

export const InfoSecondary: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-info-secondary",
    disabled: false
  }
}

export const Success: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-success",
    disabled: false
  }
}
export const SuccessSecondary: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-success-secondary",
    disabled: false
  }
}

export const Warning: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-warning",
    disabled: false
  }
}
export const WarningSecondary: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-warning-secondary",
    disabled: false
  }
}

export const Error: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-error",
    disabled: false
  }
}
export const ErrorSecondary: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-error-secondary",
    disabled: false
  }
}

export const Link: Story = {
  args: {
    type: 'link',
    href: 'https://www.google.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    variant: 'text-only',
    text: 'Go to Google',
    color: 'btn-info',
    disabled: false,
    icon: 'info',
  }
}

export const EditLink: Story = {
  args: {
    variant: 'left-icon',
    text: 'Edit',
    color: 'btn-info',
    disabled: false,
    type: 'link',
    href: 'https://www.google.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    icon: 'edit',
  }
}