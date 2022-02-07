<template>
    <div class="progress-bar-container">
        <p class="label" v-bind:style="labelStyle" v-if="label">
            {{ label }}
        </p>
        <div class="progress-bar" v-bind:style="progressBarStyle">
            <div class="fill" v-bind:style="fillStyle" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.progress-bar-container {
    height: auto;
    line-height: initial;
}

.label {
    font-size: 14px;
    font-weight: 600;
    margin: 0px 0px 8px 0px;
    text-align: center;
}

.progress-bar {
    background-color: #d5d6ee;
    height: 4px;
}

.fill {
    background-color: #4071f2;
    height: 100%;
    width: 1%;
}
</style>

<script>
export const ProgressBar = {
    name: "progress-bar",
    props: {
        color: {
            type: String,
            default: null
        },
        backgroundColor: {
            type: String,
            default: null
        },
        steps: {
            type: Number,
            default: 3
        },
        currentStep: {
            type: Number,
            default: 1
        },
        label: {
            type: String,
            default: null
        },
        labelAlignment: {
            type: String,
            default: null
        },
        fillTransitionTime: {
            type: Number,
            default: 0.5
        },
        fillTransitionMode: {
            type: String,
            default: "ease"
        }
    },
    computed: {
        labelStyle() {
            const base = {
                color: this.color,
                "text-align": this.labelAlignment
            };
            return base;
        },
        progressBarStyle() {
            const base = {};
            if (this.backgroundColor) base["background-color"] = this.backgroundColor;
            return base;
        },
        fillStyle() {
            const base = {
                "background-color": this.color || "#4071f2",
                width: `${(this.currentStep / this.steps) * 100}%`,
                transition: `width ${this.fillTransitionTime}s ${this.fillTransitionMode}`
            };
            return base;
        }
    }
};

export default ProgressBar;
</script>
