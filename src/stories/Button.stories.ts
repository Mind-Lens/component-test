import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../Button/Button";

const meta: Meta = {
  title: "LitPlayground/Button",
  tags: ["autodocs"],
  render: (args) => html`
    <lit-button variant=${args.variant} class="btn ${args.color}"
      >${args.text}</lit-button
    >
  `,
  argTypes: {
    text: {
      control: { type: "text" },
    },
    variant: {
      control: { type: "select" },
      options: ["text-only", "left-icon", "right-icon", "icon-only"],
    },
    color: {
      control: { type: "select" },
      options: [
        "btn-info",
        "btn-info-secondary",
        "btn-success",
        "btn-success-secondary",
        "btn-warning",
        "btn-warning-secondary",
        "btn-error",
        "btn-error-secondary",
      ],
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

export const InfoSecondary: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-info-secondary",
  },
};

export const Success: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-success",
  },
};
export const SuccessSecondary: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-success-secondary",
  },
};

export const Warning: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-warning",
  },
};
export const WarningSecondary: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-warning-secondary",
  },
};

export const Error: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-error",
  },
};
export const ErrorSecondary: Story = {
  args: {
    variant: "text-only",
    text: "Button",
    color: "btn-error-secondary",
  },
};
