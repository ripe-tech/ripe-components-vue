<template>
    <div class="container-ripe" v-bind:style="style" v-bind:class="classes">
        <div class="container-header" v-if="hasHeaderContent">
            <slot name="header-before" />
            <slot name="header">
                <breadcrumbs
                    v-bind:font-size="breadcrumbsFontSize"
                    v-bind:separator="breadcrumbsSeparator"
                    v-bind:breadcrumbs="title"
                    v-if="hasBreadcrumbs"
                />
                <title-ripe v-else-if="title">
                    {{ title }}
                </title-ripe>
                <slot name="header-buttons-before" />
                <slot name="header-buttons" v-if="hasHeaderButtons">
                    <div class="header-buttons">
                        <slot name="header-buttons-inside-before" />
                        <button-icon
                            class="header-button"
                            v-bind:text="button.text"
                            v-bind:icon="button.icon"
                            v-bind:color="button.color"
                            v-bind:size="button.size"
                            v-bind:icon-opacity="button.iconOpacity"
                            v-bind:icon-fill="button.iconFill"
                            v-bind:icon-stroke-width="button.iconStrokeWidth"
                            v-bind:padding="button.padding"
                            v-bind:padding-top="button.paddingTop"
                            v-bind:padding-bottom="button.paddingBottom"
                            v-bind:padding-left="button.paddingLeft"
                            v-bind:padding-right="button.paddingRight"
                            v-bind:padding-factor="button.paddingFactor"
                            v-bind:padding-text-factor="button.paddingTextFactor"
                            v-bind:disabled="button.disabled"
                            v-bind:selectable="button.selectable"
                            v-bind:loading="button.loading"
                            v-for="button in headerButtons"
                            v-show="!button.hide"
                            v-bind:key="button.id"
                            v-on:click="event => onButtonIconClick(event, button.id)"
                        />
                        <slot name="header-buttons-inside-after" />
                    </div>
                </slot>
                <slot name="header-buttons-after" />
            </slot>
            <slot name="header-after" />
        </div>
        <slot />
        <div class="container-footer" v-if="hasFooterContent">
            <slot name="footer-before" />
            <slot name="footer" />
            <slot name="footer-after" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.container-ripe {
    background-color: $white;
    border-radius: 8px 8px 8px 8px;
    box-shadow: 0px 6px 15px rgba(36, 37, 38, 0.08);
    margin: 32px auto 32px auto;
    overflow: hidden;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.container-ripe:hover {
    box-shadow: 5px 12px 20px rgba(36, 37, 38, 0.13);
}

.container-ripe.container-ripe-expanded {
    border-radius: 0px 0px 0px 0px;
    margin: 0px 0px 0px 0px;
}

body.mobile .container-ripe {
    border-radius: 0px 0px 0px 0px;
    box-shadow: none;
    margin: 0px auto 18px auto;
    width: 100%;
}

.container-ripe > .container-header {
    font-size: 0px;
    padding: 24px 24px 20px 24px;
    text-align: left;
}

body.tablet .container-ripe > .container-header,
body.mobile .container-ripe > .container-header {
    padding: 20px 15px 20px 15px;
}

.container-ripe > .container-header > .title,
.container-ripe > .container-header > .breadcrumbs {
    display: inline-block;
}

.container-ripe > .container-header > .header-buttons {
    float: right;
    font-size: 0px;
    text-transform: capitalize;
    user-select: none;
}

.container-ripe > .container-footer {
    font-size: 0px;
    padding: 24px 24px 20px 24px;
    text-align: right;
}
</style>

<script>
import { partMixin } from "../../../../mixins";

export const Container = {
    name: "container-ripe",
    mixins: [partMixin],
    props: {
        mode: {
            type: String,
            default: "default"
        },
        title: {
            type: String | Array,
            default: null
        },
        breadcrumbsFontSize: {
            type: Number,
            default: 26
        },
        breadcrumbsSeparator: {
            type: String,
            default: "/"
        },
        headerButtons: {
            type: Array,
            default: () => []
        },
        maxWidth: {
            type: Number | String,
            default: 1240
        },
        maxWidthTablet: {
            type: Number | String,
            default: null
        },
        maxWidthMobile: {
            type: Number | String,
            default: "100%"
        }
    },
    computed: {
        hasBreadcrumbs() {
            return this.title && Array.isArray(this.title);
        },
        hasHeaderButtons() {
            return (
                this.headerButtons.length > 0 ||
                this.$slots["header-buttons"] ||
                this.$slots["header-buttons-inside-before"] ||
                this.$slots["header-buttons-inside-after"]
            );
        },
        hasHeaderContent() {
            return (
                this.title ||
                this.$slots["header-before"] ||
                this.$slots.header ||
                this.$slots["header-buttons-before"] ||
                this.hasHeaderButtons ||
                this.$slots["header-buttons-after"] ||
                this.$slots["header-after"]
            );
        },
        hasFooterContent() {
            return (
                this.$slots["footer-before"] || this.$slots.footer || this.$slots["footer-after"]
            );
        },
        style() {
            const base = {};
            let maxWidth = this.maxWidth;
            if (this.mode === "expanded") maxWidth = "100%";
            if (this.isTabletWidth() && this.maxWidthTable) maxWidth = this.maxWidthTablet;
            if (this.isMobileWidth() && this.maxWidthMobile) maxWidth = this.maxWidthMobile;
            if (maxWidth && typeof maxWidth === "number") {
                base["max-width"] = `${maxWidth}px`;
            }
            if (maxWidth && typeof maxWidth === "string") {
                base["max-width"] = maxWidth;
            }
            return base;
        },
        classes() {
            const base = {};
            if (this.mode) base[`container-ripe-${this.mode}`] = true;
            return base;
        }
    },
    methods: {
        onButtonIconClick(event, buttonId) {
            this.$emit("header-button:click", event, buttonId);
            this.$emit(`header-button:click:${buttonId}`, event);
        }
    }
};

export default Container;
</script>
