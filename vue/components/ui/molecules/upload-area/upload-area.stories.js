import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Upload Area", () => ({
        data: function() {
            return {
                filesData: null
            };
        },
        template: `
            <div>
                <upload-area v-bind:files.sync="filesData"/>
                <upload-area v-bind:files.sync="filesData">
                    <div style="height:150px;background-color:aqua;">
                        <p style="font-size:20px;text-align:center">
                            This is a custom drag & drop area
                        </p>
                    </div>
                </upload-area>   
                <div>
                    <p>Files:</p>
                    <p v-for="(file, index) in filesData">
                        {{ index }} - {{ file.name }}
                    </p>
                </div>
            </div>
            `
    }));
