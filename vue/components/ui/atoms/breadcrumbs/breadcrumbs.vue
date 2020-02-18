<template>
    <div class="breadcrumbs" v-bind:style="style">
        <template v-for="(breadcrumb, index) in breadcrumbs">
            <template v-if="index != Object.keys(breadcrumbs).length - 1">
                <link-ripe v-bind:key="index" v-bind:text="breadcrumb.text" v-bind:href="breadcrumb.route" v-bind:hover="'color'" />
                <div v-bind:key="`${index}-division`" class="breadcrumb-division" v-html="division"/>
            </template>
            <div v-else v-bind:key="index" class="breadcrumb-last">{{breadcrumb.text}}</div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.breadcrumbs > * {
    display: inline-block;
}

.breadcrumbs > .link,
.breadcrumbs > .breadcrumb-division {
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
        }
    },
    computed: {
        style() {
            return { "font-size": `${this.fontSize}px`}
        },
        division(){
            return "&nbsp&nbsp/&nbsp&nbsp&nbsp";
        }
    }
};

export default Breadcrumbs;
</script>
