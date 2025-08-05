<template>
  <div
    v-if="isShow"
    :class="[
      'MomBanner',
      `MomBanner--size-${size}`,
      `MomBanner--type-${type}`,
      variant && `MomBanner--variant-${variant}`,
    ]"
  >
    <mom-icon
      :icon="icon"
      :size="variant === 'page-banner' ? 'l' : 'm'"
      class="MomBanner__Icon"
    />

    <div class="MomBanner__Content">
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
      class="MomBanner__CloseButton"
      type="button"
      aria-label="Close banner"
      @click="onClose"
    >
      <mom-icon icon="close" />
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
  name: "MomBanner",
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

.MomBanner {
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

.MomBanner__Icon {
  margin-right: rem(8);

  .MomBanner--type-info & {
    color: $info-color;
  }

  .MomBanner--type-success & {
    color: $success-color;
  }

  .MomBanner--type-error &,
  .MomBanner--type-internet-lost & {
    color: $error-color;
  }

  .MomBanner--type-warning & {
    color: $warning-color;
  }
}

.MomBanner__Content {
  display: flex;
  align-items: center;
  margin-right: auto;
}

.MomBanner__CloseButton {
  margin-left: rem(16);
  align-self: flex-start;
}
</style>
