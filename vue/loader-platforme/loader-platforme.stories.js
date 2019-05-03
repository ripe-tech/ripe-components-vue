import { storiesOf } from "@storybook/vue";
import { withKnobs, color, number } from "@storybook/addon-knobs";

storiesOf("Loader", module)
    .addDecorator(withKnobs)
    .add("Ball Pulse", () => ({
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
                <loader-platforme v-bind:count="count" v-bind:loader-style="style"></loader-platforme>
            </div>
        `
    }))
    .add("Line Scale", () => ({
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
                <loader-platforme loader="line-scale" v-bind:count="count" v-bind:loader-style="style"></loader-platforme>
            </div>
        `
    }))
    .add("Ball Scale", () => ({
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
                <loader-platforme loader="ball-scale-multiple" v-bind:count="count" v-bind:loader-style="style"></loader-platforme>
            </div>
        `
    }));
