import React from 'react';
import { createComponent } from '@lit/react';
import { LitButton } from './Button.ts';

export const LitReactButton = createComponent({
  react: React,
  tagName: 'lit-button',
  elementClass: LitButton,
  events: {},
});
