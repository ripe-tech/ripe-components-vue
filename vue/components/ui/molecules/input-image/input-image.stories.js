import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Input Image", module)
    .addDecorator(withKnobs)
    .add("Input Image", () => ({
        props: {
            multiple: {
                default: boolean("Multiple", true)
            },
            variant: {
                default: select(
                    "Variant",
                    {
                        Unset: null,
                        Dark: "dark",
                        White: "white"
                    },
                    null
                )
            }
        },
        data: function() {
            return {
                images: []
            };
        },
        template: `
            <div>
                <input-image 
                    v-bind:images.sync="images"
                    v-bind:multiple="multiple"
                    v-bind:variant="variant"
                />
                <p v-for="(image, index) in images">
                    {{ index }} - {{ image.name }}
                </p>
            </div>
            `
    }));
