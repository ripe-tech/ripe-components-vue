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
    <div>
        <h2>Table 1 - Before and after rows override:</h2>
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
            <template v-slot:before-row="{ item, index }">
                <tr v-bind:key="'before-' + index">
                    <td colspan="3">Before row {{ index }}</td>
                </tr>
            </template>
            <template v-slot:after-row="{ item, index }">
                <tr v-bind:key="'after-' + index">
                    <td colspan="3">After row {{ index }}</td>
                </tr>
            </template>
        </table-ripe>
        <h2>Table 2 - Column override:</h2>
        <table-ripe
            class="table"
            v-bind:columns="mockColumns"
            v-bind:items="mockItems"
        >
            <template v-slot:cell-user="{ item, index }">
                <tr v-bind:key="'cell-user-' + index">
                    <td colspan="3">Column {{ index }}</td>
                </tr>
            </template>
        </table-ripe>
        <h2>Table 3 - Row override:</h2>
        <table-ripe
            class="table"
            v-bind:columns="mockColumns"
            v-bind:items="mockItems"
        >
            <template v-slot:row="{ item, index }">
                <tr v-bind:key="'row-' + index">
                    <td colspan="3">Row {{ index }}</td>
                </tr>
            </template>
        </table-ripe>
    </div>
    `
}));
