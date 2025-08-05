# Frontend Developer Skill Test: Advanced Component Development

## 1. Objective

Welcome! This test is designed to assess your skills in creating robust, reusable, and high-quality web components using modern tools and best practices. You will be taking a monolithic Vue 2 component and re-engineering it into a set of flexible Lit components, complete with comprehensive testing and theming capabilities.

The goal is to evaluate your understanding of:
- Component-based architecture.
- Modern frontend tooling (Lit, Storybook).
- CSS best practices for encapsulation and theming.
- Test-Driven Development (TDD) and component testing.
- End-to-end quality assurance through automated pipelines.

## 2. The Challenge

Your primary task is to **decompose the provided Vue 2 components (`DxpBanner`, `DxpCard`, and `DxpNotification`) into a collection of smaller, single-purpose Lit components**. You will need to setup a Storybook to develop, document, and showcase these components.

### Provided Materials

1.  **This Repository:** A starter project with Lit, TypeScript, and Storybook already configured. But feel free to tweak or change or replace it with your preferred tools and setup.
2.  **The Vue 2 Components:** The code for the `DxpBanner`, `DxpCard`, and `DxpNotification` components are included at the end of this document. You do not need to run the Vue code; it serves as a blueprint for functionality and appearance.
3.  **Figma Designs:** A Figma link for visual design reference.
https://www.figma.com/design/XtNdWYirqG4r5vejXuC8cG/Coding-test?node-id=0-1&t=6Zohk2CBPiozdDXw-1

## 3. Core Tasks

### Task 1: Component Analysis and Breakdown

1.  **Analyze the Vue 2 Components:** Identify the distinct, reusable parts of the UI in `DxpBanner`, `DxpCard`, and `DxpNotification`. Think about what could be a button, an icon, a card, a banner, or a notification.
2.  **Design Your Lit Components:** Plan out the new component hierarchy. What will the new components be? What properties (props) will they accept? What events will they emit?

### Task 2: Lit Component Implementation

**Requirements:**

1.  **Development:** Create the Lit components you designed in the previous step.
2.  **Quality:** Your implementation should be robust and well-tested. We encourage a quality-first mindset, where tests are written alongside the component code to ensure correctness from the start.
3.  **Best Practices:**
    *   Write clean, readable, and maintainable TypeScript.
    *   Define a clear and well-typed public API for your components (e.g., using Lit's `@property` decorator).
    *   Use custom events for user interactions.
    *   Leverage slots (`<slot>`) to create flexible and composable components.

### Task 3: Styling and Theming

This is a critical part of the test. Your goal is to implement a robust and flexible styling solution for your components.

**Requirements:**

1.  **Style Encapsulation:** Components should be self-contained. Their styles must not interfere with other elements on the page, and they should be resilient to global styles that might otherwise break their appearance.
2.  **Theming Support:** The components must be themeable. You need to implement a system that supports at least three distinct themes: a **Light Theme**, a **Dark Theme**, and a **Brand Theme**. It should be possible to switch between these themes at runtime and be able to easily add another theme to be library in the future.

The mechanism for switching themes should be clearly documented and demonstrated in your Storybook stories. You have the freedom to choose the best technical approach to meet these requirements, but be prepared to justify your design choices.

### Task 4: Storybook Integration

1.  **Create Stories:** For each Lit component you build, create a corresponding `.stories.ts` file.
2.  **Document Props and Controls:** Use Storybook's `argTypes` to document your component's properties, allowing them to be manipulated in the Storybook UI.
3.  **Showcase Theming:** Create stories that demonstrate the light, dark, and brand themes working correctly. You can use Storybook decorators to wrap components in the required theme classes.

### Task 5: CI/CD Pipeline for Automated Quality Assurance

In a real-world scenario, we automate our quality checks to ensure code is always in a deployable state. Your task is to define a CI/CD pipeline that accomplishes this. You can do this by creating a `.github/workflows/ci.yml` file (for GitHub Actions) or by describing the stages in any other format you are familiar with.

Your pipeline definition should enforce a high standard of quality by including automated checks for:

1.  **Code Integrity:** Steps to ensure the code is syntactically correct, adheres to project coding standards (linting), and that the project builds successfully.
2.  **Component Correctness:** A stage for running the component tests you've written. The pipeline should fail if any tests fail.
3.  **Accessibility (a11y):** An automated check to catch common accessibility violations.
4.  **Performance Budgets:** A step to analyze the performance of your components (e.g., using Google Lighthouse) and fail the build if they exceed a defined performance budget (e.g., bundle size, rendering time).
5.  **Cross-Browser Compatibility:** A step to show how you would ensure your components work across different modern browsers (e.g., Chromium, Firefox, WebKit).

You have the freedom to choose the tools and libraries to implement these checks. The goal is to demonstrate your understanding of a comprehensive, automated quality assurance strategy.

## 4. Submission Guidelines

1.  **Fork this repository.**
2.  Create a new branch for your work (e.g., `dev-test-solution`).
3.  Commit your changes to that branch. Please use clear and descriptive commit messages.
4.  When you are finished, open a **Pull Request** against the `main` branch of the original repository.
5.  In your PR description, briefly explain your component design choices and any challenges you faced.

## 5. Evaluation Criteria

We will be evaluating your submission based on the following criteria:

-   **Component Architecture:** How logically you broke down the UI into reusable components.
-   **Code Quality:** Cleanliness, readability, and use of TypeScript best practices.
-   **Styling Implementation:** Correct use of Shadow DOM and a flexible, variable-driven theming system.
-   **Storybook Usage:** How well you've documented and showcased your components and their features.
-   **Testing Strategy:** The completeness and thoughtfulness of your automated testing pipeline, with a strong emphasis on TDD.
-   **Attention to Detail:** Overall quality and polish of the final result.

Good luck! We are excited to see what you build.

## 6. The Vue 2 Components (Blueprints)

Use these components as your reference.

<details>
<summary>DxpBanner.vue</summary>

```html
<template>
  <div
    v-if="isShow"
    :class="[
      'DxpBanner',
      `DxpBanner--size-${size}`,
      `DxpBanner--type-${type}`,
      variant && `DxpBanner--variant-${variant}`,
    ]"
  >
    <dxp-icon
      :icon="icon"
      :size="variant === 'page-banner' ? 'l' : 'm'"
      class="DxpBanner__Icon"
    />

    <div class="DxpBanner__Content">
      <div class="contain">
        <h3 v-if="title && variant === 'page-banner'" class="dxp-h3">
          {{ title }}
        </h3>
        <!-- @slot Banner content -->
        <slot></slot>
      </div>
    </div>

    <button
      v-if="showCloseButton"
      class="DxpBanner__CloseButton"
      type="button"
      aria-label="Close banner"
      @click="onClose"
    >
      <dxp-icon icon="close" />
    </button>
  </div>
</template>

<script>
import DxpIcon from "@/components/icon/DxpIcon.vue";

const ICON_MAP = {
  info: "info",
  error: "error",
  warning: "warning",
  success: "success",
  "internet-lost": "internet-lost",
};

export default {
  name: "DxpBanner",
  release: "1.0.1",
  lastUpdated: "0.2.1",
  components: {
    DxpIcon,
  },
  props: {
    /**
     * Show close button
     */
    showCloseButton: {
      type: Boolean,
      default: false,
    },

    /**
     * Banner size <br />
     * `m` `l` `xl` `full`
     */
    size: {
      type: String,
      default: "xl",
      validator: (val) => ["m", "l", "xl", "full"].includes(val),
    },

    /**
     * Page banner title <br />
     */
    title: {
      type: String,
    },

    /**
     * Banner type <br />
     * `info` `error` `warning` `success` `internet-lost`
     */
    type: {
      type: String,
      default: "info",
      validator: (val) => Object.keys(ICON_MAP).includes(val),
    },

    /**
     * Banner timeout (seconds) <br />
     */
    timeout: {
      type: [Number, String],
    },

    /**
     * Banner variant <br />
     * `notification` `page-banner`
     */
    variant: {
      type: String,
      validator: (val) => ["notification", "page-banner"].includes(val),
    },
  },
  data() {
    return {
      isShow: true,
      timer: null,
    };
  },
  computed: {
    icon() {
      return ICON_MAP[this.type];
    },
    timeoutSeconds() {
      return this.timeout && Number(this.timeout) && Number(this.timeout) > 0
        ? Number(this.timeout)
        : 0;
    },
  },
  mounted() {
    this.setTimer();
  },
  methods: {
    onClose(e) {
      this.isShow = false;
      /**
       * When the close button is clicked
       *
       * @event close
       * @type {object}
       */
      this.$emit("close", e);
    },
    setTimer() {
      if (this.timeoutSeconds > 0) {
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.isShow = false;
          }, this.timeoutSeconds * 1000);
        });
      }
    },
  },
  watch: {
    // TODO: Confirm whether this should restart or modify current remaining time
    timeout() {
      clearTimeout(this.timer);
      this.isShow = true;
      this.setTimer();
    },
  },
};
</script>

<style lang="scss" scoped>
$info-color: $color-blue-60;
$info-background: $color-blue-00;
$success-color: $color-green-80;
$success-background: $color-green-00;
$error-color: $color-red-80;
$error-background: $color-red-00;
$warning-color: $color-orange-80;
$warning-background: $color-orange-05;

.DxpBanner {
  display: flex;
  padding: rem(12);
  border-width: rem(1);
  border-style: solid;
  border-radius: $border-radius-corner;
  max-width: 100%;
  @include stack-margin(rem(24));

  @each $i in $banner_sizes {
    &--size-#{$i} {
      width: component-width-mobile($i);
      @include min-width(tablet) {
        width: component-width($i);
      }
    }
  }

  &--variant-page-banner {
    padding: rem(24);
  }

  &--variant-notification {
    position: fixed;
    top: rem(32);
    left: 0;
    right: 0;
    margin: auto;
    border-width: rem(1);
    border-radius: $border-radius-corner;
    box-shadow: $box-shadow-m;
    z-index: $z-index-notification;
  }

  &--type-info {
    border-color: $info-color;
    background-color: $info-background;
  }

  &--type-success {
    border-color: $success-color;
    background-color: $success-background;
  }

  &--type-error,
  &--type-internet-lost {
    border-color: $error-color;
    background-color: $error-background;
  }

  &--type-warning {
    border-color: $warning-color;
    background-color: $warning-background;
  }

  @media print {
    background-color: $color-white;
    border-width: rem(2);
  }
}

.DxpBanner__Icon {
  margin-right: rem(8);

  .DxpBanner--type-info & {
    color: $info-color;
  }

  .DxpBanner--type-success & {
    color: $success-color;
  }

  .DxpBanner--type-error &,
  .DxpBanner--type-internet-lost & {
    color: $error-color;
  }

  .DxpBanner--type-warning & {
    color: $warning-color;
  }
}

.DxpBanner__Content {
  display: flex;
  align-items: center;
  margin-right: auto;
}

.DxpBanner__CloseButton {
  margin-left: rem(16);
  align-self: flex-start;
}
</style>
```
</details>

<details>
<summary>DxpCard.vue</summary>

```html
<template>
  <div
    :class="['DxpCard', variant && `DxpCard--variant-${variant}`]"
  >
    <div 
      v-if="variant !== 'navigation'"
    >
      <slot name="header" />
      <div
        v-if="
          title ||
            variant === 'summary' ||
            variant === 'summary-action' ||
            variant === 'requirement'
        "
        class="DxpCard__Header"
      >
        <div class="DxpCard__TitleWrapper">
          <div
            v-if="title && ($slots.tooltip || tooltip)"
            class="DxpCard__TooltipTitle"
          >
            <h3 class="dxp-h3 DxpCard__Title">{{ title }}</h3>

            <!-- @slot Tooltip text -->
            <slot name="tooltip">
              <DxpTooltip v-if="tooltip" class="dxp-p">{{ tooltip }}</DxpTooltip>
            </slot>
          </div>

          <h3 v-else-if="title" class="dxp-h3 DxpCard__Title">{{ title }}</h3>

          <h4
            v-if="subtitle"
            :class="[
              variant === 'requirement' ? 'dxp-h3' : 'dxp-h4',
              'DxpCard__Title',
            ]"
          >
            {{ subtitle }}
          </h4>
        </div>

        <dxp-link
          v-if="variant === 'summary' || variant === 'summary-action'"
          text="Edit"
          class="DxpCard__EditLink"
          type="button"
          icon="edit"
          @click="onEdit"
        />
      </div>

      <div class="contain">
        <!-- @slot Card content -->
        <slot></slot>
      </div>

      <dxp-horizontal-line
        v-if="variant === 'action' || variant === 'summary-action'"
        is-full-width
        is-last-line
      />

      <dxp-button
        v-if="(
          (variant === 'action' || variant === 'summary-action') &&
            secondaryButtonText
        )"
        class="DxpCard__Action"
        variant="secondary"
        :text="secondaryButtonText"
        :disabled="secondaryButtonDisabled"
        :icon="secondaryButtonIcon"
        :iconSrc="secondaryButtonIconSrc"
        @click="onSecondaryAction"
      />

      <dxp-button
        v-if="(
          (variant === 'action' || variant === 'summary-action') &&
            buttonType !== 'link'
        )"
        class="DxpCard__Action"
        :text="buttonText || 'Continue'"
        :disabled="buttonDisabled"
        :icon="buttonIcon"
        :iconSrc="buttonIconSrc"
        :icon-position="buttonIconPosition"
        @click="onContinue"
      />
      <dxp-link
        v-if="(
          (variant === 'action' || variant === 'summary-action') &&
            buttonType === 'link'
        )"
        class="DxpCard__Action"
        :text="buttonText || 'Continue'"
        :disabled="buttonDisabled"
        :icon="buttonIcon"
        :iconSrc="buttonIconSrc"
        :icon-position="buttonIconPosition"
        :target="buttonLinkTarget"
        :href="buttonLink"
        :rel="buttonRel"
      />
    </div>

    <div 
      v-else
      @click="onNavigate"
    >
      <slot name="header" />
      <div
        v-if="title || variant === 'navigation'"
        class="DxpCard__Header"
      >
        <div class="DxpCard__TitleWrapper">
          <div
            v-if="title && ($slots.tooltip || tooltip)"
            class="DxpCard__TooltipTitle"
          >
            <h3 class="dxp-h3 DxpCard__Title">{{ title }}</h3>

            <!-- @slot Tooltip text -->
            <slot name="tooltip">
              <DxpTooltip v-if="tooltip" class="dxp-p">{{ tooltip }}</DxpTooltip>
            </slot>
          </div>

          <h3 v-else-if="title" class="dxp-h3 DxpCard__Title">{{ title }}</h3>

          <h4
            v-if="subtitle"
            :class="[
              variant === 'requirement' ? 'dxp-h3' : 'dxp-h4',
              'DxpCard__Title',
            ]"
          >
            {{ subtitle }}
          </h4>
        </div>
        
        <dxp-icon
          v-if="variant === 'navigation'"
          class="DxpCard__NavIcon"
          :icon="cardTitleIcon && cardTitleIcon !== 'none' ? cardTitleIcon : ''"
          size="s"
          name="NavIcon"
          :iconSrc="cardTitleIconSrc"
        />
      </div>

      <div class="contain">
        <!-- @slot Card content -->
        <slot></slot>
      </div>
      
    </div>
  </div>
</template>

<script>
import ICON_SET from "@/assets/icons/icon-set";
import DxpLink from "@/components/link/DxpLink.vue";
import DxpButton from "@/components/button/DxpButton.vue";
import DxpHorizontalLine from "@/components/layout/DxpHorizontalLine.vue";
import DxpTooltip from "@/components/tooltip/DxpTooltip.vue";
import DxpIcon from "@/components/icon/DxpIcon.vue"

export default {
  name: "DxpCard",
  release: "1.0.1",
  lastUpdated: "0.2.1",
  components: {
    DxpLink,
    DxpButton,
    DxpHorizontalLine,
    DxpTooltip,
    DxpIcon
  },
  props: {
    /**
     * Continue button disabled
     */
    buttonDisabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Continue button icon
     */
    buttonIcon: {
      type: String,
      validator: (val) => Object.keys(ICON_SET).includes(val),
    },

    /**
     * Path to button icon (icon must be in appropriate size and aspect ratio)
     */
    buttonIconSrc: {
      type: String,
    },

    /**
     * Button icon position <br />
     * `left` `right`
     */
    buttonIconPosition: {
      type: String,
      default: "left",
      validator: (val) => ["left", "right"].includes(val),
    },

    /**
     * Continue button text
     */
    buttonText: {
      type: String,
    },

    /**
     * Button type <br />
     * `button` `link`
     */
    buttonType: {
      type: String,
      default: "button",
      validator: (val) => ["button", "link"].includes(val),
    },

    /**
     * Button type if link `href` attribute
     */
    buttonLink: {
      type: String,
      default: "javascript:void(0);",
    },

    /**
     * Button type if link `target` attribute <br />
     * * `_self` `_blank` `_parent` `_top`
     */
    buttonLinkTarget: {
      type: String,
      validator: (val) => ["_self", "_blank", "_parent", "_top"].includes(val),
      default: "_self",
    },

    buttonRel: {
      type: String,
    },

    /**
     * Secondary button disabled
     */
    secondaryButtonDisabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Secondary button icon
     */
    secondaryButtonIcon: {
      type: String,
      validator: (val) => Object.keys(ICON_SET).includes(val),
    },

    /**
     * Path to button icon (icon must be in appropriate size and aspect ratio)
     */
    secondaryButtonIconSrc: {
      type: String,
    },

    /**
     * Secondary button text
     */
    secondaryButtonText: {
      type: String,
    },

    /**
     * Card subtitle
     */
    subtitle: {
      type: String,
    },

    /**
     * Card title
     */
    title: {
      type: String,
    },

    /**
     * Card title tooltip
     */
    tooltip: {
      type: String,
    },

    /**
     * Card variant <br />
     * `action` `summary` `summary-action` `requirement` `navigation`
     */
    variant: {
      type: String,
      validator: (val) =>
        ["action", "summary", "summary-action", "requirement", "navigation"].includes(val),
    },

    /**
     * Card Title Icon
     */
    cardTitleIcon: {
      type: String,
      validator: (val) => Object.keys(ICON_SET).includes(val),
    },

    /**
     * Path to card title icon (icon must be in appropriate size and aspect ratio)
     */
    cardTitleIconSrc: {
      type: String,
    },

    /**
     * URL for navigation event
     */
    url: {
      type: String,
      default: "javascript:void(0);",
    },
  },
  methods: {
    onEdit(e) {
      /**
       * When the edit link is clicked
       * @event edit
       * @type {object}
       */
      this.$emit("edit", e);
    },

    onContinue(e) {
      /**
       * When the continue button is clicked
       * @event continue
       * @type {object}
       */
      this.$emit("continue", e);
    },

    onNavigate() {
      /**
       * When the navigate card is clicked
       * @event navigate
       * @type {object}
       */
      this.$emit("navigate", this.url);
    }
  },
};
</script>

<style lang="scss" scoped>
$link: $color-blue-70;
.DxpCard {
  background-color: $color-white;
  box-shadow: $box-shadow-s;
  padding: rem(24);
  border-radius: $border-radius-corner-l;
  @include stack-margin(rem(24));

  @include min-width(tablet) {
    padding: rem(24) rem(32);
    border-radius: $border-radius-corner-l;
  }

  @media print {
    box-shadow: none;
    padding: rem(0);
  }

  &--variant-requirement {
    box-shadow: none;
    padding-top: 0;
    padding-bottom: rem(32);
    border: rem(1) solid $color-cool-grey-20;
    border-radius: $border-radius-corner-l;
    min-height: rem(200);

    @media print {
      box-shadow: none;
      padding: 0 rem(24) rem(32) rem(24);
    }
  }

  &--variant-navigation {
    cursor: pointer;
  }
}

.DxpCard__Header {
  display: flex;
  margin-bottom: rem(16);

  .DxpCard--variant-summary &,
  .DxpCard--variant-summary-action & {
    justify-content: space-between;
  }

  .DxpCard--variant-requirement & {
    padding: rem(12) rem(24);
    margin: 0 rem(-24) rem(24);
    min-height: rem(72);
    border-radius: $border-radius-corner-l $border-radius-corner-l 0 0;
    justify-content: center;
    background-color: $color-blue-00;

    @include min-width(tablet) {
      padding: rem(12) rem(32);
      margin: 0 rem(-32) rem(24);
    }
  }

  .DxpCard--variant-navigation & {
    justify-content: space-between;
    margin-bottom: 0;
  }
  &:hover{
    .DxpCard__NavIcon{
      color: $color-blue-80;
    }
  }
}

.DxpCard__TitleWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.DxpCard__TooltipTitle {
  max-width: rem(720);
  line-height: 0;

  .DxpCard--variant-requirement & {
    text-align: center;
  }

  > .DxpTooltip {
    margin-top: rem(4);
    margin-bottom: rem(4);
    padding-left: rem(8);

    .DxpCard--variant-requirement & {
      margin-top: rem(2);
      margin-bottom: rem(2);
    }
  }
}

.DxpCard__Title {
  margin-bottom: 0;
  overflow-wrap: break-word;

  .DxpCard--variant-requirement & {
    text-align: center;
    @include line-height(m);
  }

  .DxpCard__TooltipTitle & {
    display: inline;
    vertical-align: bottom;
  }
}

.DxpCard__EditLink {
  margin-left: rem(16);
  margin-top: rem(2);
  margin-bottom: rem(2);
  align-self: flex-start;

  @media print {
    display: none;
  }
}

.DxpCard__NavIcon {
  color: $link;
  margin-top: 4px;
  margin-left: rem(16);
}

.DxpCard__Action {
  @include inline-margin(rem(16));

  @media print {
    display: none;
  }
}
</style>
```
</details>

<details>
<summary>DxpNotification.vue</summary>

```html
<template>
  <portal to="notification">
    <DxpBanner
      class="DxpNotification"
      :type="type"
      :size="size"
      :timeout="timeout"
      show-close-button
    >
      <!-- @slot Notification content -->
      <slot></slot>
    </DxpBanner>
  </portal>
</template>

<script>
import PortalVue from "portal-vue";
import DxpBanner from "@/components/banner/DxpBanner.vue";

export default {
  name: "DxpNotification",
  release: "1.0.1",
  lastUpdated: "0.3.1",
  components: {
    PortalVue,
    DxpBanner,
  },
  props: {
    /**
     * Notification size <br />
     * `m` `l`
     */
    size: {
      type: String,
      default: "l",
      validator: (val) => ["m", "l"].includes(val),
    },

    /**
     * Notification type <br />
     * `info` `error` `warning` `success` `internet-lost`
     */
    type: {
      type: String,
      default: "info",
      validator: (val) =>
        ["info", "error", "warning", "success", "internet-lost"].includes(val),
    },

    /**
     * Notification timeout (seconds) <br />
     */
    timeout: {
      type: [Number, String],
    },
  },
};
</script>

<style lang="scss" scoped>
.DxpNotification {
  margin: rem(12) auto 0;
  box-shadow: $box-shadow-m;
  z-index: $z-index-notification;

  &:first-child {
    margin-top: rem(32);
  }
}
</style>
```
</details>
