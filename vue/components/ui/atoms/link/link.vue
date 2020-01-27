<template>
    <a
        class="link"
        v-bind:class="classes"
        v-bind:href="href"
        v-bind:rel="rel"
        v-bind:target="target"
        v-on:click="onClick"
    >
        {{ text }}
    </a>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

a.link {
    border-bottom: 1px solid transparent;
    color: $link-color;
    cursor: pointer;
    padding-bottom: 1px;
    text-decoration: none;
    transition: border-color 0.1s ease-in, color 0.1s ease-in;
}

a.link.link-hover-border:hover,
a.link.link-hover-border.hover {
    border-color: $link-hover-color;
}

a.link.link-hover-color:hover,
a.link.link-hover-color.hover {
    color: $link-hover-color;
}

a.link.link-small {
    font-size: 12px;
}

a.link.link-black {
    color: $black;
}

a.link.link-black.link-hover-border:hover,
a.link.link-black.link-hover-border.hover {
    border-color: $black;
}

a.link.link-black.link-hover-color:hover,
a.link.link-black.link-hover-color.hover {
    color: $link-hover-color;
}

a.link.link-grey {
    color: $pale-grey;
}

a.link.link-grey.link-hover-border:hover,
a.link.link-grey.link-hover-border.hover {
    border-color: $pale-grey;
}

a.link.link-orange {
    color: $orange;
}

a.link.link-orange.link-hover-border:hover,
a.link.link-orange.link-hover-border.hover {
    border-color: $orange;
}

a.link.link-blue {
    color: $blue;
}

a.link.link-blue.link-hover-border:hover,
a.link.link-blue.link-hover-border.hover {
    border-color: $blue;
}

a.link.link-green {
    color: $green;
}

a.link.link-green.link-hover-border:hover,
a.link.link-green.link-hover-border.hover {
    border-color: $green;
}

a.link.link-red {
    color: $red;
}

a.link.link-red.link-hover-border:hover,
a.link.link-red.link-hover-border.hover {
    border-color: $red;
}

a.link.link-purple {
    color: $purple;
}

a.link.link-purple.link-hover-border:hover,
a.link.link-purple.link-hover-border.hover {
    border-color: $purple;
}

a.link.link-disabled {
    border-color: transparent;
    color: $medium-grey;
    cursor: default;
}

a.link.link-disabled.link-hover-border:hover,
a.link.link-disabled.link-hover-border.hover {
    border-color: transparent;
}

a.link.link-disabled:active {
    pointer-events: none;
}
</style>

<script>
export const Link = {
    name: "link-ripe",
    props: {
        text: {
            type: String,
            mandatory: true
        },
        href: {
            type: String,
            default: null
        },
        rel: {
            type: String,
            default: null
        },
        target: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: "normal"
        },
        color: {
            type: String,
            default: null
        },
        hover: {
            type: String,
            default: "border"
        }
    },
    computed: {
        classes() {
            const base = {};
            if (this.disabled) base["link-disabled"] = this.disabled;
            if (this.size) base["link-" + this.size] = this.size;
            if (this.color) base["link-" + this.color] = this.color;
            if (this.hover) base["link-hover-" + this.hover] = this.hover;
            return base;
        }
    },
    methods: {
        onClick(event) {
            this.$emit("click", event);
        }
    }
};

export default Link;
</script>
