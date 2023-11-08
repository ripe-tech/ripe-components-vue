import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Section Expandable", module)
    .addDecorator(withKnobs)
    .add("Section Expandable", () => ({
        props: {
            title: {
                default: text("Title", "Section expandable title")
            },
            expanded: {
                default: boolean("Expanded", false)
            },
            animated: {
                default: boolean("Animated", false)
            },
            uppercase: {
                default: boolean("Uppercase", false)
            },
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
            }
        },
        data: function() {
            return {
                expandedData: this.expanded
            };
        },
        watch: {
            expanded(value) {
                this.expandedData = value;
            }
        },
        template: `
            <section-expandable
                v-bind:title="title"
                v-bind:expanded="expandedData"
                v-bind:animated="animated"
                v-bind:uppercase="uppercase"
                v-bind:size="size"
            >
                <h3> This is some text inside the expandable section. </h3>
                <p> And some smaller text. </p>
            </section-expandable>
        `
    }));
