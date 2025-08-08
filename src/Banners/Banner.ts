import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./Banner.scss?inline"; // Must use ?inline because ?inline prevents vite from inserting the styles in a <style> the <head>

@customElement("lit-banner")
export class LitBanner extends LitElement {
  @property() variant?: "notification" | "page-banner";
  @property() timeout?: number = 1000;
  @property({ type: String, attribute: "type" }) type:
    | "info"
    | "error"
    | "warning"
    | "success" = "info";
  @property() title!: string;
  @property() size?: "short" | "medium" | "long" = "medium";
  @property() showCloseBtn: boolean = true;
  @property({ type: Boolean, reflect: true }) hidden = true;

  private timer: any = null;

  firstUpdated() {
    this.setTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private setTimer() {
    if (this.timeout ?? 0 > 0) {
      // Use requestAnimationFrame to mimic Vue's $nextTick
      requestAnimationFrame(() => {
        this.timer = setTimeout(
          () => {
            this.hidden = true;
            this.dispatchEvent(
              new CustomEvent("close", {
                bubbles: true,
                composed: true,
              })
            );
          },
          this.timeout ?? 0 * 1000
        );
      });
    }
  }

  private _handleClose(e: Event) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.hidden = true;
    this.dispatchEvent(
      new CustomEvent("close", {
        bubbles: true,
        composed: true,
        detail: e,
      })
    );
  }

  show() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.hidden = false;
    this.setTimer();
  }

  render() {
    if (this.variant == "page-banner") {
      return html`
        <div class="banner-container">
          <div
            class="banner banner-${this.type} ${this.size} ${this.hidden
              ? "hidden"
              : ""}"
          >
            <img
              id="banner-icon"
              src="assets/icons/${this.type?.charAt(0).toUpperCase() +
              this.type?.slice(1)}.svg"
              alt=""
            />
            <div class="content">
              <div class="header">${this.title}</div>
              ${this.showCloseBtn
                ? html` <button
                    id="close-btn"
                    aria-label="Close"
                    @click=${this._handleClose}
                  >
                    <img src="assets/icons/Close.svg" alt="" />
                  </button>`
                : ""}
              <slot></slot>
            </div>
          </div>
        </div>
      `;
    }
  }

  /* component methods here
  private _onClick() {}
  */

  static styles = unsafeCSS(styles);
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-banner": LitBanner;
  }
}
