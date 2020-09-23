import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Avatar Name Email", () => ({
        props: {
            avatarSrc: {
                default: text("Avatar Src", "http://i.pravatar.cc")
            },
            name: {
                default: text("Name", "John Doe")
            },
            email: {
                default: text("Email", "john.example@email.com")
            }
        },
        template: `
            <avatar-name-email
                v-bind:avatar-props="{ src: avatarSrc }"
                v-bind:name="name"
                v-bind:email="email"
            />
        `
    }));
