import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../Tooltip/Tooltip.ts';

const meta: Meta = {
    title: 'LitComponents/Tooltip',
    tags: ['autodocs'],
    render: (args) => html`
      <div style="display: flex; justify-content: center; align-items: center; height: 100px; padding: 10px;">
        <lit-tooltip .position="${args.position}">${args.slot}</lit-tooltip>
      </div>
    `,
    argTypes: {
        slot: {
            control: 'text',
            description: 'Tooltip message',
            defaultValue: 'This is a tooltip!'
        },
        position: {
            control: { type: 'select' },
            options: ['top', 'bottom', 'left', 'right'],
            description: 'Tooltip position',
            defaultValue: 'top'
        }
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        slot: 'This is a tooltip for the card title.',
        position: 'top',
    },
};

export const Bottom: Story = {
    args: {
        slot: 'This is a tooltip for the card title.',
        position: 'bottom',
    },
};

export const Left: Story = {
    args: {
        slot: 'This is a tooltip for the card title.',
        position: 'left',
    },
};

export const Right: Story = {
    args: {
        slot: 'This is a tooltip for the card title.',
        position: 'right',
    },
};