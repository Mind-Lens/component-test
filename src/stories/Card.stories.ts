import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../Card/Card';
import '../Button/Button';
import '../Icon/Icon';

const meta: Meta = {
    title: 'LitComponents/Card',
    tags: ['autodocs'],
    render: (args) => html`
        <lit-card
        .title=${args.title}
        .subtitle=${args.subtitle}
        .variant=${args.variant}
        .tooltip=${args.tooltip}
        .actionButtonText=${args.actionButtonText}
        .actionButtonDisabled=${args.actionButtonDisabled}
        .actionButtonType=${args.actionButtonType}
        .actionButtonLink=${args.actionButtonLink}
        .actionButtonLinkTarget=${args.actionButtonLinkTarget}
        .secondaryActionButtonText=${args.secondaryActionButtonText}
        .secondaryActionButtonDisabled=${args.secondaryActionButtonDisabled}
        .navigationUrl=${args.navigationUrl}
        @edit=${args.onEdit ? args.onEdit : null}
        @secondary-action=${args.onSecondaryAction ? args.onSecondaryAction : null}
        @continue=${args.onContinue ? args.onContinue : null}
        @navigate=${args.onNavigate ? args.onNavigate : null}
        >
            ${args.header ? html`<span slot="header">${args.header}</span>` : ''}
            ${args.tooltipSlot ? html`<span slot="tooltip">${args.tooltipSlot}</span>` : ''}
            ${args.content ? html`<div>${args.content}</div>` : ''}
        </lit-card>`,
    argTypes: {
        variant: {
            control: 'select',
            options: ['summary', 'action', 'summary-action', 'requirement', 'navigation'],
        },
        // PRIMARY action button
        // Text
        actionButtonText: { control: 'text' },
        // Type
        actionButtonType: {
            control: 'select',
            options: ['button', 'link'],
        },
        // Disabled
        actionButtonDisabled: { control: 'boolean' },
        // Link
        actionButtonLink: { if: { arg: 'actionButtonType', eq: 'link' }, control: 'text' },
        actionButtonLinkTarget: { if: { arg: 'actionButtonType', eq: 'link' }, control: 'select', options: ['_self', '_blank', '_parent', '_top'] },
        // SECONDARY action button
        // Text
        secondaryActionButtonText: { control: 'text' },
        // Disabled
        secondaryActionButtonDisabled: { control: 'boolean' },
        // SUMMARY CARD EVENTS
        onEdit: { if: { arg: 'variant', eq: ['summary', 'summary-action'] }, action: 'edit' },
        // ACTION CARD EVENTS
        onSecondaryAction: { if: { arg: 'variant', eq: ['action', 'summary-action'] }, action: 'secondary-action' },
        onContinue: { if: { arg: 'variant', eq: ['action', 'summary-action'] }, action: 'continue' },
        // NAVIGATION CARD EVENTS
        onNavigate: { if: { arg: 'variant', eq: 'navigation' }, action: 'navigate' },
        navigationUrl: { if: { arg: 'variant', eq: 'navigation' }, control: 'text' },
    },
};

export default meta;
type Story = StoryObj;

const content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

export const ContentCard: Story = {
    args: {
        title: 'Card Title',
        subtitle: 'Card Subtitle',
        content,
        variant: 'requirement',
        actionButtonText: 'Action',
        actionButtonDisabled: false,
        secondaryActionButtonText: 'Action',
        secondaryActionButtonDisabled: false,
        onSecondaryAction: () => alert('Secondary action clicked!'),
        onContinue: () => alert('Continue clicked!'),
    },
};

export const ContentCardWithTooltip: Story = {
    args: {
        title: 'Card Title',
        subtitle: 'Card Subtitle',
        tooltip: 'This is a tooltip for the card title.',
        content,
        variant: 'requirement',
    },
};

export const ContentCardWithTooltipNoSubtitle: Story = {
    args: {
        title: 'Card Title',
        tooltip: 'This is a tooltip for the card title.',
        content,
        variant: 'requirement',
    },
};

export const SummaryCard: Story = {
    args: {
        title: 'Card Title',
        subtitle: 'Card Subtitle',
        content,
        variant: 'summary',
        onEdit: () => alert('Edit clicked!'),
    },
};

export const ActionCard: Story = {
    args: {
        title: 'Action Card Title',
        subtitle: 'Card Subtitle',
        content,
        variant: 'action',
        actionButtonText: 'Action',
        actionButtonDisabled: false,
        secondaryActionButtonText: 'Action',
        secondaryActionButtonDisabled: false,
        onSecondaryAction: () => alert('Secondary action clicked!'),
        onContinue: () => alert('Continue clicked!'),
    },
};

export const ContentCardWithOnlyTitle: Story = {
    args: {
        title: 'Card Title',
        variant: 'requirement',
    },
};

export const NavigationCard: Story = {
    args: {
        title: 'Card Title',
        subtitle: 'Card Subtitle',
        content,
        variant: 'navigation',
        onNavigate: () => alert('Navigate clicked!'),
    },
};

export const NavigationCardNoContent: Story = {
    args: {
        title: 'Card Title',
        subtitle: 'Card Subtitle',
        variant: 'navigation',
        onNavigate: () => alert('Navigate clicked!'),
    },
};

export const NavigationCardNoSubtitleNoContent: Story = {
    args: {
        title: 'Card Title',
        variant: 'navigation',
        onNavigate: () => alert('Navigate clicked!'),
    },
};