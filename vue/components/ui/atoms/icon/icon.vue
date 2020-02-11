<template>
    <div
        class="icon"
        v-if="icon"
        v-on:click="onClick"
        v-html="svgFile"
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
    computed: {
        svgFile() {
            try {
                return require(`!!raw-loader!./../../../../assets/icons/black/${this.icon}.svg`).default;
            }
            catch (error) {
                console.error(`Error loading icon '${this.icon}'.`, error);
            }
        }
    },
    methods: {
        onClick(event) {
            this.$emit("click", event);
        },
        setSvgAttributes(attributes) {
            this.$nextTick(() => {
                if (!this.$el.firstElementChild) return;
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
