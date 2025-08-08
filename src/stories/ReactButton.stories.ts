import type { Meta, StoryObj } from "@storybook/react";
//import { LitReactButton } from 'ml-lit-components'; // use ml-lit-components@0.0.20
import { LitReactButton } from "../react";

const meta = {
  title: "LitReact/Button",
  component: LitReactButton,
  tags: ["autodocs"],
} satisfies Meta<typeof LitReactButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "text-only",
    className: "btn btn-info",
  },
};
