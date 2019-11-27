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

a.link.link-disabled {
    color: #afafba;
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
        }
    },
    computed: {
        style() {
            const base = {};
            if (this.size) base["link-" + this.size] = this.size;
            if (this.disabled) base["link-disabled"] = this.disabled;
            return base;
        }
    }
};

export default LinkPlatforme;
</script>
