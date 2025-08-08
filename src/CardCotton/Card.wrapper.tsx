import React from "react";
import { createComponent } from "@lit/react";
import { LitCard } from "./Card.ts";

export const LitReactCard = createComponent({
  react: React,
  tagName: "lit-cards",
  elementClass: LitCard,
  events: {},
});
