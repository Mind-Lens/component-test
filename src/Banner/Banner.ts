import { LitElement, html, unsafeCSS } from 'lit'
import { classMap, ClassInfo } from 'lit/directives/class-map.js'
import { customElement, property } from 'lit/decorators.js'
import styles from './Banner.scss?inline'

const ICON_MAP = {
  info: "info",
  error: "error", 
  warning: "warning",
  success: "success",
  "internet-lost": "error",
} as const;

type BannerType = keyof typeof ICON_MAP;
type BannerSize = 'm' | 'l' | 'xl' | 'full';
type BannerVariant = 'notification' | 'page-banner';

@customElement('lit-banner')
export class LitBanner extends LitElement {
  @property({ type: Boolean, attribute: 'show-close-button' })
  showCloseButton = false;

  @property({ type: String })
  size: BannerSize = 'xl';

  @property({ type: String })
  title: string = '';

  @property({ type: String })
  type: BannerType = 'info';

  @property({ type: Number })
  timeout?: number;

  @property({ type: String })
  variant?: BannerVariant;

  @property({ type: Boolean })
  isShow = true;

  @property({ type: String, attribute: 'class' })
  class?: string;

  private timer?: number;

  connectedCallback() {
    super.connectedCallback();
    this.setTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private get icon(): string {
    return ICON_MAP[this.type];
  }

  private get timeoutSeconds(): number {
    return this.timeout && Number(this.timeout) > 0 ? Number(this.timeout) : 0;
  }

  private setTimer() {
    if (this.timeoutSeconds > 0) {
      this.timer = window.setTimeout(() => {
        this.isShow = false;
        this.requestUpdate();
      }, this.timeoutSeconds * 1000);
    }
  }

  private onClose(e: Event) {
    this.isShow = false;
    this.dispatchEvent(new CustomEvent('close', { 
      detail: e,
      bubbles: true,
      composed: true 
    }));
  }

  private getBannerClassMap() {
    const classTokens: ClassInfo = {
      'banner': true,
      [`banner--size-${this.size}`]: true,
      [`banner--type-${this.type}`]: true,
      [`banner--variant-${this.variant}`]: !!this.variant,
    };

    return classTokens;
  }

  render() {
    if (!this.isShow) {
      return html``;
    }

    return html`
      <div class=${classMap(this.getBannerClassMap())}>
        <div class="banner__icon">
          <slot name="icon">
            <lit-icon icon=${this.icon} size=${this.variant === 'page-banner' ? 'l' : 'm'}></lit-icon>
          </slot>
        </div>

        <div class="banner__content">
          <div class="contain">
            ${this.title && this.variant === 'page-banner' 
              ? html`<h3 class="banner__title">${this.title}</h3>` 
              : null}
            <slot></slot>
          </div>
        </div>

        ${this.showCloseButton 
          ? html`
            <button
              class="banner__close-button"
              type="button"
              aria-label="Close banner"
              @click=${this.onClose}
            >
              <lit-icon icon="close" size="m"></lit-icon>
            </button>
          ` 
          : null}
      </div>
    `;
  }

  static styles = unsafeCSS(styles)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-banner': LitBanner
  }
}

