<template>
    <label class="label" v-bind:class="style" v-bind:for="target">
        <slot> {{ text }} </slot>
    </label>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.label {
    color: $grey;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.3px;
    line-height: 15px;
}

.label.label-small {
    font-size: 11px;
    line-height: 13px;
}

.label.label-large {
    font-size: 14px;
    line-height: 16px;
}

.label.label-red,
.label.label-error {
    color: $red;
}
</style>

<script>
export const LabelPlatforme = {
    name: "label-platforme",
    props: {
        text: {
            type: String,
            mandatory: true
        },
        size: {
            type: String,
            default: "normal"
        },
        color: {
            type: String
        },
        target: {
            type: String,
            default: null
        }
    },
    computed: {
        style() {
            const base = {};
            if (this.size) base["label-" + this.size] = this.size;
            if (this.color) base["label-" + this.color] = this.color;
            return base;
        }
    }
};

export default LabelPlatforme;
</script>
