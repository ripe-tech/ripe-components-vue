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
            }
        },
        template: `
            <div>
                <chat-message-platforme
                    v-bind:username="username"
                    v-bind:date="date"
                />
            </div>
            `
    }));
