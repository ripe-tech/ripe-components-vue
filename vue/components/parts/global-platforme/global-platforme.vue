<template>
    <div class="global-platforme">
        <overlay-platforme v-bind:global="true" />
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
        this.initDevice();
    }
};

export default GlobalPlatforme;
</script>
