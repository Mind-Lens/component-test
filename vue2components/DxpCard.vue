<template>
  <div
    :class="['MomCard', variant && `MomCard--variant-${variant}`]"
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
        class="MomCard__Header"
      >
        <div class="MomCard__TitleWrapper">
          <div
            v-if="title && ($slots.tooltip || tooltip)"
            class="MomCard__TooltipTitle"
          >
            <h3 class="mom-h3 MomCard__Title">{{ title }}</h3>

            <!-- @slot Tooltip text -->
            <slot name="tooltip">
              <MomTooltip v-if="tooltip" class="mom-p">{{ tooltip }}</MomTooltip>
            </slot>
          </div>

          <h3 v-else-if="title" class="mom-h3 MomCard__Title">{{ title }}</h3>

          <h4
            v-if="subtitle"
            :class="[
              variant === 'requirement' ? 'mom-h3' : 'mom-h4',
              'MomCard__Title',
            ]"
          >
            {{ subtitle }}
          </h4>
        </div>

        <mom-link
          v-if="variant === 'summary' || variant === 'summary-action'"
          text="Edit"
          class="MomCard__EditLink"
          type="button"
          icon="edit"
          @click="onEdit"
        />
      </div>

      <div class="contain">
        <!-- @slot Card content -->
        <slot></slot>
      </div>

      <mom-horizontal-line
        v-if="variant === 'action' || variant === 'summary-action'"
        is-full-width
        is-last-line
      />

      <mom-button
        v-if="
          (variant === 'action' || variant === 'summary-action') &&
            secondaryButtonText
        "
        class="MomCard__Action"
        variant="secondary"
        :text="secondaryButtonText"
        :disabled="secondaryButtonDisabled"
        :icon="secondaryButtonIcon"
        :iconSrc="secondaryButtonIconSrc"
        @click="onSecondaryAction"
      />

      <mom-button
        v-if="
          (variant === 'action' || variant === 'summary-action') &&
            buttonType !== 'link'
        "
        class="MomCard__Action"
        :text="buttonText || 'Continue'"
        :disabled="buttonDisabled"
        :icon="buttonIcon"
        :iconSrc="buttonIconSrc"
        :icon-position="buttonIconPosition"
        @click="onContinue"
      />
      <mom-link
        v-if="
          (variant === 'action' || variant === 'summary-action') &&
            buttonType === 'link'
        "
        class="MomCard__Action"
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
        class="MomCard__Header"
      >
        <div class="MomCard__TitleWrapper">
          <div
            v-if="title && ($slots.tooltip || tooltip)"
            class="MomCard__TooltipTitle"
          >
            <h3 class="mom-h3 MomCard__Title">{{ title }}</h3>

            <!-- @slot Tooltip text -->
            <slot name="tooltip">
              <MomTooltip v-if="tooltip" class="mom-p">{{ tooltip }}</MomTooltip>
            </slot>
          </div>

          <h3 v-else-if="title" class="mom-h3 MomCard__Title">{{ title }}</h3>

          <h4
            v-if="subtitle"
            :class="[
              variant === 'requirement' ? 'mom-h3' : 'mom-h4',
              'MomCard__Title',
            ]"
          >
            {{ subtitle }}
          </h4>
        </div>
        
        <mom-icon
          v-if="variant === 'navigation'"
          class="MomCard__NavIcon"
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
import MomLink from "@/components/link/MomLink.vue";
import MomButton from "@/components/button/MomButton.vue";
import MomHorizontalLine from "@/components/layout/MomHorizontalLine.vue";
import MomTooltip from "@/components/tooltip/MomTooltip.vue";
import DxpIcon from "@/components/icon/DxpIcon.vue"

export default {
  name: "MomCard",
  release: "1.0.1",
  lastUpdated: "0.2.1",
  components: {
    MomLink,
    MomButton,
    MomHorizontalLine,
    MomTooltip,
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
.MomCard {
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

.MomCard__Header {
  display: flex;
  margin-bottom: rem(16);

  .MomCard--variant-summary &,
  .MomCard--variant-summary-action & {
    justify-content: space-between;
  }

  .MomCard--variant-requirement & {
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

  .MomCard--variant-navigation & {
    justify-content: space-between;
    margin-bottom: 0;
  }
  &:hover{
    .MomCard__NavIcon{
      color: $color-blue-80;
    }
  }
}

.MomCard__TitleWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.MomCard__TooltipTitle {
  max-width: rem(720);
  line-height: 0;

  .MomCard--variant-requirement & {
    text-align: center;
  }

  > .MomTooltip {
    margin-top: rem(4);
    margin-bottom: rem(4);
    padding-left: rem(8);

    .MomCard--variant-requirement & {
      margin-top: rem(2);
      margin-bottom: rem(2);
    }
  }
}

.MomCard__Title {
  margin-bottom: 0;
  overflow-wrap: break-word;

  .MomCard--variant-requirement & {
    text-align: center;
    @include line-height(m);
  }

  .MomCard__TooltipTitle & {
    display: inline;
    vertical-align: bottom;
  }
}

.MomCard__EditLink {
  margin-left: rem(16);
  margin-top: rem(2);
  margin-bottom: rem(2);
  align-self: flex-start;

  @media print {
    display: none;
  }
}

.MomCard__NavIcon {
  color: $link;
  margin-top: 4px;
  margin-left: rem(16);
}

.MomCard__Action {
  @include inline-margin(rem(16));

  @media print {
    display: none;
  }
}
</style>
