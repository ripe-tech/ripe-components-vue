import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Input Image", module)
    .addDecorator(withKnobs)
    .add("Input Image", () => ({
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
                <input-image 
                    v-bind:images.sync="images"
                    v-bind:multiple="multiple"
                />
                <p v-for="(image, index) in images">
                    {{ index }} - {{ image.name }}
                </p>
            </div>
            `
    }));
