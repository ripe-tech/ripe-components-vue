import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Upload Area", () => ({
        props: {
            customExample: {
                default: boolean("See custom example", false)
            }
        },
        data: function() {
            return {
                filesData: null
            };
        },
        template: `
            <div>
                <upload-area v-if="customExample" v-bind:files.sync="filesData">
                    <template v-slot:drag-area-slot>
                        <div style="height:150px;background-color:aqua;">
                            <p style="font-size:20px;text-align:center">
                                This is a custom drag & drop area
                            </p>
                        </div>
                    </template>
                </upload-area>
                <upload-area v-else v-bind:files.sync="filesData"/>
                <div>
                    <p>Files:</p>
                    <p v-for="(file, index) in filesData">
                        {{ index }} - {{ file.name }}
                    </p>
                </div>
            </div>
            `
    }));
