import { storiesOf } from "@storybook/vue";
import { withKnobs, color, number } from "@storybook/addon-knobs";

import { LoaderPlatforme } from "./loader-platforme.vue";

storiesOf("Loader", module)
    .addDecorator(withKnobs)
    .add("Ball Pulse", () => ({
        components: { loader: LoaderPlatforme },
        props: {
            count: {
                default: number("Count", 3, { min: 1, max: 3 })
            },
            color: {
                default: color("color", "#5d5d5d")
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
    .add("Line Scale", () => ({
        components: { loader: LoaderPlatforme },
        props: {
            count: {
                default: number("Count", 5, { min: 1, max: 5 })
            },
            color: {
                default: color("color", "#5d5d5d")
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
        components: { loader: LoaderPlatforme },
        props: {
            count: {
                default: number("Count", 3, { min: 1, max: 3 })
            },
            color: {
                default: color("color", "#5d5d5d")
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
