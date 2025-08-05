<template>
  <portal to="notification">
    <MomBanner
      class="DxpNotification"
      :type="type"
      :size="size"
      :timeout="timeout"
      show-close-button
    >
      <!-- @slot Notification content -->
      <slot></slot>
    </MomBanner>
  </portal>
</template>

<script>
import PortalVue from "portal-vue";
import MomBanner from "@/components/banner/MomBanner.vue";

export default {
  name: "DxpNotification",
  release: "1.0.1",
  lastUpdated: "0.3.1",
  components: {
    PortalVue,
    MomBanner,
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
