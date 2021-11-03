import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/SVG Viewer", module)
    .addDecorator(withKnobs)
    .add("SVG Viewer", () => ({
        props: {
            url: {
                default: text("Url", "")
            }
        },
        template: `
            <svg-viewer
                v-bind:url="url"
            />
        `
    }));
