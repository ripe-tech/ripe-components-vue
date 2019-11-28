<template>
    <div class="tabs">
        <div class="header">
            <span
                class="tab-label"
                v-bind:class="{ active: isTabActive(index) }"
                v-for="(tab, index) in tabs"
                v-bind:key="tab.id"
                v-on:click="onTabClick(index)"
            >
                {{ tab.title || tab.id }}
            </span>
        </div>
        <div
            class="tab"
            v-bind:class="{ active: isTabActive(index) }"
            v-for="(tab, index) in tabs"
            v-bind:key="tab.id"
        >
            <slot v-bind:name="tab.id" v-bind:index="index" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.tabs > .header {
    align-items: center;
    border-radius: 2px;
    display: flex;
    flex-direction: row;
    height: 30px;
    line-height: 30px;
    margin-top: 2px;
    margin-left: 2px;
    text-transform: uppercase;
}

.tabs > .header > .tab-label {
    color: $grey;
    cursor: pointer;
    margin-bottom: -1px;
    padding: 0px 16px;
}

.tabs > .header > .tab-label:hover {
    box-shadow: 0px 0px 0px 2px $blue;
    border-radius: 6px;
    color: $dark;
    z-index: 2;
}

.tabs > .header > .tab-label.active {
    border-bottom: 2px solid $dark;
    color: $dark;
    z-index: 2;
}

.tabs > .tab {
    opacity: 0;
    transition: 0.5s;
    padding: 15px;
    position: absolute;
    border-top: 2px solid #a4adb5;
    width: 100%;
}

.tabs > .tab.active {
    opacity: 1;
    transition: 0.5s;
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
    computed: {
        sortedItems() {
            if (!this.sortTab) {
                return this.items;
            }

            const items = [...this.items];
            return this.sortMethod(items, this.sortTab, this.reverseSort);
        }
    },
    methods: {
        selectTab(index) {
            this.currentTab = index;
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
