import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import "../../dist/index.js"

const meta: Meta = {
  title: 'LitPlayground/Card',
  tags: ['autodocs'],
  render: (args) => html`
    <lit-card class="card" .data="${args.data}"></lit-card>
  `,
  argTypes: {},
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: {
    data: {
      header: "card header", content: "card content here",
    }
  }
}