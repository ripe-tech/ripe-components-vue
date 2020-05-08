<template>
    <div class="container-ripe" v-bind:class="classes">
        <div class="container-header" v-if="hasHeaderContent">
            <slot name="header">
                <title-ripe v-if="title">
                    {{ title }}
                </title-ripe>
                <slot name="header-buttons">
                    <div class="header-buttons">
                        <slot name="header-buttons-before" />
                        <button-icon
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
                        <slot name="header-buttons-after" />
                    </div>
                </slot>
            </slot>
        </div>
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
    border-radius: 0px 0px 0px 0px;
    margin: 0px 0px 0px 0px;
    max-width: 100%;
}

body.mobile .container-ripe {
    border-radius: 0px 0px 0px 0px;
    box-shadow: none;
    margin: 0px auto 18px auto;
    width: 100%;
}

.container-ripe > .container-header {
    align-items: center;
    display: flex;
    font-size: 0px;
    padding: 24px 24px 20px 24px;
}

body.tablet .container-ripe > .container-header,
body.mobile .container-ripe > .container-header {
    padding: 20px 15px 20px 15px;
}

.container-ripe > .container-header > .title {
    flex: 1;
}
</style>

<script>
export const Container = {
    name: "container-ripe",
    props: {
        mode: {
            type: String,
            default: "default"
        },
        title: {
            type: String,
            default: null
        },
        headerButtons: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        hasHeaderContent() {
            return (
                this.title ||
                this.headerButtons.length > 0 ||
                this.$slots.header ||
                this.$slots["header-buttons"] ||
                this.$slots["header-buttons-before"] ||
                this.$slots["header-buttons-before"]
            );
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
        }
    }
};

export default Container;
</script>
