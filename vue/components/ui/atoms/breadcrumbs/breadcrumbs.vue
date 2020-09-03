<template>
    <div class="breadcrumbs">
        <template v-for="(breadcrumb, index) in breadcrumbs">
            <template v-if="index !== breadcrumbs.length - 1">
                <router-link
                    v-bind:to="breadcrumb.href"
                    v-slot="{ href, navigate }"
                    v-bind:key="index"
                >
                    <link-ripe
                        class="breadcrumb-link"
                        v-bind:text="breadcrumb.text"
                        v-bind:href="href"
                        v-bind:target="breadcrumb.target"
                        v-bind:hover="'color'"
                        v-bind:style="partStyle"
                        v-on:click="navigate"
                    />
                </router-link>
                <div
                    class="breadcrumb-separator"
                    v-bind:style="separatorStyle"
                    v-bind:key="`${index}:separator`"
                    v-html="separator"
                />
            </template>
            <div class="breadcrumb-last" v-bind:style="partStyle" v-else v-bind:key="index">
                {{ breadcrumb.text }}
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.breadcrumbs {
    font-size: 0px;
}

.breadcrumbs > * {
    display: inline-block;
}

.breadcrumbs > .breadcrumb-link,
.breadcrumbs > .breadcrumb-separator {
    color: #a2adb6;
}

.breadcrumbs .breadcrumb-last {
    color: $light-black;
}
</style>

<script>
export const Breadcrumbs = {
    name: "breadcrumbs",
    props: {
        breadcrumbs: {
            type: Array,
            default: () => []
        },
        fontSize: {
            type: Number,
            default: 26
        },
        separator: {
            type: String,
            default: "/"
        }
    },
    computed: {
        partStyle() {
            const base = { "font-size": `${this.fontSize}px` };
            return base;
        },
        separatorStyle() {
            const base = {
                "font-size": `${this.fontSize}px`,
                "margin-left": `${parseInt(this.fontSize / 2)}px`,
                "margin-right": `${parseInt(this.fontSize / 2)}px`
            };
            return base;
        }
    }
};

export default Breadcrumbs;
</script>
