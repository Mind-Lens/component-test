import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './Lists.scss?inline'

@customElement('lit-list')
export class LitList extends LitElement {
  @property({ type: Array })
  data?: string[];

  render() {
    return html`
      <div class="list">
        ${this.data?.map((todo) => html`<div class="list-item">${todo}</div>`)}
      </div>
    `;
  }

  static styles = unsafeCSS(styles)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-list': LitList;
  }
}