import { storiesOf } from "@storybook/vue";

storiesOf("Data", module).add("Table", () => ({
    props: {
        columns: {
            type: Array,
            default: () => [
                { id: "id", title: "ID" },
                { id: "user", title: "User" },
                { id: "system", title: "System" }
            ]
        },
        items: {
            type: Array,
            default: () => [
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
        }
    },
    template: `
        <table-platforme
            v-bind:columns="columns"
            v-bind:items="items"
        >
            <template v-slot="{ item }">
                <td class="id">
                    {{ item.id }}
                </td>
                <td class="user">
                    {{ item.user || "-" }}
                </td>
                <td class="device">
                    {{ item.system }}
                </td>
            </template>
        </table-platforme>
    `
}));
