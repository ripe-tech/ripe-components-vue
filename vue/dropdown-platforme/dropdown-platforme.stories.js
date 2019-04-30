import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import { DropdownPlatforme } from "./dropdown-platforme.vue";

storiesOf("Dropdown", module)
    .addDecorator(withKnobs)
    .add("Visible", () => ({
        components: { dropdown: DropdownPlatforme },
        props: {
            visible: {
                default: boolean("Visible", true)
            }
        },
        data() {
            return {
                items: [
                    {
                        id: "text_1",
                        text: "Text 1"
                    },
                    {
                        id: "text_2",
                        text: "Text 2"
                    },
                    {
                        id: "text_3",
                        text: "Text 3"
                    }
                ]
            };
        },
        template: `
            <div style="max-width: 200px">
                <dropdown v-bind:items="items" v-bind:visible="visible"></dropdown>
            </div>
        `
    }));
