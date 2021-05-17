<template>
    <div class="dropdown-container" v-bind:class="classes">
        <global-events v-on:keydown.esc="onEscKey" v-on:click="onGlobalClick" />
        <transition name="slide" v-on:after-leave="onSlideAfterLeave">
            <ul class="dropdown" v-bind:style="dropdownStyle" v-show="visibleData" ref="dropdown">
                <li
                    class="dropdown-item-empty"
                    v-bind:data-value="'empty'"
                    v-if="items.length === 0"
                >
                    {{ messageEmpty }}
                </li>
                <li
                    class="dropdown-item"
                    v-bind:data-value="item.value"
                    v-bind:class="_getItemClasses(item, index)"
                    v-for="(item, index) in items.filter(v => v !== null && v !== undefined)"
                    v-else
                    v-bind:key="item.value"
                    v-on:click="() => click(item, index)"
                    v-on:mouseenter="() => onMouseenter(index)"
                    v-on:mouseleave="() => onMouseleave(index)"
                >
                    <slot v-bind:item="item" v-bind:index="index" v-bind:name="item.value">
                        <slot
                            v-bind:item="item"
                            v-bind:index="index"
                            v-bind:highlighted="highlightedData[index]"
                            v-bind:selected="selectedData[index]"
                        >
                            <icon
                                v-bind:width="18"
                                v-bind:height="18"
                                v-bind:icon="item.icon"
                                v-if="item.icon"
                            />
                            <router-link class="label" v-bind:to="item.link" v-if="item.link">
                                {{ item.label || item.value }}
                            </router-link>
                            <a
                                class="label"
                                v-bind:href="item.href"
                                v-bind:target="item.target || '_self'"
                                v-else-if="item.href"
                            >
                                {{ item.label || item.value }}
                            </a>
                            <span class="label" v-else>{{ item.label || item.value }}</span>
                        </slot>
                    </slot>
                </li>
            </ul>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.dropdown-container {
    position: relative;
    width: 100%;
}

.dropdown-container .slide-enter-active,
.dropdown-container.slide-leave-active {
    transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.dropdown-container .slide-enter,
.dropdown-container .slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.dropdown-container.direction-top .slide-enter,
.dropdown-container.direction-top .slide-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.dropdown-container.alignment-left {
    text-align: left;
}

.dropdown-container.alignment-right {
    text-align: right;
}

.dropdown-container.alignment-center {
    text-align: center;
}

.dropdown-container .slide-enter-to,
.dropdown-container .slide-leave {
    opacity: 1;
}

.dropdown-container .dropdown {
    background-color: $white;
    border: 1px solid #dddddd;
    border-radius: 5px 5px 5px 5px;
    box-shadow: 1px 2px 5px rgba(20, 20, 20, 0.1);
    box-sizing: border-box;
    color: $dark-grey;
    font-size: 13px;
    font-weight: 600;
    list-style: none;
    margin: 0px 0px 0px 0px;
    overflow: hidden;
    padding: 0px;
    user-select: none;
}

.dropdown-container .dropdown > .dropdown-item-empty {
    padding: 8px 14px 8px 14px;
    line-height: 18px;
}

.dropdown-container .dropdown > .dropdown-item {
    background-color: $white;
    cursor: pointer;
    display: flex;
    line-height: 18px;
    margin: 0px 0px 0px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dropdown-container .dropdown > .dropdown-item > .icon {
    box-sizing: content-box;
    height: 18px;
    padding-right: 0px;
    width: 18px;
}

.dropdown-container .dropdown > .dropdown-item > .label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    width: auto;
}

.dropdown-container .dropdown > .dropdown-item:hover,
.dropdown-container .dropdown > .dropdown-item:active,
.dropdown-container .dropdown > .dropdown-item.selected,
.dropdown-container .dropdown > .dropdown-item.highlighted {
    background-color: $soft-blue;
}

.dropdown-container .dropdown > .dropdown-item.separator {
    border-top: 1px solid $border-color;
}

.dropdown-container .dropdown > .dropdown-item > * {
    box-sizing: border-box;
    padding: 8px 14px 8px 14px;
    width: 100%;
}

.dropdown-container .dropdown > .dropdown-item > a {
    border-bottom: none;
    color: $dark-grey;
    text-decoration: none;
}

.dropdown-container .dropdown > .dropdown-item:hover > a,
.dropdown-container .dropdown > .dropdown-item.selected > a,
.dropdown-container .dropdown > .dropdown-item.highlighted > a {
    color: $blacker;
}

.dropdown-container .dropdown > .dropdown-item.icon > a {
    padding-left: 12px;
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
        selected: {
            type: Object,
            default: () => ({})
        },
        highlighted: {
            type: Object,
            default: () => ({})
        },
        visible: {
            type: Boolean,
            default: true
        },
        variant: {
            type: String,
            default: null
        },
        alignment: {
            type: String,
            default: "left"
        },
        managed: {
            type: Boolean,
            default: false
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
        minWidth: {
            type: Number,
            default: null
        },
        maxHeight: {
            type: Number,
            default: null
        },
        verticalPadding: {
            type: Number,
            default: 0
        },
        overflow: {
            type: String,
            default: "auto"
        },
        direction: {
            type: String,
            default: "bottom"
        },
        messageEmpty: {
            type: String,
            default: "No Items"
        },
        owners: {
            type: Node | Array,
            default: () => []
        }
    },
    data: function() {
        return {
            visibleData: this.visible,
            highlightedData: this.highlighted,
            selectedData: this.selected
        };
    },
    watch: {
        visible(value) {
            this.setVisible(value);
        },
        selected(value) {
            this.selectedData = value;
        },
        highlighted(value) {
            this.highlightedData = value;
        },
        selectedData(value) {
            this.$emit("update:selected", value);
        },
        highlightedData(value) {
            this.$emit("update:highlighted", value);
        }
    },
    computed: {
        isVisible() {
            return this.visible && this.visibleData;
        },
        classes() {
            const base = {};
            if (this.direction) {
                base[`direction-${this.direction}`] = true;
            }
            if (this.variant) {
                base[`${this.variant}`] = true;
            }
            if (this.alignment) {
                base[`alignment-${this.alignment}`] = true;
            }
            return base;
        },
        dropdownStyle() {
            const base = {};
            if (this.width) base.width = `${this.width}px`;
            if (this.minWidth) {
                base["min-width"] = `${this.minWidth}px`;
            }
            if (this.maxHeight) {
                base["max-height"] = `${this.maxHeight}px`;
            }
            if (this.verticalPadding) {
                base["padding-top"] = `${this.verticalPadding}px`;
                base["padding-bottom"] = `${this.verticalPadding}px`;
            }
            if (this.overflow) base.overflow = this.overflow;
            return base;
        }
    },
    created: function() {
        this.onHideGlobal = this.$bus.$on("hide-global", () => {
            this.handleGlobal();
        });
    },
    destroyed: function() {
        if (this.onHideGlobal) this.$bus.$off("hide-global", this.onHideGlobal);
    },
    methods: {
        click(item, index) {
            if (this.managed) {
                // invalidates all of the selected data (only one item can
                // be selected at a time) and then updates the currently
                // selected data index
                Object.keys(this.selectedData).forEach(key => {
                    this.$set(this.selectedData, key, false);
                });
                this.$set(this.selectedData, index, true);
            }
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
        onEscKey() {
            this.handleGlobal();
        },
        onGlobalClick(event) {
            const owners = Array.isArray(this.owners) ? this.owners : [this.owners];
            const insideOwners = owners.some(owner => {
                owner = owner.$el ? owner.$el : owner;
                return owner.contains(event.target);
            });
            if (insideOwners) return;
            this.handleGlobal();
        },
        onMouseenter(index) {
            this.highlight(index);
        },
        onMouseleave(index) {
            this.dehighlight(index);
        },
        onSlideAfterLeave() {
            this.$emit("animation:close:end");
        },
        _getItemClasses(item, index) {
            return {
                separator: item.separator,
                icon: Boolean(item.icon),
                highlighted: this.highlightedData[index],
                selected: this.selectedData[index]
            };
        }
    }
};

export default Dropdown;
</script>
