import { storiesOf } from "@storybook/vue";
import { withKnobs, number, select } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Tabs", () => ({
        props: {
            tab: {
                default: number("Tab", 1)
            },
            headerAlignment: {
                default: select(
                    "Header Alignment",
                    {
                        Default: "",
                        Left: "left",
                        Right: "right",
                        Center: "center"
                    },
                    ""
                )
            },
            tabs: {
                type: Array,
                default: () => [
                    { value: "id", label: "ID", content: "This is the content for ID tab" },
                    { value: "address" },
                    { value: "account", content: "I don't have an account!" },
                    { value: "disabled", disabled: true }
                ]
            }
        },
        data: function() {
            return {
                tabData: this.tab
            };
        },
        watch: {
            tab(value) {
                this.tabData = value;
            }
        },
        template: `
            <div>
                <tabs v-bind:tabs="tabs" v-bind:tab.sync="tabData" v-bind:header-alignment="headerAlignment">
                    <template v-slot:address>
                        <p>My address:</p>
                        <p>New York</p>
                    </template>
                </tabs>
                <label-ripe v-bind:text='"This is a simple label bellow tabs"'></label-ripe>
                <p>Selected tab: {{ tabData }}</p>
            </div>
        `
    }));
