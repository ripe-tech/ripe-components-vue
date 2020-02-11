<template>
    <div class="icon" v-if="icon" v-on:click="onClick" v-html="svgFile" />
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
        },
        color: {
            type: String,
            default: null
        },
        fill: {
            type: String,
            default: null
        },
        borderWidth: {
            type: Number,
            default: null
        },
        width: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: null
        },
        viewBox: {
            type: String,
            default: null
        }
    },
    watch: {
        icon(value) {
            this.setAllSvgAttributes();
        },
        color(value) {
            this.setSvgAttribute("stroke", value);
        },
        fill(value) {
            this.setSvgAttribute("fill", value);
        },
        borderWidth(value) {
            this.setSvgAttribute("stroke-width", value);
        },
        width(value) {
            this.setSvgAttribute("width", value);
        },
        height(value) {
            this.setSvgAttribute("height", value);
        },
        viewBox(value) {
            this.setSvgAttribute("viewBox", value);
        }
    },
    computed: {
        svgFile() {
            try {
                return require(`!!raw-loader!./../../../../assets/icons/black/${this.icon}.svg`)
                    .default;
            } catch (error) {
                console.error(`Error loading icon '${this.icon}'.`, error);
            }
        }
    },
    methods: {
        onClick(event) {
            this.$emit("click", event);
        },
        setSvgAttribute(attribute, value) {
            if (!this.$el.firstElementChild || value === null) return;
            this.$el.firstElementChild.setAttribute(attribute, value);
        },
        setAllSvgAttributes() {
            const attrs = [
                { key: "stroke", value: this.color },
                { key: "fill", value: this.fill },
                { key: "stroke-width", value: this.borderWidth },
                { key: "width", value: this.width },
                { key: "height", value: this.height },
                { key: "viewBox", value: this.viewBox }
            ];
            this.$nextTick(() => {
                attrs.forEach(attr => this.setSvgAttribute(attr.key, attr.value));
            });
        }
    },
    mounted: function() {
        this.setAllSvgAttributes();
    }
};

export default Icon;
</script>
