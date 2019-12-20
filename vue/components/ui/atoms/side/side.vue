<template>
    <div class="side" v-bind:class="[{ visible: visibleData, invisible: !visibleData }, position]">
        <global-events v-on:keydown.esc="visibleData = false" />
        <slot v-bind:hide="() => (visibleData = false)">
            <ul>
                <li
                    v-bind:class="[link.id, { selected: link.selected, disabled: link.disabled }]"
                    v-for="(link, index) in links"
                    v-bind:key="link.id + index"
                >
                    <router-link v-bind:to="link.link" v-if="link.link">
                        {{ link.text }}
                    </router-link>
                    <span v-else>{{ link.text }}</span>
                </li>
            </ul>
        </slot>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.side {
    background: $white;
    border-right: 1px solid #e4e8f0;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0);
    height: 100%;
    left: -280px;
    padding-top: 61px;
    position: fixed;
    top: 0px;
    transition: left 0.25s cubic-bezier(0.645, 0.045, 0.355, 1),
        right 0.25s cubic-bezier(0.645, 0.045, 0.355, 1),
        box-shadow 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 280px;
    z-index: 20;
}

.side.right {
    left: initial;
    right: -280px;
}

.side.visible {
    box-shadow: 0px 6px 15px rgba(36, 37, 38, 0.08);
    left: 0px;
}

.side.right.visible {
    left: initial;
    right: 0px;
}

.side ul {
    font-size: 15px;
    font-weight: 600;
    list-style: none;
    margin: 12px 0px 12px 0px;
    padding: 0px 0px 0px 0px;
    text-align: left;
    user-select: none;
}

.side ul > li {
    cursor: pointer;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
}

.side ul > li.disabled {
    color: #e2e2e2;
    cursor: default;
}

.side ul > li.separator {
    border-top: 1px solid $border-color;
    cursor: default;
    height: 0px;
    margin: 6px 0px 6px 0px;
    padding: 0px 0px 0px 0px;
}

.side ul > li:not(.separator) {
    border-left: 4px solid transparent;
}

.side ul > li:hover,
.side ul > li.selected {
    background-color: $selected-color;
}

.side ul > li.selected {
    border-left-color: $link-hover-color;
    color: $link-hover-color;
}

.side ul > li.disabled:hover,
.side ul > li.disabled.selected {
    background-color: transparent;
    border-left-color: solid transparent;
    color: #e2e2e2;
}

.side ul > li a,
.side ul > li span {
    border: none;
    box-sizing: border-box;
    color: $main-color;
    display: inline-block;
    padding: 12px 24px 12px 24px;
    width: 100%;
}

.side ul > li.selected a,
.side ul > li.selected span {
    color: $link-hover-color;
}

.side ul > li.disabled a,
.side ul > li.disabled span {
    color: $disabled-color;
}

.side ul > li.separator span {
    padding: 0px;
}
</style>

<script>
export const Side = {
    name: "side",
    props: {
        global: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: "left"
        },
        links: {
            type: Array,
            default: () => []
        },
        visible: {
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
            this.visibleData = value;
        },
        visibleData(value) {
            const event = value ? "show-overlay" : "hide-overlay";
            this.$bus.$emit(event);
            this.$bus.$emit("update:visible", value);
        },
        $route(to, from) {
            this.visibleData = false;
        }
    },
    mounted: function() {
        if (!this.global) return;
        this.$bus.$on("show-side", payLoad => {
            this.visibleData = true;
        });
        this.$bus.$on("hide-side", payLoad => {
            this.visibleData = false;
        });
        this.$bus.$on("toggle-side", payLoad => {
            this.visibleData = !this.visibleData;
        });
        this.$bus.$on("overlay-clicked", () => {
            this.visibleData = false;
        });
    }
};

export default Side;
</script>
