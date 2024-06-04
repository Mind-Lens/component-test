import React from 'react';
import { createComponent } from '@lit/react';
import { LitList } from './Lists.ts';

export const LitReactList = createComponent({
  react: React,
  tagName: 'lit-list',
  elementClass: LitList,
  events: {},
});