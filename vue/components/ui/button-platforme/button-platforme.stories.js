import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

storiesOf("Button", module).add("Base", () => ({
    props: {
        normalText: {
            default: text("Text Normal", "Button")
        },
        loadingText: {
            default: text("Text Loading", "Loading...")
        }
    },
    template:
        '<button-platforme v-bind:normal-text="normalText" v-bind:loading-text="loadingText"></button-platforme>'
}));
