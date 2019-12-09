import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Chat", module)
    .addDecorator(withKnobs)
    .add("Chat", () => ({
        props: {
            helloText: {
                default: text("Hello Text", "Hello")
            }
        },
        template:
            '<chat-platforme v-bind:hello-text="helloText" />'
    }));
