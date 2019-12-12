<template>
    <div class="description">
        <div class="text-container">
            <div class="title">
                {{title}}
            </div>
            <div class="subtitle" v-bind:class="{wrap: wrap}">
                {{subtitle}}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.description{
    display: inline-block;
}

.description .text-container {
    padding: 10px 16px 10px 16px;
}

.description .text-container .title {
    color: $dark;
    padding: 0px 0px 3px 0px;
}

.description .text-container .subtitle {
    color: $grey;
}

.description:hover .text-container {
    background-color: $lighter-grey;
    color: $dark;
}

.description:active .text-container {
    background-color: $light-grey;
    color: $dark;
}

.description:focus .text-container {
    background-color: $dark;
    color: $white;
}

.description .text-container .title {
    font-weight: 700;
    font-size: 14px;
    white-space: nowrap;
}

.description .text-container .subtitle {
    font-size: 12px;
    color: $grey;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.description .text-container .subtitle.wrap {
    text-overflow: initial;
    overflow: initial;
    white-space: initial;
}


</style>

<script>
export const DescriptionPlatforme = {
    name: "description-platforme",
    props: {
        title: {
            type: String,
            default: "title"
        },
        subtitle: {
            type: String,
            default: "subtitle"
        },
        size: {
            type: String,
            default: "normal"
        },
        wrap: {
            type: Boolean,
            default: false
        }
    },
    computed: {
    }
};

export default DescriptionPlatforme;
</script>
