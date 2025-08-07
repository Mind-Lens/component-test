import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../Banner/Banner';

import './Notification.scss?inline';

/**
 * LitNotification web component
 *
 * @summary Renders a notification using the lit-banner component. Supports type, size, timeout, and flexible content.
 *
 * @property {'m' | 'l'} size - Notification size
 * @property {'info' | 'error' | 'warning' | 'success' | 'internet-lost'} type - Notification type
 * @property {number | string} timeout - Auto-dismiss timeout in seconds (0 = no timeout)
 *
 * @fires close - Fired when the close button is clicked (emitted by the underlying lit-banner)
 *
 * @slot - Notification content
 *
 * @remarks
 * The 'notification' class is used for styling the notification container. The close event is emitted by the underlying lit-banner component.
 */
@customElement('lit-notification')
export class LitNotification extends LitElement {
  /** Notification size */
  @property({ type: String })
  size: 'm' | 'l' = 'l';

  /** Notification type */
  @property({ type: String })
  type: 'info' | 'error' | 'warning' | 'success' | 'internet-lost' = 'info';

  /** Auto-dismiss timeout in seconds (0 = no timeout) */
  @property({ type: Number })
  timeout?: number | string;

  render() {
    return html`
      <lit-banner
        class="notification"
        .type=${this.type}
        .size=${this.size}
        .timeout=${this.timeout}
        .showCloseButton=${true}
        variant="notification"
      >
        <slot></slot>
      </lit-banner>
    `;
  }
}