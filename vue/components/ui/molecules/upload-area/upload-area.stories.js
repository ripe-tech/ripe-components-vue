import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
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
            }
        },
        data: function() {
            return {
                filesData: []
            };
        },
        template: `
            <div>
                <upload-area 
                    v-bind:files.sync="filesData" 
                    v-bind:description="description"
                    v-bind:description-dragging="descriptionDragging"
                    v-bind:dragging-icon="draggingIcon"
                />
                <div>
                    <p>Files:</p>
                    <p v-for="(file, index) in filesData">
                        {{ index }} - {{ file.name }}
                    </p>
                </div>
            </div>
            `
    }));
