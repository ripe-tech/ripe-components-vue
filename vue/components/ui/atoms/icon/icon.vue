<template>
    <div class="icon" v-if="icon" v-on:click="onClick" v-html="svgFile" />
</template>

<style scoped>
.icon {
    display: inline-block;
    font-size: 0px;
}

.icon ::v-deep svg {
    display: block;
    height: 100%;
    width: 100%;
}
</style>

<script>
export const Icon = {
    name: "icon",
    props: {
        icon: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        fill: {
            type: String,
            required: false
        },
        strokeWidth: {
            type: Number,
            required: false
        },
        strokeLinecap: {
            type: String,
            required: false
        },
        width: {
            type: Number,
            required: false
        },
        height: {
            type: Number,
            required: false
        },
        viewBox: {
            type: String,
            required: false
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
        strokeWidth(value) {
            this.setSvgAttribute("stroke-width", value);
        },
        strokeLinecap(value) {
            this.setSvgAttribute("stroke-linecap", value);
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
            if (!this.$el.firstElementChild || value === undefined) return;
            this.$el.firstElementChild.setAttribute(attribute, value);
        },
        setAllSvgAttributes() {
            const attrs = [
                { key: "stroke", value: this.color },
                { key: "fill", value: this.fill },
                { key: "stroke-width", value: this.strokeWidth },
                { key: "stroke-linecap", value: this.strokeLinecap },
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
