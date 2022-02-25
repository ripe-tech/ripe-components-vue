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
    height: inherit;
    width: inherit;
}
</style>

<script>
export const Icon = {
    name: "icon",
    props: {
        icon: {
            type: String | Object,
            required: true
        },
        color: {
            type: String,
            default: null
        },
        fill: {
            type: String,
            default: null
        },
        strokeWidth: {
            type: Number,
            default: null
        },
        strokeLinecap: {
            type: String,
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
                let resource = this.icon;
                const isSvgString = typeof this.icon === "string" && this.icon.startsWith("<svg");

                if (typeof this.icon === "string" && !isSvgString) {
                    // "gathers" the complete set of icon contexts and
                    // determines if at least one includes the provided
                    // icon as part of its source
                    const iconContexts =
                        this.$root && this.$root.$iconContexts ? this.$root.$iconContexts : [];
                    const iconContext = iconContexts.find(c =>
                        c.keys().find(key => key === `./${this.icon}.svg`)
                    );

                    // if there is a custom context defined at the root that
                    // contains the item, then uses it
                    if (iconContext) {
                        resource = iconContext(`./${this.icon}.svg?raw`);
                    }
                    // otherwise fallback to default strategy for the retrieval
                    // of icons, using the `try` and `catch` strategy
                    else {
                        try {
                            resource = require(`./../../../../assets/icons/${this.icon}.svg?raw`);
                        } catch (err) {
                            resource = require(`./../../../../assets/icons/extra/${this.icon}.svg?raw`);
                        }
                    }
                }
                if (typeof this.icon === "object") {
                    resource = resource.default;
                }
                return resource;
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
            if (!this.$el.firstElementChild) return;
            if ([undefined, null].includes(value)) return;
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
