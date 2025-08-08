import { LitElement, unsafeCSS, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./Alert.scss?inline";
import "../Button/Button";

@customElement("lit-alert")
export class LitAlert extends LitElement {
  @property()
  header?: string;

  @property()
  content?: string;

  @property({ type: String, attribute: "class" })
  class?: string;

  render() {
    let button;
    if (this.class?.includes("alert-info")) {
      button = html`<lit-button variant="text-only" class="btn btn-info"
        >Ok</lit-button
      >`;
    }
    if (this.class?.includes("alert-error")) {
      button = html`<lit-button variant="text-only" class="btn btn-error"
        >Ok</lit-button
      >`;
    }

    return html`
      <div class="${this.class} ">
        <div class="header">${this.header}</div>
        <div class="content">${this.content}</div>
        <div class="action">${button}</div>
      </div>
    `;
  }

  static styles = unsafeCSS(styles);
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-alert": LitAlert;
  }
}
