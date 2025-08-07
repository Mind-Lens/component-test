import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../Icon/Icon.ts';

const meta: Meta = {
    title: 'LitComponents/Icon',
    tags: ['autodocs'],
    render: (args) => html`
      <lit-icon class="icon" .icon="${args.icon}" .variant="${args.variant}"></lit-icon>
    `,
    argTypes: {
        icon: {
            control: { type: 'select' },
            options: ["info", "error", "warning", "success", "internet-lost", "close", "info-service"],
        },
        variant: {
            control: { type: 'select' },
            options: ["s", "m", "l"],
        },
    },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
    args: {
        icon: "info",
        variant: "m"
    }
}

export const Error: Story = {
    args: {
        icon: "error",
        variant: "m"
    }
}

export const Warning: Story = {
    args: {
        icon: "warning",
        variant: "m"
    }
}

export const Success: Story = {
    args: {
        icon: "success",
        variant: "m"
    }
}

export const InternetLost: Story = {
    args: {
        icon: "internet-lost",
        variant: "m"
    }
}

export const InfoService: Story = {
    args: {
        icon: "info-service",
        variant: "m"
    }
}

export const Close: Story = {
    args: {
        icon: "close",
        variant: "m"
    }
}

export const Edit: Story = {
    args: {
        icon: "edit",
        variant: "m"
    }
}