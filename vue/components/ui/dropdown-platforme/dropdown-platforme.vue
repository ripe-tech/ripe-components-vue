<template>
    <div class="dropdown-container">
        <global-events v-on:keydown.esc="handleGlobal()" />
        <transition name="slide">
            <ul class="dropdown-platforme" v-bind:style="dropdownStyle" v-show="isVisible">
                <li
                    class="dropdown-item"
                    v-bind:class="{
                        separator: item.separator,
                        optionHighlighted: index === highlightedIndex
                    }"
                    v-for="(item, index) in items.filter(v => v !== null && v !== undefined)"
                    v-bind:key="item.id"
                    v-on:click.stop="click(item)"
                >
                    <slot v-bind:name="`item-${item.id}`" v-bind:item="item">
                        <router-link v-bind:to="item.link" v-if="item.link">
                            {{ item.text }}
                        </router-link>
                        <a
                            v-bind:href="item.href"
                            v-bind:target="item.target || '_self'"
                            v-else-if="item.href"
                        >
                            {{ item.text }}
                        </a>
                        <span v-else>{{ item.text }}</span>
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
    -o-transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    -ms-transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    -moz-transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    -khtml-transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    -webkit-transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.slide-enter,
.slide-leave-to {
    -o-opacity: 0;
    -ms-opacity: 0;
    -moz-opacity: 0;
    -khtml-opacity: 0;
    -webkit-opacity: 0;
    opacity: 0;
    -o-transform: translateY(-10px);
    -ms-transform: translateY(-10px);
    -moz-transform: translateY(-10px);
    -khtml-transform: translateY(-10px);
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
}

.slide-enter-to,
.slide-leave {
    -o-opacity: 1;
    -ms-opacity: 1;
    -moz-opacity: 1;
    -khtml-opacity: 1;
    -webkit-opacity: 1;
    opacity: 1;
}

.dropdown-container {
    position: relative;
    width: 100%;
}

.dropdown-platforme {
    border: 1px solid #dddddd;
    border-radius: 5px;
    box-shadow: 1px 2px 5px rgba(20, 20, 20, 0.1);
    color: #4d4d4d;
    font-size: 14px;
    font-weight: 600;
    list-style: none;
    margin: 0px 0px 0px 0px;
    overflow: hidden;
    padding: 0px;
    position: absolute;
    box-sizing: border-box;
}

.dropdown-platforme > .dropdown-item {
    background-color: $white;
    cursor: pointer;
    line-height: normal;
    margin: 0px 0px 0px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dropdown-platforme > .dropdown-item:hover,
.dropdown-platforme > .dropdown-item.selected {
    background-color: $selected-color;
}

.dropdown-platforme > .dropdown-item:active {
    background-color: $active-color;
}

.dropdown-platforme > .dropdown-item.separator {
    border-top: 1px solid $border-color;
}

.dropdown-platforme > .dropdown-item > * {
    padding: 12px 16px 12px 16px;
}

.dropdown-platforme > .dropdown-item > a {
    border-bottom: none;
    color: #4d4d4d;
    display: block;
    padding-bottom: 0px;
}

.dropdown-platforme > .dropdown-item:hover > a,
.dropdown-platforme > .dropdown-item.selected > a {
    color: #000000;
}
</style>

<script>
export const DropdownPlatforme = {
    name: "dropdown-platforme",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        width: {
            type: Number,
            default: null
        },
        maxHeight:{
            type: Number,
            default: null    
        },
        highlightedIndex: {
            type: Number,
            default: null
        },
        visible: {
            type: Boolean,
            default: true
        },
        globalEvents: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            visibleData: true
        };
    },
    watch: {
        visible(value) {
            this.visibleData = value;
        }
    },
    computed: {
        isVisible() {
            return this.visible && this.visibleData;
        },
        dropdownStyle() {
            const base = {};

            if(this.width) base.width = `${this.width}px`;
            if(this.maxHeight)
            {
                base["max-height"] = `${this.maxHeight}px`;
                base.overflow = 'overlay';
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
        click(item) {
            this.$emit("item-clicked", item);
            this.hide();
        },
        toggle() {
            this.visibleData = !this.visibleData;
            this.$emit("update:visible", this.visibleData);
        },
        show() {
            if (this.visibleData) return;
            this.visibleData = true;
            this.$emit("update:visible", this.visibleData);
        },
        hide() {
            if (!this.visibleData) return;
            this.visibleData = false;
            this.$emit("update:visible", this.visibleData);
        },
        handleGlobal() {
            if (!this.globalEvents) return;
            this.hide();
        }
    }
};

export default DropdownPlatforme;
</script>
