<template>
    <div class="global">
        <overlay-platforme v-bind:global="true"></overlay-platforme>
        <alert-platforme />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
</style>

<script>
import { deviceMixin } from "../../../mixins";

export const GlobalPlatforme = {
    name: "global-platforme",
    mixins: [deviceMixin],
    created: function() {
        this.listenDeviceChange();
        this.updateDeviceClass();
    }
};

export default GlobalPlatforme;
</script>
