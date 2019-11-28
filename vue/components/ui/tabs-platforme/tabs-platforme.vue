<template>
    <div class="wrapper">
        <div class="tabs">
                <div class="tab" v-for="(item, index) in sortedItems" v-bind:key="item.id">
                    <slot v-bind:item="item" v-bind:index="index">
                        <input
                            type="radio"
                            name="css-tabs"
                            class="tab-switch"
                            checked
                            v-bind:id="item.id"
                        />
                        <label
                            class="tab-label"
                            v-bind:for="item.id"
                            v-for="tab in tabs"
                            v-bind:key="tab.id"
                        >{{ item[tab.id] }}</label>
                        <div
                            class="tab-content"
                            v-for="content in contents"
                            v-bind:key="content.id"
                        >
                                {{ item[content.id] }}
                        </div>
                    </slot>
                </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

body {
    font-family: $font-family;
    line-height: 1.618em;
}

.wrapper {
    margin: 0 auto;
    width: 100%;
}

.tabs {
    height: 14.75rem;
    margin: 3rem 0;
    position: relative;
}

.tabs::before,
.tabs::after {
    content: "";
    display: table;
}

.tabs::after {
    clear: both;
}

.tab {
    float: left;
}

.tab-switch {
    display: none;
}

.tab-label {
    color: #000;
    cursor: pointer;
    display: block;
    height: 3em;
    line-height: 2.75em;
    padding: 0 1.618em;
    position: relative;
    top: 0;
    transition: all 0.25s;
}

.tab-label:hover {
    top: -0.25rem;
    transition: top 0.25s;
}

.tab-content {
    border-top: 2px solid grey;
    color: #2c3e50;
    height: 12rem;
    left: 0;
    opacity: 0;
    padding: 1.618rem;
    position: absolute;
    top: 2.75em;
    transition: all 0.35s;
    width: 100%;
    z-index: 1;
}

.tab-switch:checked + .tab-label {
    color: red;
    top: -0.0625rem;
    transition: all 0.35s;
    z-index: 1;
}

.tab-switch:checked + label + .tab-content {
    opacity: 1;
    transition: all 0.35s;
    z-index: 2;
}
</style>

<script>
export const TabsPlatforme = {
    name: "tabs-platforme",
    props: {
        tabs: {
            type: Array,
            default: () => []
        },
        contents: {
            type: Array,
            default: () => []
        },
        items: {
            type: Array,
            default: () => []
        },
        sortMethod: {
            type: Function,
            default: (items, tab, reverse) => {
                return items.sort((first, second) => {
                    const order = reverse ? -1 : 1;
                    const sort = first[tab] > second[tab];
                    return order * (sort ? 1 : -1);
                });
            }
        },
        transition: {
            type: String,
            default: null
        },
        initialSort: {
            type: String,
            default: null
        },
        initialReverse: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            sortTab: this.initialSort,
            reverseSort: this.initialReverse
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
        tabClass(tab) {
            const order = this.reverseSort ? "ascending" : "descending";
            return this.sortTab === tab ? `active ${order}` : "";
        },
        sort(tab) {
            this.reverseSort = this.sortTab === tab ? !this.reverseSort : false;
            this.sortTab = tab;
            this.$emit("sort", this.sortTab, this.reverseSort);
        }
    }
};

export default TabsPlatforme;
</script>
