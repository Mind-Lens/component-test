import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../Banner/Banner.ts';

const meta: Meta = {
  title: 'LitComponents/Banner',
  tags: ['autodocs'],
  render: (args) => html`
      <div style="min-height: 76px; position: relative; display: flex; justify-content: center; align-items: center;">
        <lit-banner
          class="storybook-banner"
          .variant="${args.variant}"
          .title="${args.title}"
          .size="${args.size}"
          .type="${args.type}"
          .showCloseButton="${args.showCloseButton}"
          .timeout="${args.timeout}"
        >
          ${args.slot ?? ''}
        </lit-banner>
      </div>
    `,
  argTypes: {
    variant: { control: 'select', options: ['notification', 'page-banner'] },
    slot: { control: 'text', description: 'Slot content' },
    title: { if: { arg: 'variant', eq: 'page-banner' }, control: 'text', description: 'Banner title', defaultValue: 'Banner title' },
    size: { control: 'select', options: ['m', 'l', 'xl', 'full'] },
    type: { control: 'select', options: ['info', 'success', 'error', 'warning', 'internet-lost'] },
    showCloseButton: { control: 'boolean' },
    timeout: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj;

type BannerVariant = 'notification' | 'page-banner';
type BannerType = 'info' | 'success' | 'error' | 'warning' | 'internet-lost';
type BannerSize = 'm' | 'l' | 'xl' | 'full';

function makeBannerStory(
  variant: BannerVariant,
  type: BannerType,
  size: BannerSize,
  showCloseButton: boolean = false
): Story {
  const isPage = variant === 'page-banner';
  return {
    args: {
      title: 'A short descriptive header',
      showCloseButton,
      size,
      variant,
      type,
      timeout: 0,
      slot: isPage
        ? 'This is a paragraph of information with additional supporting detail or links to help the user understand what they should do.'
        : 'This is a notification banner.',
    },
  };
}

export const NotificationInfoL = makeBannerStory('notification', 'info', 'l', true);
export const NotificationSuccessL = makeBannerStory('notification', 'success', 'l', true);
export const NotificationErrorL = makeBannerStory('notification', 'error', 'l', true);
export const NotificationWarningL = makeBannerStory('notification', 'warning', 'l', true);
export const NotificationInternetLostL = makeBannerStory('notification', 'internet-lost', 'l', true);

export const PageBannerInfoL = makeBannerStory('page-banner', 'info', 'l', true);
export const PageBannerSuccessL = makeBannerStory('page-banner', 'success', 'l', true);
export const PageBannerErrorL = makeBannerStory('page-banner', 'error', 'l', true);
export const PageBannerWarningL = makeBannerStory('page-banner', 'warning', 'l', true);
export const PageBannerInternetLostL = makeBannerStory('page-banner', 'internet-lost', 'l', true);