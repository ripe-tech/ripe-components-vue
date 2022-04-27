import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Input File", module)
    .addDecorator(withKnobs)
    .add("Input File", () => ({
        props: {
            text: {
                default: text("Name", "Upload Waybill")
            }
        },
        template: `
        <div style="height: 100px; max-width: 300px" >
            <input-file
                v-bind:text="text"
            />
        </div>
        `
    }));
