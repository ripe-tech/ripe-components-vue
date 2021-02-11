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
                image: "https://sandbox.platforme.com/api/compose?brand=dummy&model=dummy"
            };
        },
        template: `
                <lightbox
                    v-bind:image="image"
                    v-bind:visible="visible"
                    style="max-width: 200px">
                </lightbox>
            `
    }));
