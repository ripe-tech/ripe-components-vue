import { storiesOf } from "@storybook/vue";

storiesOf("Data", module).add("Table", () => ({
    props: {
        mockColumns: {
            type: Array,
            default: () => [
                { id: "id", title: "ID" },
                { id: "user", title: "User" },
                { id: "system", title: "System" }
            ]
        }
    },
    data: function() {
        return {
            mockItems: [
                {
                    id: 1,
                    user: "Bill Gates",
                    system: "Windows"
                },
                {
                    id: 2,
                    user: "Steve Jobs",
                    system: "Macintosh"
                },
                {
                    id: 3,
                    user: "Linus Torvalds",
                    system: "Linux"
                }
            ]
        };
    },
    template: `
    <table-platforme
        class="table"
        v-bind:columns="mockColumns"
        v-bind:items="mockItems"
    />
    `
}));
