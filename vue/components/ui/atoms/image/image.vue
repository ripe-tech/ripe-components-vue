<template>
    <img
        class="image"
        v-bind:class="{ loaded: loaded }"
        v-bind:src="src"
        v-bind:alt="alt"
        v-on:load="loaded = true"
        v-on:click="event => $emit('click', event)"
    />
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

img {
    opacity: 0;
    transition: opacity 0.35s ease-out;
}

img.loaded {
    opacity: 1;
}
</style>

<script>
export const Image = {
    name: "image-ripe",
    props: {
        src: {
            type: String,
            default: null
        },
        alt: {
            type: String,
            default: null
        }
    },
    data: function() {
        return {
            loaded: false
        };
    }
};

export default Image;
</script>
