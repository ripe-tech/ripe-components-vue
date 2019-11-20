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
export const GlobalPlatforme = {
    name: "global-platforme"
};

export default GlobalPlatforme;
</script>
