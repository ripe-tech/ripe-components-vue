<template>
    <div class="tabs">
        <div class="header">
            <div
                class="tab-label"
                v-bind:class="{ active: isTabActive(index), disabled: tab.disabled }"
                v-for="(tab, index) in tabs"
                v-bind:key="tab.id"
                v-on:click="onTabClick(index)"
            >
                {{ tab.title || tab.id }}
            </div>
        </div>
        <div class="tabs-container">
            <div
                class="tab"
                v-bind:class="{ visible: isTabActive(index) }"
                v-for="(tab, index) in tabs"
                v-bind:key="tab.id"
            >
                <slot v-bind:name="tab.id" v-bind:index="index">
                    <p v-if="tab.text">
                        {{ tab.text }}
                    </p>
                </slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.tabs > .header {
    border-bottom: 2px solid $light-grey;
}

.tabs > .header > .tab-label {
    border-bottom: 2px solid transparent;
    color: $grey;
    cursor: pointer;
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    line-height: 28px;
    margin-bottom: -2px;
    max-width: 200px;
    min-height: 28px;
    padding: 0px 25px 0px 25px;
    text-transform: uppercase;
    transition: color 0.125s ease-in-out, border-color 0.125s ease-in-out;
    user-select: none;
}

.tabs > .header > .tab-label.active {
    border-bottom: 2px solid $dark;
    color: $dark;
}

.tabs > .header > .tab-label.disabled,
.tabs > .header > .tab-label.disabled:hover {
    border-bottom: none;
    color: $grey;
    cursor: not-allowed;
}

.tabs > .header > .tab-label:focus,
.tabs > .header > .tab-label:hover {
    border-bottom-color: $dark;
    color: $dark;
}

.tabs > .header > .tab-label:focus {
    outline: none;
}

.tabs > .tabs-container > .tab {
    opacity: 0;
    padding: 15px 15px 15px 15px;
    position: absolute;
    transition: opacity 0.125s ease-in;
    width: 100%;
}

.tabs > .tabs-container > .tab.visible {
    opacity: 1;
}
</style>

<script>
export const TabsPlatforme = {
    name: "tabs-platforme",
    props: {
        tabs: {
            type: Array,
            required: true
        },
        initialTab: {
            type: Number,
            default: 0
        }
    },
    data: function() {
        return {
            currentTab: this.initialTab
        };
    },
    methods: {
        selectTab(index) {
            if (this.tabs[index].disabled) return;
            this.currentTab = index;
            this.$emit("update:tab", this.tabs[this.currentTab], this.currentTab);
        },
        onTabClick(index) {
            this.selectTab(index);
        },
        isTabActive(index) {
            return index === this.currentTab;
        }
    }
};

export default TabsPlatforme;
</script>
