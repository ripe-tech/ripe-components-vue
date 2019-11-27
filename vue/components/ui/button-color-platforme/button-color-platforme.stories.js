import { storiesOf } from "@storybook/vue";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";

storiesOf("Button", module)
    .addDecorator(withKnobs)
    .add("Color", () => ({
        props: {
            secondary: {
                default: boolean("Secondary", false)
            },
            color: {
                default: select(
                    "Color",
                    {
                        Default: "default",
                        Red: "red",
                        White: "white"
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
                <button-color-platforme v-bind:text="'Normal Button'" v-bind:secondary="secondary" v-bind:color="color" v-bind:alignment="alignment"
                                        v-bind:disabled="disabled" v-bind:loading="loading"></button-color-platforme>
                <button-color-platforme v-bind:text="'Small Button'" v-bind:secondary="secondary" v-bind:color="color" v-bind:alignment="alignment"
                                        v-bind:disabled="disabled" v-bind:loading="loading" v-bind:small="true" ></button-color-platforme>
                <button-color-platforme v-bind:text="'Normal Button'" v-bind:secondary="secondary" v-bind:color="color" v-bind:alignment="alignment"
                                        v-bind:disabled="disabled" v-bind:loading="loading" v-bind:icon="icon"></button-color-platforme>
                <button-color-platforme v-bind:text="'Small Button'" v-bind:secondary="secondary" v-bind:color="color" v-bind:alignment="alignment"
                                        v-bind:disabled="disabled" v-bind:loading="loading" v-bind:small="true" v-bind:icon="icon"></button-color-platforme>
            </div>
        `
    }));
