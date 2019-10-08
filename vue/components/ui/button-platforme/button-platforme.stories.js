import { storiesOf, text } from "@storybook/vue";

storiesOf("Button", module).add("Base", () => ({
    props: {
        text: {
            default: text("Text", "Button")
        },
        textLoading: {
            default: text("Text Loading", "Loading...")
        }
    },
    template:
        '<button-platforme v-bind:text="text" v-bind:text-loading="textLoading"></button-platforme>'
}));
