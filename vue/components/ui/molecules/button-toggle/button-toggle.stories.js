import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, select, text } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Button Toggle", module)
    .addDecorator(withKnobs)
    .add("Button Toggle", () => ({
        props: {
            text: {
                type: String,
                default: text("Text", "")
            },
            icon: {
                default: select(
                    "Icon",
                    {
                        Ok: "ok",
                        Car: "car",
                        Window: "window",
                        Wallpaper: "wallpaper",
                        Download: "download",
                        Undo: "undo",
                        Redo: "redo",
                        None: null
                    },
                    "ok"
                )
            },
            iconSecondary: {
                default: select(
                    "Inactive Icon",
                    {
                        Close: "close",
                        Car: "car",
                        Window: "window",
                        Wallpaper: "wallpaper",
                        Download: "download",
                        Undo: "undo",
                        Redo: "redo",
                        None: null
                    },
                    "close"
                )
            },
            color: {
                type: String,
                default: text("Color", "white")
            },
            colorSecondary: {
                type: String,
                default: text("Active Color", "black")
            },
            orientation: {
                default: select(
                    "Orientation",
                    {
                        Unset: undefined,
                        Left: "left",
                        Middle: "middle",
                        Right: "right"
                    },
                    null
                )
            },
            value: {
                type: Boolean,
                default: boolean("Value", false)
            }
        },
        data: function() {
            return {
                valueData: this.value
            };
        },
        watch: {
            value(value) {
                this.valueData = value;
            }
        },
        methods: {
            onClick(event) {
                this.valueData = !this.valueData;
            }
        },
        template: `
            <div>
                <button-toggle
                    v-bind:text="text"
                    v-bind:icon="icon"
                    v-bind:icon-secondary="iconSecondary"
                    v-bind:color="color"
                    v-bind:color-secondary="colorSecondary"
                    v-bind:orientation="orientation"
                    v-bind:value.sync="valueData"
                    v-on:click="onClick"
                />
            </div>
            `
    }));
