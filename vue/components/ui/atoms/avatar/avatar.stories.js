import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Avatar", module)
    .addDecorator(withKnobs)
    .add("Avatar", () => ({
        props: {
            size: {
                default: select(
                    "Size",
                    {
                        Tiny: "tiny",
                        Small: "small",
                        Medium: "medium",
                        Large: "large",
                        "Very Large": "very-large"
                    },
                    "medium"
                )
            },
            src: {
                default: text("Source", "http://placekitten.com/g/100/100")
            },
            notify: {
                default: boolean("Notify", true)
            },
            clickable: {
                default: boolean("Clickable", false)
            },
            active: {
                default: boolean("Active", false)
            }
        },
        template: `
            <div>
                <avatar
                    v-bind:src="src"
                    v-bind:size="size"
                    v-bind:clickable="clickable"
                    v-bind:active="active"
                    v-bind:notify="notify" />
            </div>
        `
    }));
