import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, color } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Icon", () => ({
        props: {
            icon: {
                default: text("Icon", "add")
            },
            width: {
                default: number("Width", 48)
            },
            height: {
                default: number("Height", 48)
            },
            viewBox: {
                default: text("View Box", "0 0 48 48")
            },
            stroke: {
                default: color("Stroke", "#000")
            },
            strokeWidth: {
                default: number("Stroke Width", 1)
            },
            strokeLinecap: {
                default: text("Stroke Linecap", "cube")
            },
            fill: {
                default: color("Fill", "none")
            },
            color: {
                default: color("Color", "green")
            },
            opacity: {
                default: number("Opacity", 1)
            }
        },
        template: `
            <icon
                v-bind:icon="icon"
                v-bind:width="width"
                v-bind:height="height"
                v-bind:view-box="viewBox"
                v-bind:stroke="stroke"
                v-bind:stroke-width="strokeWidth"
                v-bind:stroke-linecap="strokeLinecap"
                v-bind:fill="fill"
                v-bind:color="color"
                v-bind:opacity="opacity"
            />
        `
    }));
