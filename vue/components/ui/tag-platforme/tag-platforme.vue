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
    height: 15px;
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
    height: 12px;
    letter-spacing: 0.35px;
    line-height: 12px;
    padding: 4px 10px 4px 10px;
}

.tag.tag-large {
    font-size: 14px;
    height: 17px;
    letter-spacing: 0.65px;
    line-height: 17px;
    padding: 6px 14px 6px 14px;
}

.tag,
.tag.tag-black {
    background-color: $dark-blue;
    color: $white;
}

.tag.tag-grey {
    background-color: $grey;
    color: $white;
}

.tag.tag-orange {
    background-color: $orange;
    color: $white;
}

.tag.tag-blue {
    background-color: $blue;
    color: $white;
}

.tag.tag-green {
    background-color: $green;
    color: $white;
}

.tag.tag-red {
    background-color: $red;
    color: $white;
}

.tag.tag-purple {
    background-color: $purple;
    color: $white;
}

.tag.tag-black {
    background-color: $dark-blue;
    color: $white;
}

.tag.tag-grey.tag-subtle {
    background-color: $light-grey;
    color: $grey;
}

.tag.tag-orange.tag-subtle {
    background-color: $light-orange;
    color: $orange;
}

.tag.tag-blue.tag-subtle {
    background-color: $light-blue;
    color: $blue;
}

.tag.tag-green.tag-subtle {
    background-color: $light-green;
    color: $green;
}

.tag.tag-red.tag-subtle {
    background-color: $light-red;
    color: $red;
}

.tag.tag-purple.tag-subtle {
    background-color: $light-purple;
    color: $purple;
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
