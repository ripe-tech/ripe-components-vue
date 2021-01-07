import { storiesOf } from "@storybook/vue";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";

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
            width: {
                default: number("Width", 1024)
            },
            height: {
                default: number("Height", 1024)
            },
            showPoints: {
                default: boolean("Show Points", true)
            },
            disabled: {
                default: boolean("Disabled", false)
            }
        },
        data: function() {
            return {
                bezier: {
                    x1: this.x1,
                    y1: this.y1,
                    x2: this.x2,
                    y2: this.y2,
                    cx1: this.cx1,
                    cx2: this.cx2,
                    cy1: this.cy1,
                    cy2: this.cy2
                }
            };
        },
        watch: {
            watch: {
                x1(value) {
                    this.$set(this.bezier, "x1", value);
                },
                y1(value) {
                    this.$set(this.bezier, "y1", value);
                },
                x2(value) {
                    this.$set(this.bezier, "x2", value);
                },
                y2(value) {
                    this.$set(this.bezier, "y2", value);
                },
                cx1(value) {
                    this.$set(this.bezier, "cx1", value);
                },
                cy1(value) {
                    this.$set(this.bezier, "cy1", value);
                },
                cx2(value) {
                    this.$set(this.bezier, "cx2", value);
                },
                cy2(value) {
                    this.$set(this.bezier, "cy2", value);
                }
            }
        },
        template: `
            <div>
                <p>{{ bezier }}</p>
                <bezier-curve
                    v-bind:x1.sync="bezier.x1"
                    v-bind:y1.sync="bezier.y1"
                    v-bind:x2.sync="bezier.x2"
                    v-bind:y2.sync="bezier.y2"
                    v-bind:cx1.sync="bezier.cx1"
                    v-bind:cy1.sync="bezier.cy1"
                    v-bind:cx2.sync="bezier.cx2"
                    v-bind:cy2.sync="bezier.cy2"
                    v-bind:width="width"
                    v-bind:height="height"
                    v-bind:show-points="showPoints"
                    v-bind:disabled="disabled"
                />
            </div>
        `
    }));
