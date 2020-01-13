import { storiesOf } from "@storybook/vue";

storiesOf("Molecules", module).add("Table Custom", () => ({
    props: {
        mockColumns: {
            type: Array,
            default: () => [
                { value: "id", label: "ID" },
                { value: "user", label: "User" },
                { value: "system", label: "System" }
            ]
        },
        mockItems: {
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
        <table-ripe
            class="table"
            v-bind:columns="mockColumns"
            v-bind:items="mockItems"
        >
            <template v-slot="{ item }">
                <td class="id" style="font-weight: bold; color: #ff0000;">
                    {{ item.id }}
                </td>
                <td class="user" style="text-transform: uppercase;">
                    USER: {{ item.user || "-" }}
                </td>
                <td class="device">
                    OS: {{ item.system }}
                </td>
            </template>
            <template v-slot:extra-row="{ item, index }">
                <tr v-bind:key="index">
                    <td colspan="3">Extra row {{ index }}</td>
                </tr>
            </template>
        </table-ripe>
    `
}));
