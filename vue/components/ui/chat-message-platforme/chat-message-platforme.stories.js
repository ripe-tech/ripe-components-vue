import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Chat", module)
    .addDecorator(withKnobs)
    .add("Chat Message", () => ({
        props: {
            username: {
                default: text("Username", "Username")
            },
            date: {
                default: text("Date", "Nov 28")
            },
            message: {
                default: text("Message", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et lacus ac arcu ullamcorper condimentum.")
            }
        },
        template: `
            <div>
                <chat-message-platforme
                    v-bind:username="username"
                    v-bind:date="date"
                    v-bind:message="message"
                />
            </div>
            `
    }));
