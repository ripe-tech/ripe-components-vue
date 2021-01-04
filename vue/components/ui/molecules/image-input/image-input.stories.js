import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Image Input", () => ({
        props: {
            multiple: {
                default: boolean("Multiple", true)
            }
        },
        data: function() {
            return {
                images: []
            };
        },
        template: `
            <div>
                <image-input 
                    v-bind:images.sync="images"
                    v-bind:multiple="multiple"
                />
                <p v-for="(image, index) in images">
                    {{ index }} - {{ image.name }}
                </p>
            </div>
            `
    }));
