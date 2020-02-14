import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, color } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Icon", () => ({
        props: {
            icon: {
                default: text("Icon", "rocket")
            },
            color: {
                default: color("Color", "#000000")
            },
            fill: {
                default: color("Fill", "#fc0000c4")
            },
            strokeWidth: {
                default: number("Stroke Width", 1)
            },
            width: {
                default: number("Width", 100)
            },
            height: {
                default: number("Height", 100)
            },
            viewBox: {
                default: text("View Box", "0 0 28 28")
            }
        },
        template: `
            <icon
                v-bind:icon="icon"
                v-bind:color="color"
                v-bind:fill="fill"
                v-bind:stroke-width="strokeWidth"
                v-bind:width="width"
                v-bind:height="height"
                v-bind:view-box="viewBox"
            />
        `
    }));
