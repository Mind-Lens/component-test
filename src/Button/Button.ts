import { LitElement, html, unsafeCSS, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import '../Icon/Icon';

import styles from './Button.scss?inline';

/**
 * LitButton web component
 *
 * @slot - Button label/content
 * @fires button-click - Fired when the button or link is clicked
 *
 * @property {"text-only" | "left-icon" | "right-icon" | "icon-only"} variant - Button visual variant
 * @property {string} color - Color style: btn-info, btn-success, etc.
 * @property {boolean} disabled - Disabled state
 * @property {"button" | "link"} type - Button type
 * @property {string} ariaLabel - Aria label for accessibility
 * @property {string} icon - Icon name for left/right/icon-only variants
 * @property {string} href - Link URL (used when type is 'link')
 * @property {string} target - Link target (used when type is 'link')
 * @property {string} rel - Link rel (used when type is 'link')
 */
@customElement('lit-button')
export class LitButton extends LitElement {
  /** Button visual variant: text-only, left-icon, right-icon, icon-only */
  @property({ type: String })
  variant: 'text-only' | 'left-icon' | 'right-icon' | 'icon-only' = 'text-only';

  /** Color style: btn-info, btn-success, etc. */
  @property({ type: String })
  color: string = 'btn-info';

  /** Disabled state */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Button type: button or link */
  @property({ type: String })
  type: 'button' | 'link' = 'button';

  /** Aria label for accessibility */
  @property({ type: String, attribute: 'aria-label' })
  ariaLabel = '';

  /** Icon name for left/right/icon-only variants */
  @property({ type: String })
  icon: string = '';

  /** Link URL (used when type is 'link') */
  @property({ type: String })
  href: string = '';

  /** Link target (used when type is 'link') */
  @property({ type: String })
  target: string = '';

  /** Link rel (used when type is 'link') */
  @property({ type: String })
  rel: string = '';

  /**
   * Helper: Render icon for left, right, or icon-only variants
   */
  private renderIcon(position: 'left' | 'right' | 'only') {
    if (!this.icon) return null;
    if (position === 'left') {
      return html`<lit-icon icon="${this.icon}" variant="s" style="margin:0 0.5rem 0 0;"></lit-icon>`;
    }
    if (position === 'right') {
      return html`<lit-icon icon="${this.icon}" variant="s" style="margin:0 0 0 0.5rem;"></lit-icon>`;
    }
    // icon-only
    return html`<lit-icon icon="${this.icon}" variant="s"></lit-icon>`;
  }

  /**
   * Emit a custom event for button or link click
   */
  private handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    // Log button press
    console.log(`lit-button pressed: type=${this.type}, variant=${this.variant}`);
    this.dispatchEvent(new CustomEvent('button-click', {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true,
    }));
  }

  /**
   * Warn if aria-label is missing for icon-only variant
   */
  protected updated(changed: PropertyValues) {
    super.updated(changed);
    if (this.variant === 'icon-only' && !this.ariaLabel) {
      // eslint-disable-next-line no-console
      console.warn('For accessibility, provide aria-label when using icon-only variant in <lit-button>.');
    }
  }

  render() {
    const classes = {
      btn: true,
      [this.color]: !!this.color,
      [`btn-${this.variant}`]: !!this.variant,
      'btn-disabled': this.disabled,
    };
    const linkClassMap = {
      'btn-link': true,
      'right-icon': this.variant === 'right-icon',
      'icon-only': this.variant === 'icon-only',
      'btn-disabled': this.disabled,
    };

    // Render as <a> if type is link and href is provided
    if (this.type === 'link' && this.href) {
      return html`
        <a
          class="${classMap(linkClassMap)}"
          href="${this.disabled ? undefined : this.href}"
          target="${this.target || undefined}"
          rel="${this.rel || undefined}"
          aria-label="${this.ariaLabel}"
          @click="${this.handleClick}"
          tabindex="${this.disabled ? -1 : 0}"
        >
          ${this.variant === 'left-icon' && this.icon ? this.renderIcon('left') : null}
          ${this.variant === 'icon-only' && this.icon ? this.renderIcon('only') : null}
          ${this.variant !== 'icon-only' ? html`<slot></slot>` : null}
          ${this.variant === 'right-icon' && this.icon ? this.renderIcon('right') : null}
        </a>
      `;
    }

    // Render as <button> otherwise
    return html`
      <button
        class="${classMap(classes)}"
        ?disabled="${this.disabled}"
        type="button"
        aria-label="${this.ariaLabel}"
        @click="${this.handleClick}"
      >
        ${this.variant === 'left-icon' && this.icon ? this.renderIcon('left') : null}
        ${this.variant === 'icon-only' && this.icon ? this.renderIcon('only') : null}
        ${this.variant !== 'icon-only' ? html`<slot></slot>` : null}
        ${this.variant === 'right-icon' && this.icon ? this.renderIcon('right') : null}
      </button>
    `;
  }

  static styles = unsafeCSS(styles);
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-button': LitButton;
  }
}

