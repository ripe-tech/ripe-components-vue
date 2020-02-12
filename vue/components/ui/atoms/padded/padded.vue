<template>
    <div class="padded">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.padded {
    padding: 0px 16px 0px 16px;
}

body.mobile .padded {
    padding: 0px 0px 0px 0px;
}
</style>

<script>
export const Padded = {
    name: "padded"
};

export default Padded;
</script>
