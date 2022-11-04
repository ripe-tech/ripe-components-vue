import { storiesOf } from "@storybook/vue";
import { withKnobs, select, boolean, number } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Button Color", module)
    .addDecorator(withKnobs)
    .add("Button Color", () => ({
        props: {
            secondary: {
                default: boolean("Secondary", false)
            },
            size: {
                default: select(
                    "Size",
                    {
                        Default: null,
                        Tiny: "tiny",
                        Small: "small",
                        Medium: "medium"
                    },
                    null
                )
            },
            color: {
                default: select(
                    "Color",
                    {
                        Default: "default",
                        Red: "red",
                        Green: "green",
                        Blue: "blue",
                        Yellow: "yellow",
                        Orange: "orange",
                        White: "white",
                        Transparent: "transparent"
                    },
                    "default"
                )
            },
            alignment: {
                default: select(
                    "Alignment",
                    {
                        Default: "",
                        Left: "left",
                        Right: "right",
                        Center: "center"
                    },
                    ""
                )
            },
            icon: {
                default: select(
                    "Icon",
                    {
                        Add: "add",
                        Car: "car",
                        Window: "window",
                        Wallpaper: "wallpaper",
                        Download: "download",
                        Undo: "undo",
                        Redo: "redo"
                    },
                    "add"
                )
            },
            iconPosition: {
                default: select(
                    "Icon Position",
                    {
                        Left: "left",
                        Right: "right"
                    },
                    "left"
                )
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            loading: {
                default: boolean("Loading", false)
            },
            minWidth: {
                default: number("Minimum Width", null)
            }
        },
        template: `
            <div>
                <button-color v-bind:text="'Normal Button'" v-bind:secondary="secondary" v-bind:size="size" v-bind:color="color" v-bind:alignment="alignment"
                    v-bind:disabled="disabled" v-bind:loading="loading" v-bind:min-width="minWidth" ></button-color>
                <button-color v-bind:text="'Small Button'" v-bind:secondary="secondary" v-bind:size="size" v-bind:color="color" v-bind:alignment="alignment"
                    v-bind:disabled="disabled" v-bind:loading="loading" v-bind:small="true" v-bind:min-width="minWidth" ></button-color>
                <button-color v-bind:text="'Normal Button'" v-bind:secondary="secondary" v-bind:size="size" v-bind:color="color" v-bind:alignment="alignment"
                    v-bind:disabled="disabled" v-bind:loading="loading" v-bind:icon="icon" v-bind:icon-position="iconPosition" v-bind:min-width="minWidth"></button-color>
                <button-color v-bind:text="'Small Button'" v-bind:secondary="secondary" v-bind:size="size" v-bind:color="color" v-bind:alignment="alignment"
                    v-bind:disabled="disabled" v-bind:loading="loading" v-bind:small="true" v-bind:icon="icon" v-bind:icon-position="iconPosition"
                    v-bind:min-width="minWidth"></button-color>
            </div>
        `
    }));
