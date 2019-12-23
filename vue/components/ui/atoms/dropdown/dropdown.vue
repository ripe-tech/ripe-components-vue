<template>
    <div class="dropdown-container">
        <global-events v-on:keydown.esc="handleGlobal()" />
        <transition name="slide">
            <ul class="dropdown" v-show="visibleData">
                <li
                    class="dropdown-item"
                    v-bind:class="{ separator: item.separator }"
                    v-for="item in items.filter(v => v !== null && v !== undefined)"
                    v-bind:key="item.id"
                    v-on:click.stop="click(item)"
                >
                    <slot v-bind:item="item" v-bind:name="item.id">
                        <slot v-bind:item="item">
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
    color: #4d4d4d;
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
.dropdown > .dropdown-item.selected {
    background-color: $selected-color;
}

.dropdown > .dropdown-item:active {
    background-color: $active-color;
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
    color: #4d4d4d;
}

.dropdown > .dropdown-item:hover > a,
.dropdown > .dropdown-item.selected > a {
    color: #000000;
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
        }
    },
    data: function() {
        return {
            visibleData: this.visible
        };
    },
    watch: {
        visible(value) {
            this.setVisible(value);
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
        }
    }
};

export default Dropdown;
</script>
