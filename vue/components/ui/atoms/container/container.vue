<template>
    <div class="container-ripe">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.container-ripe {
    background-color: $white;
    border-radius: 8px 8px 8px 8px;
    box-shadow: 0px 6px 15px rgba(36, 37, 38, 0.08);
    margin: 32px auto 32px auto;
    max-width: 1240px;
    overflow: hidden;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.container-ripe:hover {
    box-shadow: 5px 12px 20px rgba(36, 37, 38, 0.13);
}
</style>

<script>
export const Container = {
    name: "container-ripe"
};

export default Container;
</script>
