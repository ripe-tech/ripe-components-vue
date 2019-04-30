import { storiesOf } from "@storybook/vue";
import { withKnobs, color, number } from "@storybook/addon-knobs";

import { ProgressBarPlatforme } from "./progress-bar-platforme.vue";

const style = {
    "margin-bottom": "10px",
    "max-width": "200px"
};

storiesOf("Progress Bar", module)
    .addDecorator(withKnobs)
    .add("Default", () => ({
        components: { "progress-bar": ProgressBarPlatforme },
        props: {
            steps: {
                default: number("Steps", 3, { min: 0 })
            },
            currentStep: {
                default: number("Current step", 1)
            },
            color: {
                default: color("color", "#4071f2")
            }
        },
        data() {
            return { style };
        },
        template: `
            <div>
                <progress-bar
                    v-bind:steps="steps"
                    v-bind:current-step="currentStep"
                    v-bind:color="color"
                    v-bind:style="style" >
                </progress-bar>
                <progress-bar v-bind:current-step="2" color="#000000" v-bind:style="style"></progress-bar>
                <progress-bar v-bind:current-step="3" color="#46a546" v-bind:style="style"></progress-bar>
                <progress-bar v-bind:current-step="3" color="#c43c35" v-bind:style="style"></progress-bar>
            </div>
        `
    }));
