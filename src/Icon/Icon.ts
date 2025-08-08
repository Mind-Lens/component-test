import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './Icon.scss?inline'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'

// Auto-register all SVGs placed under src/Icon/assets (by filename)
const FILE_ICONS = import.meta.glob('./assets/*.svg', { as: 'raw', eager: true }) as Record<string, string>;

const REGISTRY: Record<string, string> = {};
for (const path of Object.keys(FILE_ICONS)) {
  const file = path.split('/').pop() || '';
  if (file.endsWith('.svg')) {
    const name = file.slice(0, -4); // Remove .svg extension
    REGISTRY[name] = FILE_ICONS[path];
  }
}

type IconName = keyof typeof REGISTRY;
type IconSize = 's' | 'm' | 'l';

@customElement('lit-icon')
export class LitIcon extends LitElement {
  @property({ type: String })
  icon: IconName = 'info';

  @property({ type: String })
  size: IconSize = 'm';

  @property({ type: String })
  class?: string;

  render() {
    // If an SVG file is registered by name, inline it
    const registrySvg = REGISTRY[this.icon as string];
    if (registrySvg) {
      // Replace hardcoded colors with currentColor for theming
      const themedSvg = registrySvg
        .replace(/fill="#[^"]*"/g, 'fill="currentColor"')
        .replace(/stroke="#[^"]*"/g, 'stroke="currentColor"');
      
      return html`
        <span class="${`icon--size-${this.size}`}" aria-hidden="true">
          ${unsafeSVG(themedSvg)}
        </span>
      `;
    }

    // Fallback: show nothing if icon not found
    return html``;
  }

  static styles = unsafeCSS(styles)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-icon': LitIcon
  }
}
