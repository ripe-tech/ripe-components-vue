import { storiesOf } from "@storybook/vue";
import { withKnobs, number } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Steps", () => ({
        props: {
            currentStep: {
                default: number("Current step", 2, { min: 0, max: 5 })
            },
            simulationAdvanceStep: {
                default: number("Simulation Advance Step", 1)
            },
            simulationStepTimeMs: {
                default: number("Simulation Step Time (ms)", 500)
            }
        },
        data: function() {
            return {
                simulatedCurrentStep: 2,
                steps: [
                    "General Information",
                    "Display",
                    "Personalization",
                    "Validation",
                    "Locales"
                ]
            };
        },
        methods: {
            onProgressBarSimulationButtonClick() {
                if (this.progressTimer) clearTimeout(this.progressTimer);
                this.simulatedCurrentStep = 0;
                this.updateProgress();
            },
            updateProgress() {
                if (this.simulatedCurrentStep >= 5) return;
                this.simulatedCurrentStep += this.simulationAdvanceStep;
                this.simulatedCurrentStep = Math.min(this.simulatedCurrentStep, 5);
                this.progressTimer = setTimeout(this.updateProgress, this.simulationStepTimeMs);
            }
        },
        watch: {
            currentStep(value) {
                this.simulatedCurrentStep = value;
            }
        },
        template: `
            <div>
                <steps
                    v-bind:current-step="simulatedCurrentStep"
                    v-bind:steps="steps"
                />
                <button-color
                    v-bind:size="'small'"
                    v-bind:style="{'margin-top': '20px'}"
                    v-on:click="onProgressBarSimulationButtonClick">Start progress bar simulation</button-color>
            </div>
        `
    }));
