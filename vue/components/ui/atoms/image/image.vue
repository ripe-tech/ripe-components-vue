<template>
    <img
        class="image"
        v-bind:class="{ loaded: loaded, 'no-fade': !fade }"
        v-bind:src="src"
        v-bind:alt="alt"
        v-on:load="onLoad"
        v-on:click="event => $emit('click', event)"
        v-on:error="onError"
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

img.no-fade {
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
            default: ""
        },
        fade: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            loaded: false
        };
    },
    methods: {
        onLoad() {
            this.loaded = true;
        },
        onError(event) {
            this.loaded = false;
        }
    }
};

export default Image;
</script>
