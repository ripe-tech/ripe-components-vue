import { storiesOf } from "@storybook/vue";
import { boolean, number, select, withKnobs } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Avatar List", module)
    .addDecorator(withKnobs)
    .add("Avatar List", () => ({
        props: {
            maxElems: {
                default: number("Max Elems", 3)
            },
            list: {
                default: () => [
                    { src: "http://i.pravatar.cc/300" },
                    { src: "http://i.pravatar.cc/600" },
                    { src: "http://i.pravatar.cc/700" },
                    { src: "http://i.pravatar.cc/100" },
                    { src: "http://i.pravatar.cc/200" },
                    { src: "http://i.pravatar.cc/400" },
                    { src: "http://i.pravatar.cc/500" }
                ]
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
            expandable: {
                default: boolean("Expandable", true)
            }
        },
        template: `
            <avatar-list
                v-bind:avatar-list="list"
                v-bind:max-elems="maxElems"
                v-bind:size="size"
                v-bind:expandable="expandable"
            />
        `
    }));
