import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select, boolean, color } from "@storybook/addon-knobs";

storiesOf("Avatar", module)
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
            title: {
                default: text("Title", "Cute")
            },
            subtitle: {
                default: text("Subtext", "Kitten")
            },
            content: {
                default: text("Content", "Miau miau")
            },
            notify: {
                default: boolean("Notify", true)
            },
            notifyColor: {
                default: color("Notify color", "green")
            },
            notifyBorderColor: {
                default: color("Notify border color", "white")
            }
        },
        template: `
        <div>
            <avatar
                v-bind:content="content"
                v-bind:subtitle="subtitle"
                v-bind:title="title"
                v-bind:notify-color="notifyColor"
                v-bind:notify-border-color="notifyBorderColor"
                v-bind:notify="notify"
                v-bind:size="size"
                v-bind:imgUrl="imgUrl" />
        </div>
        `
    }));
