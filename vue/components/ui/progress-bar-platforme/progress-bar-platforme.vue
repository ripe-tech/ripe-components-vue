<template>
    <div class="progress-bar-container">
        <p class="label" v-bind:style="{ color: this.color }" v-if="label">
            {{ this.label }}
        </p>
        <div class="progress-bar">
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
export const ProgressBarPlatforme = {
    props: {
        color: {
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
        }
    },
    computed: {
        fillStyle: function() {
            return {
                "background-color": this.color || "#4071f2",
                width: `${(this.currentStep / this.steps) * 100}%`
            };
        }
    }
};

export default ProgressBarPlatforme;
</script>
