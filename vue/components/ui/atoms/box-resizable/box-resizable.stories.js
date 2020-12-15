import { storiesOf } from "@storybook/vue";
import { withKnobs, number, color } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Box Resizable", () => ({
        props: {
            x0: {
                default: number("X0", 50)
            },
            y0: {
                default: number("Y0", 50)
            },
            x1: {
                default: number("X1", 250)
            },
            y1: {
                default: number("Y1", 150)
            },
            rotation: {
                default: number("Rotation", 0)
            },
            color: {
                default: color("Color", "#ff0000")
            }
        },
        template: `
            <box-resizable
                v-bind:x0="x0"
                v-bind:y0="y0"
                v-bind:x1="x1"
                v-bind:y1="y1"
                v-bind:rotation="rotation"
                v-bind:color="color"
            >
                <img src="https://placekitten.com/200/100"> 
            </box-resizable>
            
        `
    }));
