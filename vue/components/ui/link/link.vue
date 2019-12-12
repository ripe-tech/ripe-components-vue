<template>
    <a
        class="link"
        v-bind:class="classes"
        v-bind:href="href"
        v-bind:rel="rel"
        v-bind:target="target"
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
    transition: border-color 0.1s ease-in;
}

a.link:hover,
a.link.hover {
    border-color: $link-hover-color;
}

a.link.link-small {
    font-size: 12px;
}

a.link.link-black {
    color: $black;
}

a.link.link-black:hover {
    border-color: $black;
}

a.link.link-grey {
    color: $grey;
}

a.link.link-grey:hover {
    border-color: $grey;
}

a.link.link-orange {
    color: $orange;
}

a.link.link-orange:hover {
    border-color: $orange;
}

a.link.link-blue {
    color: $blue;
}

a.link.link-blue:hover {
    border-color: $blue;
}

a.link.link-green {
    color: $green;
}

a.link.link-green:hover {
    border-color: $green;
}

a.link.link-red {
    color: $red;
}

a.link.link-red:hover {
    border-color: $red;
}

a.link.link-purple {
    color: $purple;
}

a.link.link-purple:hover {
    border-color: $purple;
}

a.link.link-disabled {
    border-color: transparent;
    color: $medium-grey;
    cursor: default;
}

a.link.link-disabled:hover {
    border-color: transparent;
}

a.link.link-disabled:active {
    pointer-events: none;
}
</style>

<script>
export const LinkPlatforme = {
    name: "link-platforme",
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
        }
    },
    computed: {
        classes() {
            const base = {};
            if (this.disabled) base["link-disabled"] = this.disabled;
            if (this.size) base["link-" + this.size] = this.size;
            if (this.color) base["link-" + this.color] = this.color;
            return base;
        }
    }
};

export default LinkPlatforme;
</script>
