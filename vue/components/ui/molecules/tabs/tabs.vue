<template>
    <div class="tabs">
        <div class="header" v-bind:style="headerStyle" v-if="tabs.length > 1">
            <div
                v-bind:class="tabLabelClasses(tab, index)"
                tabindex="0"
                v-for="(tab, index) in tabs"
                v-bind:key="tab.value"
                v-on:click="onClick(index)"
                v-on:keydown.enter="onEnter(index)"
            >
                {{ tab.label || tab.value }}
            </div>
        </div>
        <div class="tabs-container">
            <div
                v-bind:class="tabClasses(tab)"
                v-for="(tab, index) in tabs"
                v-show="isTabActive(index)"
                v-bind:key="tab.value"
                v-bind:ref="`tab-${index}`"
            >
                <slot v-bind:name="tab.value" v-bind:index="index">
                    <p v-if="tab.content">
                        {{ tab.content }}
                    </p>
                </slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.tabs > .header {
    border-bottom: 2px solid $lighter-grey;
    text-align: left;
}

.tabs > .header > .tab-label {
    border-bottom: 2px solid transparent;
    color: $medium-grey;
    cursor: pointer;
    display: inline-block;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.5px;
    line-height: 28px;
    margin-bottom: -2px;
    margin-right: 12px;
    max-width: 200px;
    min-height: 28px;
    padding: 0px 25px 0px 25px;
    text-transform: uppercase;
    transition: color 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        border-color 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
}

.tabs > .header > .tab-label:last-child {
    margin-right: 0px;
}

.tabs > .header > .tab-label.active {
    border-bottom-color: $black;
    color: $black;
}

.tabs > .header > .tab-label:focus {
    outline: none;
}

.tabs > .header > .tab-label:focus,
.tabs > .header > .tab-label:hover {
    border-bottom-color: $black;
    color: $black;
}

.tabs > .header > .tab-label.disabled,
.tabs > .header > .tab-label.disabled:hover {
    border-bottom-color: transparent;
    color: $lighter-grey;
    cursor: default;
}

.tabs > .tabs-container > .tab {
    box-sizing: border-box;
    width: 100%;
}
</style>

<script>
import { utilsMixin } from "../../../../mixins";

export const Tabs = {
    name: "tabs",
    mixins: [utilsMixin],
    props: {
        tabs: {
            type: Array,
            required: true
        },
        tab: {
            type: Number,
            default: 0
        },
        headerAlignment: {
            type: String,
            default: null
        }
    },
    data: function() {
        return {
            tabData: this.tab
        };
    },
    watch: {
        tab(value) {
            this.tabData = value;
        },
        tabData(value) {
            this.$emit("update:tab", value);
        },
        tabs(value) {
            this.tabData = Math.min(this.tabData, value.length - 1);
        }
    },
    computed: {
        headerStyle() {
            const base = {};
            if (this.headerAlignment !== null) base["text-align"] = this.headerAlignment;
            return base;
        }
    },
    methods: {
        selectTab(index) {
            if (this.tabs[index].disabled) return;
            if (this.tabData === index) return;
            this.tabData = index;
            this.$emit("update:tab", this.tabData);
        },
        isTabActive(index) {
            return index === this.tabData;
        },
        tabLabelClasses(tab, index) {
            const base = {
                "tab-label": true,
                active: this.isTabActive(index),
                disabled: tab.disabled
            };
            base[`tab-label-${tab.value}`] = true;
            return base;
        },
        tabClasses(tab) {
            const base = { tab: true };
            base[`tab-${tab.value}`] = true;
            if (tab.value) base[`tab-${this.buildSlug(tab.value)}`] = true;
            return base;
        },
        onEnter(index) {
            this.selectTab(index);
        },
        onClick(index) {
            this.selectTab(index);
        }
    }
};

export default Tabs;
</script>
