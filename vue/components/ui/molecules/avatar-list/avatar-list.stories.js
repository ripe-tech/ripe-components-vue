import { storiesOf } from "@storybook/vue";
import { boolean, number, select, withKnobs } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Avatar List", module)
    .addDecorator(withKnobs)
    .add("Avatar List", () => ({
        props: {
            expandable: {
                default: boolean("Expandable", true)
            },
            maxElements: {
                default: number("Maximum Elements", 3)
            },
            size: {
                default: select(
                    "Size",
                    {
                        "Very Tiny": "very-tiny",
                        Tiny: "tiny",
                        Small: "small",
                        Medium: "medium",
                        Large: "large",
                        "Very Large": "very-large"
                    },
                    "medium"
                )
            },
            avatars: {
                default: () => [
                    { src: "http://i.pravatar.cc/300" },
                    { src: "http://i.pravatar.cc/600" },
                    { src: "http://i.pravatar.cc/700" },
                    { src: "http://i.pravatar.cc/100" },
                    { src: "http://i.pravatar.cc/200" },
                    { src: "http://i.pravatar.cc/400" },
                    { src: "http://i.pravatar.cc/500" }
                ]
            }
        },
        template: `
            <avatar-list
                v-bind:avatars="avatars"
                v-bind:expandable="expandable"
                v-bind:max-elements="maxElements"
                v-bind:size="size"
            />
        `
    }));
