import { storiesOf } from "@storybook/vue";
import { withKnobs, color, number, text, select } from "@storybook/addon-knobs";

const style = {
    "margin-bottom": "10px",
    "max-width": "200px"
};

storiesOf("Molecules", module)
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
                        Default: "",
                        Left: "left",
                        Right: "right",
                        Center: "center"
                    },
                    ""
                )
            }
        },
        data: function() {
            return { style };
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
            </div>
        `
    }));
