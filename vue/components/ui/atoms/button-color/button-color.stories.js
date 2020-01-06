import { storiesOf } from "@storybook/vue";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Color", () => ({
        props: {
            color: {
                default: select(
                    "Color",
                    {
                        Default: "default",
                        Red: "red",
                        White: "white",
                        Blue: "blue",
                        Green: "green",
                        Yellow: "yellow",
                        Orange: "orange"
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
            disabled: {
                default: boolean("Disabled", false)
            },
            loading: {
                default: boolean("Loading", false)
            }
        },
        template: `
            <div>
                <button-color v-bind:text="'Normal Button'" v-bind:color="color" v-bind:alignment="alignment"
                                        v-bind:disabled="disabled" v-bind:loading="loading"></button-color>
                <button-color v-bind:text="'Small Button'" v-bind:color="color" v-bind:alignment="alignment"
                                        v-bind:disabled="disabled" v-bind:loading="loading" v-bind:small="true" ></button-color>
                <button-color v-bind:text="'Normal Button'" v-bind:color="color" v-bind:alignment="alignment"
                                        v-bind:disabled="disabled" v-bind:loading="loading" v-bind:icon="icon"></button-color>
                <button-color v-bind:text="'Small Button'" v-bind:color="color" v-bind:alignment="alignment"
                                        v-bind:disabled="disabled" v-bind:loading="loading" v-bind:small="true" v-bind:icon="icon"></button-color>
            </div>
        `
    }));
