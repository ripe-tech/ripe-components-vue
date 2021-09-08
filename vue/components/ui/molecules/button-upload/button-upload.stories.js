import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Button Upload", module)
    .addDecorator(withKnobs)
    .add("Button Upload", () => ({
        props: {
            disabled: {
                default: boolean("Disabled", false)
            },
            buttonText: {
                default: text("Button Text", "Upload Files")
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
                <button-upload 
                    v-bind:files.sync="filesData" 
                    v-bind:button-text="buttonText"
                    v-bind:disabled="disabled"
                />
                <p>Dragging: {{ draggingData }}</p>
                <p>Files:</p>
                <p v-for="(file, index) in filesData">
                    {{ index }} - {{ file.name }}
                </p>
            </div>
            `
    }));
