import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Form Buttons", () => ({
        props: {
            rejectButtonText: {
                default: text("Reject Button Text", "Reject")
            },
            rejectButtonIcon: {
                default: text("Reject Button Icon", "")
            },
            acceptButtonText: {
                default: text("Accept Button Text", "Accept")
            },
            acceptButtonIcon: {
                default: text("Accept Button Icon", "save")
            }
        },
        methods: {},
        template: `
            <div>
                <form-buttons
                    v-bind:reject-button-props="{
                        text: rejectButtonText,
                        icon: rejectButtonIcon
                    }"
                    v-bind:accept-button-props="{
                        text: acceptButtonText,
                        icon: acceptButtonIcon
                    }"
                />
            </div>
        `
    }));
