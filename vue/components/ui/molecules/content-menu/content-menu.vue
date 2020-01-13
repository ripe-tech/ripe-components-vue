<template>
    <div
        class="content-menu"
        v-bind:class="[{ 'menu-visible': menuVisible }, menuMode, `align-${menuOrientation}`]"
    >
        <div class="content" v-bind:style="contentStyle">
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

.content-menu .menu {
    background: blue;
    display: inline-block;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    white-space: nowrap;
    width: var(--menu-width);
}

.content-menu.collapse .menu {
    transition: width var(--animation-timeout) ease-in-out;
}

.content-menu.collapse:not(.menu-visible) .menu {
    width: 0px;
}

.content-menu.floating .menu {
    transition: all var(--animation-timeout) ease-in-out;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 1;
}

.content-menu.floating:not(.menu-visible) .menu {
    opacity: 0;
    z-index: -1;
    pointer-events: none;
}

.content-menu.floating.align-left .menu {
    left: 0px;
}

.content-menu.floating.align-right .menu {
    right: 0px;
}

.content-menu .content {
    background: red;
    display: inline-block;
    flex: 1 0;
    min-width: var(--content-min-width);
    overflow: auto;
    position: relative;
    white-space: nowrap;
}

.content-menu.align-left .content {
    order: 1;
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
            default: "fixed"
        },
        menuVisible: {
            type: Boolean,
            default: true
        },
        menuWidth: {
            type: Number,
            default: 250
        },
        contentMinWidth: {
            type: Number,
            default: null
        },
        animationTimeout: {
            type: Number,
            default: 0.3
        }
    },
    computed: {
        contentStyle: function() {
            const base = {
                "--content-min-width":
                    this.contentMinWidth === null ? null : `${this.contentMinWidth}px`
            };
            return base;
        },
        menuStyle: function() {
            const base = {
                "--menu-width": this.menuWidth === null ? null : `${this.menuWidth}px`,
                "--collapsed-x": this.menuWidth === null ? null : `${this.menuWidth * -1}px`,
                "--animation-timeout":
                    this.animationTimeout === null ? null : `${this.animationTimeout}s`
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
            isVisible ? this.$emit("menu-open") : this.$emit("menu-close");
        },
        menuVisible(value) {
            this.menuVisibleData = value;
        }
    }
};

export default ContentMenu;
</script>
