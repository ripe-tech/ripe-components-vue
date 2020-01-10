import { storiesOf } from "@storybook/vue";

storiesOf("Molecules", module).add("Table Custom Rows", () => ({
    props: {
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
        <table-ripe class="table">
            <template slot="tr">
                <template v-for="(item, index) in mockItems">
                    <tr v-bind:key="'item-' + item.id + '-' + index">
                        <td class="id" style="font-weight: bold; color: #ff0000;">
                            {{ item.id }}
                        </td>
                        <td class="user" style="text-transform: uppercase;">
                            USER: {{ item.user || "-" }}
                        </td>
                        <td class="device">
                            OS: {{ item.system }}
                        </td>
                    </tr>
                    <tr v-bind:key="'item-' + item.id + '-' + index + '-custom-tr'">
                        <td colspan="3" style="background-color:lightblue">
                            Custom tr after item '{{ item.id }}'
                        </td>
                    </tr>
                </template>
            </template>
        </table-ripe>
    `
}));
