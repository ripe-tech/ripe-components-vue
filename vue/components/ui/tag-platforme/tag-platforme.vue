<template>
    <div class="tag" v-bind:class="style">
        {{ text }}
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.tag {
    border-radius: 4px;
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    overflow: hidden;
    padding: 3px 12px 3px 12px;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
}

.tag.tag-orange {
    background-color: #eceef1;
    color: #57626e;
}

.tag.tag-blue {
    background-color: #eceef1;
    color: #57626e;
}

.tag.tag-green {
    background-color: #eceef1;
    color: #57626e;
}

.tag.tag-red {
    background-color: #eceef1;
    color: #57626e;
}

.tag.tag-grey {
    background-color: #eceef1;
    color: #57626e;
}
</style>

<script>
export const TagPlatforme = {
    name: "tag-platforme",
    props: {
        text: {
            type: String,
            mandatory: true
        },
        color: {
            type: String,
            default: "grey"
        }
    },
    computed: {
        style() {
            const base = {};
            base["tag-" + this.color] = this.color;
            return base;
        }
    }
};

export default TagPlatforme;
</script>
