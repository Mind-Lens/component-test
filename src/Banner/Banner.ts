import { LitElement, html, unsafeCSS, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import '../Icon/Icon';

import styles from './Banner.scss?inline';

/**
 * LitBanner web component
 *
 * @summary Renders a banner with icon, content, and optional close button. Supports multiple types, sizes, variants, and auto-dismiss timeout.
 *
 * @property {boolean} showCloseButton - Whether to show the close button
 * @property {'m' | 'l' | 'xl' | 'full'} size - Banner size
 * @property {'notification' | 'page-banner'} variant - Banner variant
 * @property {string} title - Banner title (used in page-banner variant)
 * @property {'info' | 'success' | 'error' | 'warning' | 'internet-lost'} type - Banner type (controls icon and color)
 * @property {number | string} timeout - Auto-dismiss timeout in seconds (0 = no timeout)
 *
 * @fires close - Fired when the close button is clicked
 *
 * @slot - Banner content
 */
const ICON_MAP = {
    info: 'info',
    error: 'error',
    warning: 'warning',
    success: 'success',
    'internet-lost': 'internet-lost',
};

@customElement('lit-banner')
export class LitBanner extends LitElement {
    /** Whether to show the close button */
    @property({ type: Boolean })
    showCloseButton: boolean = false;

    /** Banner size */
    @property({ type: String })
    size: 'm' | 'l' | 'xl' | 'full' = 'xl';

    /** Banner variant */
    @property({ type: String })
    variant: 'notification' | 'page-banner' = 'notification';

    /** Banner title (used in page-banner variant) */
    @property({ type: String })
    title: string = '';

    /** Banner type (controls icon and color) */
    @property({ type: String })
    type: 'info' | 'success' | 'error' | 'warning' | 'internet-lost' = 'info';

    /** Auto-dismiss timeout in seconds (0 = no timeout) */
    @property({ type: Number })
    timeout: number | string = 0;

    /** Internal: Whether the banner is shown */
    @state()
    private isShow: boolean = true;

    /** Internal: Whether the slot is empty */
    @state()
    private isSlotEmpty: boolean = true;

    /** Internal: Reference to the slot element */
    @query('slot')
    private slotElement!: HTMLSlotElement;

    /** Internal: Timer for auto-dismiss */
    private timer: ReturnType<typeof setTimeout> | null = null;

    /**
     * Returns the icon name to show for the current type.
     */
    get iconToShow() {
        return ICON_MAP[this.type] || '';
    }

    /**
     * Returns the timeout in seconds (normalized to number).
     */
    get timeoutSeconds() {
        const t = Number(this.timeout);
        return t > 0 ? t : 0;
    }

    connectedCallback() {
        super.connectedCallback();
        this.setTimer();
        // Defer slot check to first update
        this.updateComplete.then(() => this.checkSlot());
    }

    firstUpdated() {
        this.checkSlot();
    }

    /**
     * Called when the slot content changes. Checks if the slot is empty.
     */
    private onSlotChange() {
        this.checkSlot();
    }

    /**
     * Checks if the slot is empty (only whitespace or no nodes).
     */
    private checkSlot() {
        if (this.slotElement) {
            const nodes = this.slotElement.assignedNodes({ flatten: true });
            // Only text nodes with whitespace or no nodes means empty
            this.isSlotEmpty = nodes.length === 0 || nodes.every(n => n.nodeType === Node.TEXT_NODE && !n.textContent?.trim());
        } else {
            this.isSlotEmpty = true;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.clearTimer();
    }

    updated(changedProps: Map<string, unknown>) {
        if (changedProps.has('timeout')) {
            this.clearTimer();
            this.isShow = true;
            this.setTimer();
        }
    }

    /**
     * Clears the auto-dismiss timer.
     */
    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    /**
     * Sets the auto-dismiss timer if timeoutSeconds > 0.
     */
    setTimer() {
        if (this.timeoutSeconds > 0) {
            this.timer = setTimeout(() => {
                this.isShow = false;
            }, this.timeoutSeconds * 1000);
        }
    }

    /**
     * Handles the close button click. Hides the banner and emits the close event.
     * @fires close
     */
    onClose(e: Event) {
        this.isShow = false;
        this.dispatchEvent(new CustomEvent('close', { detail: e, bubbles: true, composed: true }));
    }

    render() {
        if (!this.isShow) return nothing;
        const classes = [
            'lit-banner',
            `lit-banner--size-${this.size}`,
            `lit-banner--type-${this.type}`,
            this.variant ? `lit-banner--variant-${this.variant}` : '',
            (this.variant === 'page-banner' && this.isSlotEmpty) ? 'lit-banner--empty-slot' : '',
        ].filter(Boolean).join(' ');
        // Accessibility: Use role="alert" for error/warning/internet-lost, role="status" otherwise
        const alertTypes = ['error', 'warning', 'internet-lost'];
        const role = alertTypes.includes(this.type) ? 'alert' : 'status';
        return html`
      <div class="${classes}" role="${role}">
        <div class="lit-banner__icon">
          <lit-icon
            .icon="${this.iconToShow}"
            .variant="${this.variant === 'page-banner' ? 'l' : 'm'}"
          ></lit-icon>
        </div>
        <div class="lit-banner__content">
          <div class="contain">
            ${this.title && this.variant === 'page-banner' ? html`<h3 class="lit-banner__title">${this.title}</h3>` : nothing}
            <slot @slotchange="${this.onSlotChange}"></slot>
          </div>
        </div>
        ${this.showCloseButton ? html`
          <button
            class="lit-banner__close"
            type="button"
            aria-label="Close banner"
            @click="${this.onClose}">
            <lit-icon icon="close"></lit-icon>
          </button>
        ` : nothing}
      </div>
    `;
    }

    static styles = unsafeCSS(styles);
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-banner': LitBanner;
    }
}
