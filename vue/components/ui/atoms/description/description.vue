<template>
    <div class="description" v-bind:class="{ selected: selected, wrap: wrap }">
        <div class="text-container">
            <div class="title">
                {{ title }}
            </div>
            <div class="subtitle">
                {{ subtitle }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.description {
    display: inline-block;
}

.description .text-container {
    padding: 10px 16px 10px 16px;
    transition: background-color 0.125s ease-in-out;
}

.description:hover .text-container {
    background-color: $lighter-grey;
    color: $dark;
}

.description:active .text-container {
    background-color: $light-grey;
    color: $dark;
}

.description.selected .text-container {
    background-color: $dark;
}

.description .text-container .title {
    color: $dark;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 0px 0px 3px 0px;
    white-space: nowrap;
}

.description .text-container .subtitle {
    color: $grey;
    font-size: 12px;
    letter-spacing: 0.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.description.wrap .text-container .subtitle {
    overflow: initial;
    text-overflow: initial;
    white-space: initial;
}

.description.selected .text-container .title,
.description.selected .text-container .subtitle {
    color: $white;
}
</style>

<script>
export const Description = {
    name: "description",
    props: {
        title: {
            type: String,
            default: "title"
        },
        subtitle: {
            type: String,
            default: "subtitle"
        },
        wrap: {
            type: Boolean,
            default: false
        },
        selected: {
            type: Boolean,
            default: false
        }
    },
    computed: {}
};

export default Description;
</script>
