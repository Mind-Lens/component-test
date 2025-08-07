import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../Icon/Icon';
import styles from './Tooltip.scss?inline';

/**
 * LitTooltip web component
 *
 * @summary Renders a tooltip with an info icon trigger. Supports four positions.
 *
 * @property {'top' | 'bottom' | 'left' | 'right'} position - Tooltip position relative to the icon
 * @slot - Tooltip content
 */
@customElement('lit-tooltip')
export class LitTooltip extends LitElement {
  /** Tooltip position relative to the icon */
  @property({ type: String })
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  /** Unique ID for the tooltip popup (for aria-describedby) */
  private tooltipId: string;

  constructor() {
    super();
    // Generate the tooltip ID once per instance
    this.tooltipId = 'tooltip-' + Math.random().toString(36).slice(2, 10);
  }

  render() {
    return html`
      <span class="lit-tooltip" data-position="${this.position}">
        <span class="lit-tooltip__icon" tabindex="0" aria-describedby="${this.tooltipId}">
          <lit-icon icon="info" variant="m"></lit-icon>
        </span>
        <span
          id="${this.tooltipId}"
          class="lit-tooltip__popup"
          role="tooltip"
        >
          <slot></slot>
        </span>
      </span>
    `;
  }

  static styles = unsafeCSS(styles);
}