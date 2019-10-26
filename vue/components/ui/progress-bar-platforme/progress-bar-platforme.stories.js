import { storiesOf } from "@storybook/vue";
import { withKnobs, color, number } from "@storybook/addon-knobs";

const style = {
    "margin-bottom": "10px",
    "max-width": "200px"
};

storiesOf("Progress", module)
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
            }
        },
        data: function() {
            return { style };
        },
        template: `
            <div>
                <progress-bar-platforme
                    v-bind:steps="steps"
                    v-bind:current-step="currentStep"
                    v-bind:color="color"
                    v-bind:style="style" >
                </progress-bar-platforme>
                <progress-bar-platforme v-bind:current-step="2" color="#000000" v-bind:style="style"></progress-bar-platforme>
                <progress-bar-platforme v-bind:current-step="3" color="#46a546" v-bind:style="style"></progress-bar-platforme>
                <progress-bar-platforme v-bind:current-step="3" color="#c43c35" v-bind:style="style"></progress-bar-platforme>
            </div>
        `
    }));
