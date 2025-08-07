import { LitElement, html, unsafeCSS, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../Button/Button';
import '../Icon/Icon';
import '../Tooltip/Tooltip';

import styles from './Card.scss?inline';

/**
 * LitCard web component
 *
 * @summary Renders a card with header, title, subtitle, tooltip, actions, and flexible content. Supports multiple variants and actions.
 *
 * @property {string} title - Card title
 * @property {string} subtitle - Card subtitle
 * @property {'action' | 'summary' | 'summary-action' | 'requirement' | 'navigation'} variant - Card variant
 * @property {string} tooltip - Tooltip text (used if no tooltip slot is provided)
 * @property {string} actionButtonText - Primary action button text
 * @property {boolean} actionButtonDisabled - Whether the primary action button is disabled
 * @property {'button' | 'link'} actionButtonType - Primary action button type
 * @property {string} actionButtonLink - Primary action button link (if type is 'link')
 * @property {'_self' | '_blank' | '_parent' | '_top'} actionButtonLinkTarget - Primary action button link target
 * @property {string} secondaryActionButtonText - Secondary action button text
 * @property {boolean} secondaryActionButtonDisabled - Whether the secondary action button is disabled
 * @property {string} navigationUrl - URL for navigation event (navigation variant)
 *
 * @fires edit - Fired when the edit link is clicked (summary/summary-action variants)
 * @fires secondary-action - Fired when the secondary action button is clicked (action/summary-action variants)
 * @fires continue - Fired when the continue button is clicked (action/summary-action variants)
 * @fires navigate - Fired when the card is clicked (navigation variant)
 *
 * @slot - Card content
 * @slot header - Card header content
 * @slot tooltip - Tooltip content for the title
 */
@customElement('lit-card')
export class LitCard extends LitElement {
    /** Card title */
    @property({ type: String })
    title = '';

    /** Card subtitle */
    @property({ type: String })
    subtitle = '';

    /** Card variant */
    @property({ type: String })
    variant: 'action' | 'summary' | 'summary-action' | 'requirement' | 'navigation' = 'summary';

    /** Tooltip text (used if no tooltip slot is provided) */
    @property({ type: String })
    tooltip = '';

    /** Primary action button text */
    @property({ type: String })
    actionButtonText = 'Action';

    /** Whether the primary action button is disabled */
    @property({ type: Boolean })
    actionButtonDisabled = false;

    /** Primary action button type */
    @property({ type: String })
    actionButtonType: 'button' | 'link' = 'button';

    /** Primary action button link (if type is 'link') */
    @property({ type: String })
    actionButtonLink = 'javascript:void(0);';

    /** Primary action button link target */
    @property({ type: String })
    actionButtonLinkTarget: '_self' | '_blank' | '_parent' | '_top' = '_self';

    /** Secondary action button text */
    @property({ type: String })
    secondaryActionButtonText = 'Action';

    /** Whether the secondary action button is disabled */
    @property({ type: Boolean })
    secondaryActionButtonDisabled = false;

    /** URL for navigation event (navigation variant) */
    @property({ type: String })
    navigationUrl = 'javascript:void(0);';

    /**
     * Handles navigation card click. Emits the navigate event.
     * @fires navigate
     */
    private onNavigate() {
        this.dispatchEvent(new CustomEvent('navigate', { detail: this.navigationUrl, bubbles: true, composed: true }));
    }

    /**
     * Handles edit link click. Emits the edit event.
     * @fires edit
     */
    private onEdit(e: Event) {
        this.dispatchEvent(new CustomEvent('edit', { detail: e, bubbles: true, composed: true }));
    }

    /**
     * Handles secondary action button click. Emits the secondary-action event.
     * @fires secondary-action
     */
    private onSecondaryAction(e: Event) {
        this.dispatchEvent(new CustomEvent('secondary-action', { detail: e, bubbles: true, composed: true }));
    }

    /**
     * Handles continue button click. Emits the continue event.
     * @fires continue
     */
    private onContinue(e: Event) {
        this.dispatchEvent(new CustomEvent('continue', { detail: e, bubbles: true, composed: true }));
    }

    /** Internal: Whether the card has slot content */
    private hasSlotContent = false;

    /**
     * Renders the card.
     * Adds role="region" and aria-label (using the title) for accessibility.
     */
    render() {
        const isNavigation = this.variant === 'navigation';
        const isRequirement = this.variant === 'requirement';
        const noSubtitle = !this.subtitle;
        const noContent = !this.hasSlotContent;
        const headerNoBottomMargin = isRequirement && noSubtitle && noContent;
        const cardClass = [
            'lit-card',
            this.variant ? `lit-card--variant-${this.variant}` : '',
        ].filter(Boolean).join(' ');

        return html`
      <div class="${cardClass}" role="region" aria-label="${this.title}">
        ${!isNavigation ? html`
          <div>
            <slot name="header"></slot>
            ${(this.title || ['summary', 'summary-action', 'requirement'].includes(this.variant)) ? html`
              <div class="lit-card__header${headerNoBottomMargin ? ' lit-card__header--no-margin' : ''}">
                <div class="lit-card__title-wrapper">
                  ${(this.title && (this.tooltip || this.slotTooltipExists())) ? html`
                    <div class="lit-card__tooltip-title">
                      <h3 class="lit-card__title">${this.title}</h3>
                      <lit-tooltip>
                        <slot name="tooltip">${this.tooltip}</slot>
                      </lit-tooltip>
                    </div>
                  ` : this.title ? html`
                    <h3 class="lit-card__title">${this.title}</h3>
                  ` : nothing}
                  ${this.subtitle ? html`
                    <h4 class="lit-card__subtitle">${this.subtitle}</h4>
                  ` : nothing}
                </div>
                ${(this.variant === 'summary' || this.variant === 'summary-action') ? html`
                  <lit-button
                    class="lit-card__edit-link"
                    variant="left-icon"
                    icon="edit"
                    type="link"
                    href="https://www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click=${this.onEdit}
                    >Edit</lit-button>
                ` : nothing}
              </div>
            ` : nothing}
            <div class="lit-card__content${!this.hasSlotContent ? ' lit-card__content--no-content' : ''}">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </div>
            ${(this.variant === 'action' || this.variant === 'summary-action') ? html`
              <div class="lit-card__line"></div>
            ` : nothing}
            ${(this.variant === 'action' || this.variant === 'summary-action') ? html`
              <div class="lit-card__actions">
                ${this.secondaryActionButtonText ? html`
                  <lit-button
                    class="lit-card__action lit-card__action--secondary"
                    variant="text-only"
                    color="btn-info-secondary"
                    ?disabled=${this.secondaryActionButtonDisabled}
                    @click=${this.onSecondaryAction}
                  >${this.secondaryActionButtonText}</lit-button>
                ` : nothing}
                ${(this.actionButtonType !== 'link') ? html`
                  <lit-button
                    class="lit-card__action"
                    ?disabled=${this.actionButtonDisabled}
                    variant="left-icon"
                    type="button"
                    @click=${this.onContinue}
                  >${this.actionButtonText || 'Continue'}</lit-button>
                ` : html`
                  <lit-button
                    class="lit-card__action lit-card__action--link"
                    variant="text-only"
                    type="link"
                    href="${this.navigationUrl}"
                    target="${this.actionButtonLinkTarget}"
                    rel="noopener noreferrer"
                  >${this.actionButtonText || 'Continue'}</lit-button>
                `}
              </div>
            ` : nothing}
          </div>
        ` : html`
          <div @click=${this.onNavigate}>
            <slot name="header"></slot>
            ${(this.title || isNavigation) ? html`
              <div class="lit-card__header">
                <div class="lit-card__title-wrapper">
                  ${(this.title && (this.tooltip || this.slotTooltipExists())) ? html`
                    <div class="lit-card__tooltip-title">
                      <h3 class="lit-card__title">${this.title}</h3>
                      <lit-tooltip>
                        <slot name="tooltip">${this.tooltip}</slot>
                      </lit-tooltip>
                    </div>
                  ` : this.title ? html`
                    <h3 class="lit-card__title">${this.title}</h3>
                  ` : nothing}
                  ${this.subtitle ? html`
                    <h4 class="lit-card__subtitle">${this.subtitle}</h4>
                  ` : nothing}
                </div>
                ${(isNavigation) ? html`
                    <lit-icon
                        class="lit-card__nav-icon"
                        icon="info-service"
                        variant="m"
                    ></lit-icon>
                ` : nothing}
              </div>
            ` : nothing}
              <div class="lit-card__content${!this.hasSlotContent ? ' lit-card__content--no-content' : ''}">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </div>
          </div>
        `}
      </div>
    `;
    }

    /**
     * Checks if a tooltip slot is provided.
     * @returns {boolean} True if a tooltip slot is assigned, false otherwise.
     */
    private slotTooltipExists(): boolean {
        // Check if a tooltip slot is provided
        const slot = this.shadowRoot?.querySelector('slot[name="tooltip"]') as HTMLSlotElement | null;
        return !!slot && slot.assignedNodes().length > 0;
    }

    /**
     * Handles slot content changes. Updates hasSlotContent accordingly.
     * @param {Event} e - The slotchange event
     */
    private handleSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        const nodes = slot.assignedNodes({ flatten: true });
        this.hasSlotContent = nodes.some(
            node =>
                (node.nodeType === Node.ELEMENT_NODE) ||
                (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
        );
        this.requestUpdate();
    }

    static styles = unsafeCSS(styles);
}