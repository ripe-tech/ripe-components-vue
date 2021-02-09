import { storiesOf } from "@storybook/vue";
import { withKnobs, color, number } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Loader", module)
    .addDecorator(withKnobs)
    .add("Loader Ball Pulse", () => ({
        props: {
            count: {
                default: number("Count", 3, { min: 1, max: 3 })
            },
            color: {
                default: color("Color", "#5d5d5d")
            }
        },
        computed: {
            style: function() {
                return {
                    "background-color": this.color
                };
            }
        },
        template: `
            <div>
                <loader v-bind:count="count" v-bind:loader-style="style"></loader>
            </div>
        `
    }))
    .add("Loader Line Scale", () => ({
        props: {
            count: {
                default: number("Count", 5, { min: 1, max: 5 })
            },
            color: {
                default: color("Color", "#5d5d5d")
            }
        },
        computed: {
            style: function() {
                return {
                    "background-color": this.color
                };
            }
        },
        template: `
            <div>
                <loader loader="line-scale" v-bind:count="count" v-bind:loader-style="style"></loader>
            </div>
        `
    }))
    .add("Ball Scale", () => ({
        props: {
            count: {
                default: number("Count", 3, { min: 1, max: 3 })
            },
            color: {
                default: color("Color", "#5d5d5d")
            }
        },
        computed: {
            style: function() {
                return {
                    "background-color": this.color
                };
            }
        },
        template: `
            <div style="padding: 20px">
                <loader loader="ball-scale-multiple" v-bind:count="count" v-bind:loader-style="style"></loader>
            </div>
        `
    }));
