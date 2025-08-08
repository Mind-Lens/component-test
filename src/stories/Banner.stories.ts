import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../Banners/Banner";

const meta: Meta = {
  title: "LitPlayground/Banner",
  tags: ["autodocs"],
  render: (args) => html`
    <lit-banner variant=${args.variant} class="btn ${args.color}"
      >${args.text}</lit-banner
    >
  `,
  argTypes: {
    title: {
      control: { type: "text" },
    },
    variant: {
      control: { type: "select" },
      options: ["page-banner", "notification"],
    },
    type: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
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
  },
  /*
  render: () => html`
    <lit-button variant="text-only" class="btn btn-info">Button</lit-button>  
  `,
  */
};

export const Warning: Story = {
  args: {
    variant: "page-banner",
    title: "Banner Title",
    type: "info",
  },
};

export const Success: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-success",
  },
};

export const Error: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-warning",
  },
};
