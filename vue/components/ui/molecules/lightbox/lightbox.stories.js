import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Lightbox", module)
    .addDecorator(withKnobs)
    .add("Lightbox", () => ({
        props: {
            visible: {
                default: boolean("Visible", false)
            }
        },
        data: function() {
            return {
                image: "https://sandbox.platforme.com/api/brands/swear/logo.png?"
            };
        },
        template: `
                <lightbox
                    v-bind:image="image"
                    v-bind:visible="visible"
                    v-bind:title="'brand'"
                    v-bind:sub-title="'8 items'"
                    style="max-width: 200px">
                </lightbox>
            `
    }));
