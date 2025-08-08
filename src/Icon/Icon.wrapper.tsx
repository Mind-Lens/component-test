import React from 'react';
import { createComponent } from '@lit/react';
import { LitIcon } from './Icon.ts';

export const LitReactIcon = createComponent({
  react: React,
  tagName: 'lit-icon',
  elementClass: LitIcon,
});

