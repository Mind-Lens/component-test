import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './Button.scss?inline' // Must use ?inline because ?inline prevents vite from inserting the styles in a <style> the <head>

@customElement('lit-button')
export class LitButton extends LitElement {
  @property()
  variant?: string;

  @property({ type: String, attribute: 'class' })
  class?: string;

  render() {
    if (this.variant == "text-only") {
      return html`
        <button class="${this.class} ">
          <slot></slot>
        </button>
      `;
    }

    if (this.variant == "left-icon") {
      return html`
        <button class="${this.class} ">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l16 0" />
          <path d="M15 18l6 -6" />
          <path d="M15 6l6 6" />
        </svg>
          <slot></slot>
        </button>
      `;
    }

    if (this.variant == "right-icon") {
      return html`
          <button class="${this.class} ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>
          <slot></slot>
          </button>
        `
    }
    if (this.variant == "icon-only") {
      return html`      
        <button class="${this.class} ">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l16 0" />
            <path d="M15 18l6 -6" />
            <path d="M15 6l6 6" />
          </svg>
        </button>
        `
    }

    return html``;
  }

  /* component methods here
  private _onClick() {}
  */

  static styles = unsafeCSS(styles)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-button': LitButton
  }
}
