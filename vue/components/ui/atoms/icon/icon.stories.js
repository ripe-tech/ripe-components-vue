import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, color } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Icon", () => ({
        props: {
            icon: {
                default: text("Icon", "rocket")
            },
            width: {
                default: number("Width", 100)
            },
            height: {
                default: number("Height", 100)
            },
            viewBox: {
                default: text("View Box", "0 0 28 28")
            },
            color: {
                default: color("Color", "#000000")
            },
            borderWidth: {
                default: number("Border Width", 1)
            },
            fill: {
                default: color("Fill", "#fc0000c4")
            }
        },
        template: `
            <icon
                v-bind:icon="icon"
                v-bind:color="color"
                v-bind:borderWidth="borderWidth"
                v-bind:width="width"
                v-bind:height="height"
                v-bind:view-box="viewBox"
                v-bind:fill="fill"
            />
        `
    }));
