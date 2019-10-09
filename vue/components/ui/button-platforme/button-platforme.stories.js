import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Button", module)
    .addDecorator(withKnobs)
    .add("Base", () => ({
        props: {
            normalText: {
                default: text("Text Normal", "Button")
            },
            loadingText: {
                default: text("Text Loading", "Loading...")
            },
            logo: {
                default: boolean("Logo", true)
            }
        },
        template:
            '<button-platforme v-bind:normal-text="normalText" v-bind:loading-text="loadingText" v-bind:logo="logo" ></button-platforme>'
    }));
