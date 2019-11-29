import { storiesOf } from "@storybook/vue";

storiesOf("Components", module).add("Tabs", () => ({
    props: {
        mockTabs: {
            type: Array,
            default: () => [
                { id: "id", title: "ID", text: "ID" },
                { id: "address" },
                { id: "account", text: "I don't have an account!" },
                { id: "disabled", disabled: true }
            ]
        }
    },
    template: `
            <tabs-platforme v-bind:tabs="mockTabs">
                <template v-slot:address>
                    <p>My address:</p>
                    <p>New York</p>
                </template>
            </tabs-platforme>
        `
}));
