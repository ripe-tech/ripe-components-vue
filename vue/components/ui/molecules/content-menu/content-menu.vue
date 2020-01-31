<template>
    <div
        class="content-menu"
        v-bind:class="[menuVisible ? 'menu-visible' : 'menu-invisible', mode, `align-${alignment}`]"
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
}

.content-menu.floating {
    position: relative;
}

.content-menu .content {
    display: inline-block;
    flex: 1 0;
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

.content-menu.collapse.menu-invisible .menu,
.content-menu.floating.menu-invisible .menu {
    width: 0px;
}

.content-menu.floating .menu {
    height: 100%;
    position: absolute;
    top: 0px;
    z-index: 10;
}

.content-menu.floating.align-left .menu {
    left: 0px;
}

.content-menu.floating.align-right .menu {
    right: 0px;
}
</style>

<script>
export const ContentMenu = {
    name: "content-menu",
    props: {
        alignment: {
            type: String,
            default: "right"
        },
        mode: {
            type: String,
            default: "collapse"
        },
        menuVisible: {
            type: Boolean,
            default: true
        },
        menuWidth: {
            type: Number,
            default: 200
        },
        animationDuration: {
            type: Number,
            default: 0.3
        }
    },
    computed: {
        menuStyle: function() {
            const menuVisible = this.mode === "fixed" ? true : this.menuVisible;
            const base = {
                width: this.menuWidth === null || !menuVisible ? null : `${this.menuWidth}px`,
                transition: `width ${this.animationDuration}s ease-in-out`
            };
            return base;
        }
    }
};

export default ContentMenu;
</script>
