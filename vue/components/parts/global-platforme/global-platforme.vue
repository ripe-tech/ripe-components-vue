<template>
    <div class="global">
        <overlay-platforme v-bind:global="true" />
        <alert-platforme />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.global {
    display: none;
}
</style>

<script>
export const GlobalPlatforme = {
    name: "global-platforme"
};

export default GlobalPlatforme;
</script>
