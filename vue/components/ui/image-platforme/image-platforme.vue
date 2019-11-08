<template>
    <img
        v-bind:class="{ loaded: loaded }"
        v-bind:src="src"
        v-bind:alt="alt"
        v-on:load="loaded = true"
    />
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

img {
    opacity: 0;
    transition: opacity 0.15s ease-out;
}

img.loaded {
    opacity: 1;
}
</style>

<script>
export const ImagePlatforme = {
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

export default ImagePlatforme;
</script>
