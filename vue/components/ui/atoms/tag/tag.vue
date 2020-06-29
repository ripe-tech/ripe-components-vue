<template>
    <div class="tag" v-bind:class="classes" v-bind:style="style" v-on:click="onClick">
        <slot>{{ text }}</slot>
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

.tag.tag-large {
    font-size: 14px;
    height: 17px;
    letter-spacing: 0.65px;
    line-height: 17px;
    padding: 6px 14px 6px 14px;
}

.tag.tag-small {
    font-size: 10px;
    height: 12px;
    letter-spacing: 0.35px;
    line-height: 12px;
    padding: 4px 10px 4px 10px;
}

.tag.tag-tiny {
    font-size: 8px;
    height: 10px;
    letter-spacing: 0.25px;
    line-height: 10px;
    padding: 4px 8px 4px 8px;
}

.tag,
.tag.tag-black {
    background-color: $black;
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
    background-color: $black;
    color: $white;
}

.tag.tag-grey.tag-subtle {
    background-color: $lighter-grey;
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
export const Tag = {
    name: "tag",
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
            default: null
        },
        colorHex: {
            type: String,
            default: null
        },
        subtle: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        classes() {
            const base = {};
            if (this.color) base["tag-" + this.color] = this.color;
            if (this.size) base["tag-" + this.size] = this.size;
            if (this.subtle) base["tag-subtle"] = this.subtle;
            return base;
        },
        style() {
            const base = {};
            if (this.colorHex) base["background-color"] = this.colorHex;
            return base;
        }
    },
    methods: {
        onClick(event) {
            this.$emit("click", event);
        }
    }
};

export default Tag;
</script>
