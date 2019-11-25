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
    line-height: 15px;
    letter-spacing: 0.45px;
    overflow: hidden;
    padding: 5px 12px 5px 12px;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
}

.tag.tag-small {
    font-size: 10px;
    letter-spacing: 0.35px;
    padding: 4px 10px 4px 10px;
}

.tag.tag-large {
    font-size: 14px;
    letter-spacing: 0.65px;
    padding: 6px 14px 6px 14px;
}

.tag,
.tag.tag-black {
    background-color: #1d2631;
    color: #ffffff;
}

.tag.tag-grey {
    background-color: #57626e;
    color: #ffffff;
}

.tag.tag-orange {
    background-color: #fb9032;
    color: #ffffff;
}

.tag.tag-blue {
    background-color: #4b8dd7;
    color: #ffffff;
}

.tag.tag-green {
    background-color: #45a777;
    color: #ffffff;
}

.tag.tag-red {
    background-color: #e96760;
    color: #ffffff;
}

.tag.tag-purple {
    background-color: #5f60c2;
    color: #ffffff;
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
        size: {
            type: String
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
            if (this.size) base["tag-" + this.size] = this.size;
            return base;
        }
    }
};

export default TagPlatforme;
</script>
