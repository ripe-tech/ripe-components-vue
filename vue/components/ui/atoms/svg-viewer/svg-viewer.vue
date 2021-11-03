<template>
    <object class="svg-viewer" type="image/svg+xml" v-bind:data="svgData" />
</template>

<style scoped></style>

<script>
export const SVGViewer = {
    name: "svg-viewer",
    props: {
        src: {
            type: String,
            default: null
        }
    },
    data: function() {
        return {
            svgData: null
        };
    },
    watch: {
        async src(value) {
            await this.loadSVGData(value);
        }
    },
    created: async function() {
        await this.loadSVGData(this.src);
    },
    methods: {
        async loadSVGData(src) {
            if (!src) return;
            const response = await fetch(src);
            const data = await response.text();
            const encoded = window.btoa(data);
            this.svgData = `data:image/svg+xml;base64,${encoded}`;
        }
    }
};

export default SVGViewer;
</script>
