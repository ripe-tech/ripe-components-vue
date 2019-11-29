<template>
    <a
        class="link"
        v-bind:class="style"
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
    padding-bottom: 2px;
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

a.link.link-color-black {
    color: $black;
}

a.link.link-color-black:hover {
    border-color: $black;
}

a.link.link-color-grey {
    color: $grey;
}

a.link.link-color-grey:hover {
    border-color: $grey;
}

a.link.link-color-orange {
    color: $orange;
}

a.link.link-color-orange:hover {
    border-color: $orange;
}

a.link.link-color-blue {
    color: $blue;
}

a.link.link-color-blue:hover {
    border-color: $blue;
}

a.link.link-color-green {
    color: $green;
}

a.link.link-color-green:hover {
    border-color: $green;
}

a.link.link-color-red {
    color: $red;
}

a.link.link-color-red:hover {
    border-color: $red;
}

a.link.link-color-purple {
    color: $purple;
}

a.link.link-color-purple:hover {
    border-color: $purple;
}

a.link.link-disabled {
    border-color: transparent;
    color: $dark-grey;
    cursor: not-allowed;
}

a.link.link-disabled:hover {
    border-color: transparent;
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
            type: String
        },
        rel: {
            type: String
        },
        target: {
            type: String
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
            default: ""
        }
    },
    computed: {
        style() {
            const base = {};
            if (this.size) base["link-" + this.size] = this.size;
            if (this.disabled) base["link-disabled"] = this.disabled;
            if (this.color) base["link-color-" + this.color] = this.color;
            return base;
        }
    }
};

export default LinkPlatforme;
</script>
