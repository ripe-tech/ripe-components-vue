import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/SVG Viewer", module)
    .addDecorator(withKnobs)
    .add("SVG Viewer", () => ({
        props: {
            src: {
                default: text(
                    "Source",
                    "https://cdn.platforme.com/ripe/ripe_pulse/prod/illustration.svg"
                )
            }
        },
        template: `
            <svg-viewer
                v-bind:src="src"
            />
        `
    }));
