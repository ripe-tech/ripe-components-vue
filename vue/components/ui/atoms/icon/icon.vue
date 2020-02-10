<template>
    <svg
        v-bind:width="width"
        v-bind:height="height"
        v-bind:viewBox="viewBox"
        v-bind:stroke="stroke"
        v-bind:stroke-width="strokeWidth"
        v-bind:stroke-linecap="strokeLinecap"
        v-bind:fill="fill"
        v-bind:color="color"
        v-bind:opacity="opacity"
        v-if="icon"
        v-on:click="onClick"
        v-html="require(`!!raw-loader!./../../../../assets/icons/path/${icon}.svg`).default"
    >
        <slot />
    </svg>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

</style>

<script>
export const Icon = {
    name: "icon",
    props: {
        icon: {
            type: String,
            default: null
        },
        width: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: null
        },
        viewBox: {
            type: String,
            default: null
        },
        stroke: {
            type: String,
            default: null
        },
        strokeWidth: {
            type: Number,
            default: null
        },
        fill: {
            type: String,
            default: "none"
        },
        color: {
            type: String,
            default: null
        },
        opacity: {
            type: Number,
            default: null
        },
        strokeLinecap: {
            type: String,
            default: null
        }
    },
    data: function() {
        return {
            loaded: false
        };
    },
    methods: {
        onClick(event) {
            this.$emit("click", event);
        }
    }
};

export default Icon;
</script>
