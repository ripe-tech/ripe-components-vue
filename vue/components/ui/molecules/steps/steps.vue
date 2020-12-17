<template>
    <div class="steps-container">
        <div class="step" v-for="(step, index) in steps" v-bind:key="index">
            <div class="step-number" v-bind:style="stepStyle(index)">
                <div class="number">
                    {{ index + 1 }}
                </div>
                <div class="step-border" v-show="index + 1 == currentStep" />
            </div>
            <div class="step-text">
                {{ step }}
            </div>
        </div>
        <progress-bar
            class="progress-bar"
            v-bind:steps="steps.length - 1"
            v-bind:color="'#59626d'"
            v-bind:current-step="currentStep - 1"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.steps-container {
    display: flex;
    justify-content: space-between;
    margin: 0px 20px 0px 20px;
    position: relative;
}

.steps-container > .step {
    width: 52px;
}

.steps-container > .step > .step-number > .step-border {
    background: transparent;
    border: 2px solid $white;
    border-radius: 50%;
    height: 44px;
    position: absolute;
    width: 44px;
}

.steps-container > .step > .step-number {
    align-items: center;
    border: 1px solid transparent;
    border-radius: 50%;
    color: $white;
    display: flex;
    flex: 0 0 auto;
    font-size: 15px;
    height: 50px;
    justify-content: center;
    position: relative;
    transition: background-color 0.5s ease-in-out, border 0.5s ease-in-out, color 0.5s ease-in-out;
    user-select: none;
    width: 50px;
}

.steps-container > .step > .step-text {
    color: #000000;
    display: flex;
    font-size: 13px;
    justify-content: center;
    margin-top: 10px;
    text-align: center;
}

.steps-container > .progress-bar {
    position: absolute;
    top: 25px;
    width: 100%;
    z-index: -1;
}
</style>

<script>
export const Steps = {
    name: "steps",
    props: {
        steps: {
            type: Array,
            default: []
        },
        currentStep: {
            type: Number,
            default: 1
        }
    },
    computed: {
        labelStyle() {
            return {
                color: this.color,
                "text-align": this.labelAlignment
            };
        }
    },
    methods: {
        stepStyle(index) {
            const step = index + 1;
            return {
                "background-color": step > this.currentStep ? "#ffffff" : "#59626d",
                border: step > this.currentStep ? "1px solid #eceef1" : "1px solid transparent",
                color: step > this.currentStep ? "#afb6bc" : "#ffffff"
            };
        }
    }
};

export default Steps;
</script>
