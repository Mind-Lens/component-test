import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../dist/index.js";

const meta: Meta = {
  title: "LitPlayground/Alert",
  tags: ["autodocs"],
  render: (args) => html`
    <lit-alert
      class="alert ${args.color}"
      header="${args.header}"
      content=${args.content}
    >
    </lit-alert>
  `,
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["alert-info", "alert-success", "alert-warning", "alert-error"],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: {
    color: "alert-info",
    header: "some title here",
    content: "content goes here",
  },
};
