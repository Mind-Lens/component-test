import { LitElement, unsafeCSS, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./Card.scss?inline";

interface CardData {
  header: string;
  content: string;
}

@customElement("lit-cards")
export class LitCard extends LitElement {
  @property({ type: Object })
  data?: CardData;

  @property({ type: String, attribute: "class" })
  class?: string;

  render() {
    return html`
      <div class="${this.class} ">
        <div class="header">${this.data?.header}w</div>
        <div class="content">${this.data?.content}</div>
      </div>
    `;
  }

  static styles = unsafeCSS(styles);
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-cards": LitCard;
  }
}
