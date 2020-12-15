import { storiesOf } from "@storybook/vue";
import { withKnobs, number, boolean, text } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Bezier Curve", () => ({
        props: {
            x1: {
                default: number("x1", 127)
            },
            y1: {
                default: number("y1", 430)
            },
            x2: {
                default: number("x2", 557)
            },
            y2: {
                default: number("y2", 178)
            },
            cx1: {
                default: number("cx1", 186)
            },
            cy1: {
                default: number("cy1", 203)
            },
            cx2: {
                default: number("cx2", 641)
            },
            cy2: {
                default: number("cy2", 431)
            },
            resolution: {
                default: text("Resolution", "1024x1024")
            },
            showPoints: {
                default: boolean("Show Points", true)
            },
            disabled: {
                default: boolean("Disabled", false)
            }
        },
        template: `
            <bezier-curve
                v-bind:x1="x1"
                v-bind:y1="y1"
                v-bind:x2="x2"
                v-bind:y2="y2"
                v-bind:cx1="cx1"
                v-bind:cy1="cy1"
                v-bind:cx2="cx2"
                v-bind:cy2="cy2"
                v-bind:resolution="resolution"
                v-bind:showPoints="showPoints"
                v-bind:disabled="disabled"
            />
        `
    }));
