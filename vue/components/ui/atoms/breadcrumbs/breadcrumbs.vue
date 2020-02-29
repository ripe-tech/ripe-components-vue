<template>
    <div class="breadcrumbs">
        <template v-for="(breadcrumb, index) in breadcrumbs">
            <template v-if="index !== breadcrumbs.length - 1">
                <link-ripe
                    class="breadcrumb-link"
                    v-bind:text="breadcrumb.text"
                    v-bind:href="breadcrumb.href"
                    v-bind:target="breadcrumb.target"
                    v-bind:hover="'color'"
                    v-bind:style="style"
                    v-bind:key="index"
                />
                <div
                    class="breadcrumb-separator"
                    v-bind:style="style"
                    v-bind:key="`${index}-separator`"
                    v-html="separator"
                />
            </template>
            <div class="breadcrumb-last" v-bind:style="style" v-else v-bind:key="index">
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

.breadcrumbs > .breadcrumb-separator {
    margin: 0px 12px 0px 12px;
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
        style() {
            return { "font-size": `${this.fontSize}px` };
        }
    }
};

export default Breadcrumbs;
</script>
