import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import "../../dist/index.js"

const meta: Meta = {
  title: 'LitPlayground/List',
  tags: ['autodocs'],
  render: (args) => html`
    <lit-list .data=${args.data}></lit-list>
  `,
  argTypes: {},
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: {
    data: ["item 1", "item 2"]
  }
}