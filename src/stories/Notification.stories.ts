import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../Notification/Notification.ts';

const meta: Meta = {
    title: 'LitComponents/Notification',
    tags: ['autodocs'],
    render: (args) => html`
    <div style="min-height: 76px; position: relative; display: flex; justify-content: center; align-items: center;">
      <lit-notification
        .type="${args.type}"
        .size="${args.size}"
        .timeout="${args.timeout}"
      >
        ${args.slot ?? ''}
      </lit-notification>
    </div>
  `,
    argTypes: {
        type: { control: 'select', options: ['info', 'success', 'error', 'warning', 'internet-lost'] },
        size: { control: 'select', options: ['m', 'l'] },
        timeout: { control: 'number' },
        slot: { control: 'text', description: 'Slot content' },
    },
};

export default meta;
type Story = StoryObj;

type NotificationType = 'info' | 'success' | 'error' | 'warning' | 'internet-lost';
type NotificationSize = 'm' | 'l';

function makeNotificationStory(
    type: NotificationType,
    size: NotificationSize,
    timeout: number = 0
): Story {
    return {
        args: {
            type,
            size,
            timeout,
            slot: 'This is a notification message.'
        },
    };
}

export const InfoL = makeNotificationStory('info', 'l');
export const SuccessL = makeNotificationStory('success', 'l');
export const ErrorL = makeNotificationStory('error', 'l');
export const WarningL = makeNotificationStory('warning', 'l');
export const InternetLostL = makeNotificationStory('internet-lost', 'l');

export const InfoM = makeNotificationStory('info', 'm');
export const SuccessM = makeNotificationStory('success', 'm');
export const ErrorM = makeNotificationStory('error', 'm');
export const WarningM = makeNotificationStory('warning', 'm');
export const InternetLostM = makeNotificationStory('internet-lost', 'm');