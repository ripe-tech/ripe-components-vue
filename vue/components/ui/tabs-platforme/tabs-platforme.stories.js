import { storiesOf } from "@storybook/vue";

storiesOf("Components", module).add("Tabs", () => ({
    props: {
        mockTabs: {
            type: Array,
            default: () => [{ id: "id", title: "ID" }, { id: "address" }, { id: "account" }]
        }
    },
    template: `
            <tabs-platforme v-bind:tabs="mockTabs">
                <template v-slot:id>
                    <p>ID</p>
                </template>
                <template v-slot:address>
                    <p>My address:</p>
                    <p>New York</p>
                </template>
                <template v-slot:account>
                    <p>I don't have an account!</p>
                </template>
            </tabs-platforme>
        `
}));
