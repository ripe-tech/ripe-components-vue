import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Bar Chart", module)
    .addDecorator(withKnobs)
    .add("Bar Chart", () => ({
        props: {
            text: {
                default: text("Name", "Upload Waybill")
            }
        },
        template: `
        <div style="height: 100px; max-width: 300px" >
            <upload-input
                v-bind:text="text"
            />
        </div>
        `
    }));
