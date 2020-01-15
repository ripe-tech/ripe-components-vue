<template>
    <div
        class="content-menu"
        v-bind:class="[{ 'menu-visible': menuVisible }, menuMode, `align-${menuOrientation}`]"
    >
        <div class="content">
            <slot name="content" />
        </div>
        <div class="menu" v-bind:style="menuStyle">
            <slot name="menu" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "css/variables.scss";

.content-menu {
    display: flex;
    overflow: hidden;
}

.content-menu .content {
    display: inline-block;
    flex: 1 0;
    overflow: auto;
    white-space: nowrap;
}

.content-menu.align-left .content {
    order: 1;
}

.content-menu .menu {
    display: inline-block;
    overflow-x: hidden;
    overflow-y: auto;
    white-space: nowrap;
}

.content-menu.floating .menu {
    position: absolute;
    top: 0px;
    z-index: 10;
}

.content-menu.collapse:not(.menu-visible) .menu,
.content-menu.floating:not(.menu-visible) .menu {
    width: 0px;
}

.content-menu.floating.align-left .menu {
    left: 0px;
    transform-origin: left;
}

.content-menu.floating.align-right .menu {
    right: 0px;
    transform-origin: right;
}
</style>

<script>
export const ContentMenu = {
    name: "content-menu",
    props: {
        menuOrientation: {
            type: String,
            default: "right"
        },
        menuMode: {
            type: String,
            default: "collapse"
        },
        menuVisible: {
            type: Boolean,
            default: true
        },
        menuWidth: {
            type: Number,
            default: null
        },
        animationTimeout: {
            type: Number,
            default: 0.3
        }
    },
    computed: {
        menuStyle: function() {
            const base = {
                width: this.menuWidth === null || !this.menuVisible ? null : `${this.menuWidth}px`,
                transition: `width ${this.animationTimeout}s ease-in-out`
            };
            return base;
        }
    },
    data: function() {
        return {
            menuVisibleData: this.menuVisible
        };
    },
    watch: {
        menuVisibleData(isVisible) {
            isVisible ? this.$emit("visible") : this.$emit("hidden");
        },
        menuVisible(value) {
            this.menuVisibleData = value;
        }
    }
};

export default ContentMenu;
</script>
