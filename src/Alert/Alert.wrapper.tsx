import React from "react";
import { createComponent } from "@lit/react";
import { LitAlert } from "./Alert.ts";

export const LitReactAlert = createComponent({
  react: React,
  tagName: "lit-alert",
  elementClass: LitAlert,
  events: {},
});
