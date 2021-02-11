<template>
    <img
        class="image"
        v-bind:class="classes"
        v-bind:src="srcData"
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

img.errored.hide-error {
    display: none;
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
        srcError: {
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
        maxWidth: {
            type: Number,
            default: null
        },
        maxHeight: {
            type: Number,
            default: null
        },
        fade: {
            type: Boolean,
            default: true
        },
        hideError: {
            type: Boolean,
            default: null
        }
    },
    data: function() {
        return {
            srcData: this.src,
            loaded: false,
            errored: false
        };
    },
    watch: {
        src(value) {
            this.srcData = value;
        }
    },
    computed: {
        hideErrorB() {
            if (this.hideError !== null && this.hideError !== undefined) {
                return this.hideError;
            }
            return !this.srcError;
        },
        style() {
            const base = {};
            if (![undefined, null].includes(this.width)) base.width = this.width + "px";
            if (![undefined, null].includes(this.height)) base.height = this.height + "px";
            if (![undefined, null].includes(this.maxWidth))
                { base["max-width"] = this.maxWidth + "px"; }
            if (![undefined, null].includes(this.maxHeight))
                { base["max-height"] = this.maxHeight + "px"; }
            return base;
        },
        classes() {
            const base = {
                loaded: this.loaded,
                errored: this.errored,
                "no-fade": !this.fade,
                "hide-error": this.hideErrorB
            };
            return base;
        }
    },
    methods: {
        onLoad(event) {
            this.loaded = true;
            this.errored = false;
            this.$emit("load", event);
        },
        onClick(event) {
            this.$emit("click", event);
        },
        onError(event) {
            this.loaded = false;
            this.errored = true;
            if (this.srcError) this.srcData = this.srcError;
            this.$emit("error", event);
        }
    }
};

export default Image;
</script>
