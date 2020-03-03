import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

storiesOf("Templates", module)
    .addDecorator(withKnobs)
    .add("Error", () => ({
        props: {
            message: {
                default: text("Message", "There was an unexpected error")
            },
            code: {
                default: number("Code", 403)
            },
            loginMessage: {
                default: text("Login Message", "Try to login again")
            },
            image: {
                default: text("Image", null)
            },
            navigation: {
                default: boolean("Navigation", null)
            }
        },
        template: `
            <error-part
                v-bind:message="message"
                v-bind:code="code"
                v-bind:loginMessage="loginMessage"
                v-bind:image="image"
                v-bind:navigation="navigation"
            />
        `
    }));
