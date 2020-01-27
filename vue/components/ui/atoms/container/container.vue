<template>
    <div class="container-ripe" v-bind:class="classes">
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

.container-ripe.container-ripe-expanded {
    margin: 32px 10px 32px 10px;
    max-width: 100%;
}

body.mobile .container-ripe {
    border-radius: 0px 0px 0px 0px;
    box-shadow: none;
    margin: 0px auto 18px auto;
    width: 100%;
}
</style>

<script>
export const Container = {
    name: "container-ripe",
    props: {
        mode: {
            type: String,
            default: "default"
        }
    },
    computed: {
        classes() {
            const base = {};

            if (this.mode) base[`container-ripe-${this.mode}`] = true;

            return base;
        }
    }
};

export default Container;
</script>
