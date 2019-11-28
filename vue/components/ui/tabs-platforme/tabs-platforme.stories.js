import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Components", module)
    .addDecorator(withKnobs)
    .add("Tabs", () => ({
        props: {
            mockTabs: {
                type: Array,
                default: () => [{ id: "id", title: "ID" }]
            },
            mockContent: {
                type: Array,
                default: () => [{ id: "content", title: "Content" }]
            }
        },
        data: function() {
            return {
                mockItems: [
                    {
                        id: "Test1",
                        content: "Bla"
                    },
                    {
                        id: "Test2",
                        content: "Bla2"
                    },
                    {
                        id: "Test",
                        content: "Bla3"
                    }
                ]
            };
        },
        template: `
        <tabs-platforme
        v-bind:tabs="mockTabs"
        v-bind:items="mockItems"
        v-bind:contents="mockContent"
    />
        `
    }));
