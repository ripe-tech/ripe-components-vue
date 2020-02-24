<template>
    <img
        class="image"
        v-bind:class="{ loaded: loaded, 'no-fade': !fade }"
        v-bind:src="src"
        v-bind:alt="alt"
        v-bind:style="style"
        v-on:load="onLoad"
        v-on:click="onClick"
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
        width: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: null
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
    computed: {
        style() {
            const base = {};
            if (![undefined, null].includes(this.width)) base.width = this.width + "px";
            if (![undefined, null].includes(this.height)) base.height = this.height + "px";
            return base;
        }
    },
    methods: {
        onLoad(event) {
            this.loaded = true;
            this.$emit("load", event);
        },
        onClick(event) {
            this.$emit("click", event);
        },
        onError(event) {
            this.loaded = false;
            this.$emit("error", event);
        }
    }
};

export default Image;
</script>
