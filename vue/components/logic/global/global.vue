<template>
    <div class="global">
        <overlay v-bind:global="true" />
        <alert />
        <ask v-bind:global="true" />
        <notification />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
</style>

<script>
import { deviceMixin } from "../../../mixins";

export const Global = {
    name: "global",
    mixins: [deviceMixin],
    created: function() {
        this.initDevice();
    }
};

export default Global;
</script>
