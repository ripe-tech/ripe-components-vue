<template>
    <div
        class="icon"
        v-show="icon"
        v-on:click="onClick"
        v-html="require(`!!raw-loader!./../../../../assets/icons/black/${icon}.svg`).default"
    />
</template>

<style scoped>
.icon {
    display: inline-block;
    font-size: 0px;
}
</style>

<script>
export const Icon = {
    name: "icon",
    props: {
        icon: {
            type: String,
            default: null
        }
    },
    watch: {
        $attrs(value) {
            this.setSvgAttributes(value);
        }
    },
    methods: {
        onClick(event) {
            this.$emit("click", event);
        },
        setSvgAttributes(attributes) {
            this.$nextTick(() => {
                for (const [key, value] of Object.entries(attributes)) {
                    this.$el.firstElementChild.setAttribute(key, value);
                }
            });
        }
    },
    mounted: function() {
        this.setSvgAttributes(this.$attrs);
    }
};

export default Icon;
</script>
