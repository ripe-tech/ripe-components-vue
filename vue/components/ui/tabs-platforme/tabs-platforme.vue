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
    margin-left: 2px;
    margin-top: 2px;
    text-transform: uppercase;
}

.tabs > .header > .tab-label {
    color: $grey;
    cursor: pointer;
    padding: 0px 16px;
    transition: 0.125s;
}

.tabs > .header > .tab-label:hover {
    border-bottom: 2px solid #a4adb5;
    color: $dark;
    transition: 0.125s;
    z-index: 2;
}

.tabs > .header > .tab-label:focus {
    border-radius: 6px;
    box-shadow: 0px 0px 0px 2px $blue;
    color: $dark;
    z-index: 2;
}

.tabs > .header > .tab-label.active {
    border-bottom: 2px solid $dark;
    color: $dark;
    z-index: 2;
}

.tabs > .tab {
    border-top: 2px solid #a4adb5;
    margin-top: -1px;
    opacity: 0;
    padding: 15px;
    position: absolute;
    transition: 0.5s;
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
