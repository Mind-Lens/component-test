import React from "react";
import { createComponent } from "@lit/react";
import { LitBanner } from "./Banner.ts";

export const LitReactBanner = createComponent({
  react: React,
  tagName: "lit-banner",
  elementClass: LitBanner,
  events: {},
});
