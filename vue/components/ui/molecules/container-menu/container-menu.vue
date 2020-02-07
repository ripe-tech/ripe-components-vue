<template>
    <div
        class="container-menu"
        v-bind:class="[menuVisible ? 'menu-visible' : 'menu-invisible', mode, `align-${alignment}`]"
    >
        <div class="container">
            <slot name="container" />
        </div>
        <div class="menu" v-bind:style="menuStyle">
            <slot name="menu" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "css/variables.scss";

.container-menu {
    display: flex;
}

.container-menu.floating {
    position: relative;
}

.container-menu .container {
    display: inline-block;
    flex: 1 0;
}

.container-menu.align-left .container {
    order: 1;
}

.container-menu .menu {
    display: inline-block;
    overflow-x: hidden;
    overflow-y: auto;
    white-space: nowrap;
}

.container-menu.collapse.menu-invisible .menu,
.container-menu.floating.menu-invisible .menu {
    width: 0px;
}

.container-menu.floating .menu {
    height: 100%;
    position: absolute;
    top: 0px;
    z-index: 1;
}

.container-menu.floating.align-left .menu {
    left: 0px;
}

.container-menu.floating.align-right .menu {
    right: 0px;
}
</style>

<script>
export const ContainerMenu = {
    name: "container-menu",
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
        },
        animationFunction: {
            type: String,
            default: "ease-in-out"
        }
    },
    computed: {
        menuStyle: function() {
            const menuVisible = this.mode === "fixed" ? true : this.menuVisible;
            const base = {
                width: this.menuWidth === null || !menuVisible ? null : `${this.menuWidth}px`,
                transition: `width ${this.animationDuration}s ${this.animationFunction}`
            };
            return base;
        }
    }
};

export default ContainerMenu;
</script>
