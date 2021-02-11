import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Avatar Name", module)
    .addDecorator(withKnobs)
    .add("Avatar Name", () => ({
        props: {
            avatarSrc: {
                default: text("Avatar Src", "http://i.pravatar.cc")
            },
            name: {
                default: text("Name", "John Doe")
            }
        },
        template: `
            <avatar-name
                v-bind:avatar-props="{ src: avatarSrc }"
                v-bind:name="name"
            />
        `
    }));
