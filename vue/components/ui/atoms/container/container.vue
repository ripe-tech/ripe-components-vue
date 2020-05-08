<template>
    <div class="container-ripe" v-bind:class="classes">
        <div class="container-header" v-if="title || $slots.header">
            <slot name="header">
                <title-ripe v-if="title">
                    {{ title }}
                </title-ripe>
                 <div class="header-buttons">
                    <button-icon
                        v-for="button in headerButtons" v-bind:key="button.id"
                        v-show="!button.hide"
                        v-bind:text="button.text"
                        v-bind:icon="button.icon"
                        v-bind:color="button.color"
                        v-bind:size="button.size"
                        v-bind:iconOpacity="button.iconOpacity"
                        v-bind:iconFill="button.iconFill"
                        v-bind:iconStrokeWidth="button.iconStrokeWidth"
                        v-bind:padding="button.padding"
                        v-bind:paddingTop="button.paddingTop"
                        v-bind:paddingBottom="button.paddingBottom"
                        v-bind:paddingLeft="button.paddingLeft"
                        v-bind:paddingRight="button.paddingRight"
                        v-bind:paddingFactor="button.paddingFactor"
                        v-bind:paddingTextFactor="button.paddingTextFactor"
                        v-bind:disabled="button.disabled"
                        v-bind:selectable="button.selectable"
                        v-bind:loading="button.loading"
                        v-on:click="event => onButtonIconClick(button.id, event)"
                    />
                </div>
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
    display: flex;
    font-size: 0px;
    padding: 24px 24px 20px 24px;
    text-align: left;
}

body.tablet .container-ripe > .container-header,
body.mobile .container-ripe > .container-header {
    padding: 20px 15px 20px 15px;
}

.container-ripe > .container-header > .title {
    flex: 1;
}

.container-ripe > .container-header > .header-buttons {
    align-self: center;
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
        classes() {
            const base = {};
            if (this.mode) base[`container-ripe-${this.mode}`] = true;
            return base;
        }
    },
    methods: {
        onButtonIconClick(event, buttonEvent) {
            this.$emit("header-button:click", event, buttonEvent);
        }
    }
};

export default Container;
</script>
