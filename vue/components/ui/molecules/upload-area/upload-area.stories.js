import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Upload Area", module)
    .addDecorator(withKnobs)
    .add("Upload Area", () => ({
        props: {
            description: {
                default: text("Description", "Drag and drop your files")
            },
            descriptionDragging: {
                default: text("Description Dragging", "Drop your files to upload")
            },
            draggingIcon: {
                default: select(
                    "Icon",
                    {
                        Add: "add",
                        Car: "car",
                        Cloud: "cloud-upload",
                        Window: "window",
                        Rocket: "rocket",
                        Download: "download",
                        Undo: "undo",
                        Redo: "redo"
                    },
                    "cloud-upload"
                )
            },
            uploadButton: {
                default: boolean("Upload Button", true)
            }
        },
        data: function() {
            return {
                filesData: [],
                draggingData: false
            };
        },
        template: `
            <div>
                <upload-area 
                    v-bind:files.sync="filesData" 
                    v-bind:description="description"
                    v-bind:description-dragging="descriptionDragging"
                    v-bind:dragging-icon="draggingIcon"
                    v-bind:upload-button="uploadButton"
                    v-bind:dragging.sync="draggingData"
                />
                <p>Dragging: {{ draggingData }}</p>
                <p>Files:</p>
                <p v-for="(file, index) in filesData">
                    {{ index }} - {{ file.name }}
                </p>
            </div>
            `
    }));
