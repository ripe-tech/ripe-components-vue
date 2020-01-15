<template>
    <div class="dropdown-container">
        <global-events v-on:keydown.esc="handleGlobal()" />
        <transition name="slide">
            <ul class="dropdown" v-bind:style="dropdownStyle" v-show="visibleData" ref="dropdown">
                <li
                    class="dropdown-item"
                    v-bind:class="_getItemClasses(item, index)"
                    v-for="(item, index) in items.filter(v => v !== null && v !== undefined)"
                    v-bind:key="item.value"
                    v-on:click.stop="click(item, index)"
                    v-on:mouseenter="onMouseenter(index)"
                    v-on:mouseleave="onMouseleave(index)"
                >
                    <slot v-bind:item="item" v-bind:index="index" v-bind:name="item.value">
                        <slot v-bind:item="item" v-bind:index="index">
                            <router-link v-bind:to="item.link" v-if="item.link">
                                {{ item.label }}
                            </router-link>
                            <a
                                v-bind:href="item.href"
                                v-bind:target="item.target || '_self'"
                                v-else-if="item.href"
                            >
                                {{ item.label }}
                            </a>
                            <span v-else>{{ item.label }}</span>
                        </slot>
                    </slot>
                </li>
            </ul>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.slide-enter-active,
.slide-leave-active {
    transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.slide-enter,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.slide-enter-to,
.slide-leave {
    opacity: 1;
}

.dropdown-container {
    position: relative;
    width: 100%;
}

.dropdown {
    border: 1px solid #dddddd;
    border-radius: 5px;
    box-shadow: 1px 2px 5px rgba(20, 20, 20, 0.1);
    box-sizing: border-box;
    color: $dark-grey;
    font-size: 13px;
    font-weight: 600;
    list-style: none;
    margin: 0px 0px 0px 0px;
    overflow: hidden;
    padding: 0px;
}

.dropdown > .dropdown-item {
    background-color: $white;
    cursor: pointer;
    line-height: 18px;
    margin: 0px 0px 0px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dropdown > .dropdown-item:hover,
.dropdown > .dropdown-item:active,
.dropdown > .dropdown-item.selected,
.dropdown > .dropdown-item.highlighted {
    background-color: $soft-blue;
}

.dropdown > .dropdown-item.separator {
    border-top: 1px solid $border-color;
}

.dropdown > .dropdown-item > * {
    box-sizing: border-box;
    display: inline-block;
    padding: 8px 14px 8px 14px;
    width: 100%;
}

.dropdown > .dropdown-item > a {
    border-bottom: none;
    color: $dark-grey;
}

.dropdown > .dropdown-item.separator > span {
    display: none;
}

.dropdown > .dropdown-item:hover > a,
.dropdown > .dropdown-item.selected > a,
.dropdown > .dropdown-item.highlighted > a {
    color: $blacker;
}
</style>

<script>
export const Dropdown = {
    name: "dropdown",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        highlighted: {
            type: Object,
            default: () => ({})
        },
        visible: {
            type: Boolean,
            default: true
        },
        globalEvents: {
            type: Boolean,
            default: true
        },
        globalHide: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: null
        },
        maxHeight: {
            type: Number,
            default: null
        }
    },
    data: function() {
        return {
            visibleData: this.visible,
            highlightedData: this.highlighted
        };
    },
    watch: {
        visible(value) {
            this.setVisible(value);
        },
        highlighted(value) {
            this.highlightedData = value;
        },
        highlightedData(value) {
            this.$emit("update:highlighted", value);
        }
    },
    computed: {
        isVisible() {
            return this.visible && this.visibleData;
        },
        dropdownStyle() {
            const base = {};
            if (this.width) base.width = `${this.width}px`;
            if (this.maxHeight) {
                base["max-height"] = `${this.maxHeight}px`;
                base.overflow = "auto";
            }
            return base;
        }
    },
    created: function() {
        document.addEventListener("click", this.handleGlobal);
    },
    destroyed: function() {
        document.removeEventListener("click", this.handleGlobal);
    },
    methods: {
        click(item, index) {
            this.$emit("item-clicked", item, index);
            this.hide();
        },
        highlight(index) {
            this.$set(this.highlightedData, index, true);
        },
        dehighlight(index) {
            this.$delete(this.highlightedData, index);
        },
        toggle() {
            this.setVisible(!this.visibleData);
        },
        show() {
            this.setVisible(true);
        },
        hide() {
            this.setVisible(false);
        },
        setVisible(value) {
            if (this.visibleData === value) return;
            const globalEvent = value ? "hide-global" : null;
            if (this.globalHide && globalEvent) this.$bus.$emit(globalEvent);
            this.visibleData = value;
            this.$emit("update:visible", value);
        },
        handleGlobal() {
            if (!this.globalEvents) return;
            this.hide();
        },
        onMouseenter(index) {
            this.highlight(index);
        },
        onMouseleave(index) {
            this.dehighlight(index);
        },
        _getItemClasses(item, index) {
            return {
                separator: item.separator,
                highlighted: this.highlightedData[index]
            };
        }
    }
};

export default Dropdown;
</script>
