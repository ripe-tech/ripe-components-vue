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
            },
            rotation: {
                default: number("Rotation", 0)
            },
            color: {
                default: color("Color", "#ff0000")
            }
        },
        data: function() {
            return {
                xData: this.x,
                yData: this.y,
                widthData: this.width,
                heightData: this.height,
                rotationData: this.rotation
            };
        },
        template: `
            <div>
                <div>x: {{ xData }}, y: {{ yData }}, width: {{ widthData }}, height: {{ heightData }}, rotation: {{ rotationData }}</div>
                <box-resizable
                    v-bind:x.sync="xData"
                    v-bind:y.sync="yData"
                    v-bind:width.sync="widthData"
                    v-bind:height.sync="heightData"
                    v-bind:rotation.sync="rotationData"
                    v-bind:color="color"
                >
                    <div>Content example</div>
                </box-resizable>
            </div>
        `
    }));
