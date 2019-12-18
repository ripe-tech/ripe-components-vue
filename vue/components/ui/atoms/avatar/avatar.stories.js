import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
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
                        Large: "large"
                    },
                    "medium"
                )
            },
            imgUrl: {
                default: text("Image URL", "http://placekitten.com/g/100/100")
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
                v-bind:imgUrl="imgUrl"
                v-bind:size="size"
                v-bind:clickable="clickable"
                v-bind:active="active"
                v-bind:notify="notify"/>
        </div>
        `
    }));
