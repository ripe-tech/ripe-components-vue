import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Upload Area", () => ({
        data: function() {
            return {
                filesData: []
            };
        },
        template: `
            <div>
                <upload-area v-bind:files.sync="filesData"/>
                <div>
                    <p>Files:</p>
                    <p v-for="(file, index) in filesData">
                        {{ index }} - {{ file.name }}
                    </p>
                </div>
            </div>
            `
    }));
