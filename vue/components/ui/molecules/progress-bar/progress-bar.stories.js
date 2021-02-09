import { storiesOf } from "@storybook/vue";
import { withKnobs, color, number, text, select } from "@storybook/addon-knobs";

const style = {
    "margin-bottom": "10px",
    "max-width": "200px"
};

storiesOf("Components/Molecules/Progress Bar", module)
    .addDecorator(withKnobs)
    .add("Progress Bar", () => ({
        props: {
            steps: {
                default: number("Steps", 3, { min: 0 })
            },
            currentStep: {
                default: number("Current step", 1)
            },
            color: {
                default: color("Color", "#4071f2")
            },
            label: {
                default: text("Label", "")
            },
            labelAlignment: {
                default: select(
                    "Label Alignment",
                    {
                        Unset: null,
                        Left: "left",
                        Right: "right",
                        Center: "center"
                    },
                    null
                )
            },
            fillTransitionTime: {
                default: number("Fill Transition Time", 0.5)
            },
            fillTransitionMode: {
                default: select(
                    "Fill Transition Mode",
                    {
                        ease: "ease",
                        "ease-in": "ease-in",
                        "ease-out": "ease-out",
                        "ease-in-out": "ease-in-out",
                        linear: "linear"
                    },
                    "ease"
                )
            },
            simulationAdvanceStep: {
                default: number("Simulation Advance Step", 5)
            },
            simulationStepTime: {
                default: number("Simulation Step Time (ms)", 500)
            }
        },
        data: function() {
            return {
                style: style,
                simulatedCurrentStep: 0
            };
        },
        methods: {
            onProgressBarSimulationButtonClick() {
                this.simulatedCurrentStep = 0;
                setTimeout(() => this.updateProgress(), 500);
            },
            updateProgress() {
                if (this.simulatedCurrentStep >= 100) return;
                this.simulatedCurrentStep += this.simulationAdvanceStep;
                this.simulatedCurrentStep = Math.min(this.simulatedCurrentStep, 100);
                setTimeout(() => this.updateProgress(), this.simulationStepTime);
            }
        },
        template: `
            <div>
                <progress-bar
                    v-bind:steps="steps"
                    v-bind:current-step="currentStep"
                    v-bind:color="color"
                    v-bind:label="label"
                    v-bind:label-alignment="labelAlignment"
                    v-bind:style="style"
                />
                <progress-bar v-bind:current-step="2" color="#000000" v-bind:style="style"></progress-bar>
                <progress-bar v-bind:current-step="3" color="#46a546" v-bind:style="style" v-bind:label="'Label'"></progress-bar>
                <progress-bar v-bind:current-step="3" color="#c43c35" v-bind:style="style" v-bind:label="'Another label'"></progress-bar>
                <progress-bar
                    v-bind:steps="100"
                    color="#000000"
                    v-bind:current-step="simulatedCurrentStep"
                    v-bind:label="simulatedCurrentStep+'%'"
                    v-bind:fill-transition-time="fillTransitionTime"
                    v-bind:fill-transition-mode="fillTransitionMode"
                />
                <button-color
                    v-bind:size="'small'"
                    v-on:click="onProgressBarSimulationButtonClick">Start progress bar simulation</button-color>
            </div>
        `
    }));
