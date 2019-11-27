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
    letter-spacing: 0.45px;
    line-height: 15px;
    overflow: hidden;
    padding: 5px 12px 5px 12px;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
}

.tag.tag-small {
    font-size: 10px;
    letter-spacing: 0.35px;
    line-height: 12px;
    padding: 4px 10px 4px 10px;
}

.tag.tag-large {
    font-size: 14px;
    letter-spacing: 0.65px;
    line-height: 17px;
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

.tag.tag-black {
    background-color: #1d2631;
    color: #ffffff;
}

.tag.tag-grey.tag-subtle {
    background-color: #eceef1;
    color: #000000;
    opacity: 0.69;
}

.tag.tag-orange.tag-subtle {
    background-color: #ffead0;
    color: #fb9032;
    opacity: 0.69;
}

.tag.tag-blue.tag-subtle {
    background-color: #e5f3ff;
    color: #4b8dd7;
    opacity: 0.69;
}

.tag.tag-green.tag-subtle {
    background-color: #dcfce7;
    color: #45a777;
    opacity: 0.69;
}

.tag.tag-red.tag-subtle {
    background-color: #ffe4e2;
    color: #e96760;
    opacity: 0.69;
}

.tag.tag-purple.tag-subtle {
    background-color: #e1e2ff;
    color: #5f60c2;
    opacity: 0.69;
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
        },
        subtle: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        style() {
            const base = {};
            base["tag-" + this.color] = this.color;
            if (this.size) base["tag-" + this.size] = this.size;
            if (this.subtle) base["tag-subtle"] = this.subtle;
            return base;
        }
    }
};

export default TagPlatforme;
</script>
