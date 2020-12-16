import { storiesOf } from "@storybook/vue";
import { withKnobs, number, color } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Box Resizable", () => ({
        props: {
            x: {
                default: number("X", 50)
            },
            y: {
                default: number("Y", 50)
            },
            width: {
                default: number("Width", 200)
            },
            height: {
                default: number("Height", 100)
            }
            // rotation: {
            //     default: number("Rotation", 0)
            // },
            // color: {
            //     default: color("Color", "#ff0000")
            // }
        },
        template: `
            <box-resizable
                v-bind:x="x"
                v-bind:y="y"
                v-bind:width="width"
                v-bind:height="height"
                v-bind:rotation="rotation"
                v-bind:color="color"
            >
                <div>Content example</div>
            </box-resizable>
            
        `
    }));
