import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Bubble", module)
    .addDecorator(withKnobs)
    .add("Bubble", () => ({
        props: {
            visible: {
                default: boolean("Visible", true)
            },
            top: {
                default: number("Top", 10)
            },
            right: {
                default: number("Right", 0)
            },
            bottom: {
                default: number("Bottom", 150)
            },
            left: {
                default: number("Left", 10)
            },
            width: {
                default: number("Width", 300)
            }
        },
        data: function() {
            return {
                visibleData: this.visible
            };
        },
        watch: {
            visible(value) {
                this.visibleData = value;
            }
        },
        template: `
            <div>
                <bubble
                    v-bind:visible.sync="visibleData" 
                    v-bind:width="width" 
                    v-bind:top="top"
                    v-bind:right="right"
                    v-bind:bottom="bottom"
                    v-bind:left="left" 
                >
                    <div>
                        <h1>This is a title</h1>
                        <p>This is a paragraph</p>
                    </div>
                </bubble>
                <p style="text-align:center;">Visible: {{ visibleData }}</p>
            </div>
        `
    }));
