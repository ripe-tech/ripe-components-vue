import { storiesOf } from "@storybook/vue";

storiesOf("Molecules", module).add("Filter", () => ({
    props: {
        filterColumns: {
            type: Array,
            default: () => [
                { value: "id", label: "ID" },
                { value: "name", label: "Name" },
                { value: "car", label: "Car" }
            ]
        }
    },
    data: function() {
        return {
            tableRowClickedText: ""
        };
    },
    methods: {
        getItems({ options = {}, params = {} } = {}) {
            return [
                {
                    id: 1,
                    name: "John",
                    car: "Mercedes Benz"
                },
                {
                    id: 2,
                    name: "Anna",
                    car: "Volvo"
                },
                {
                    id: 3,
                    name: "Jorge",
                    car: "Renault"
                }
            ];
        },
        onTableRowClick(item, index) {
            this.tableRowClickedText = `Table Row ${index} with item {id: ${item.id}, name:${item.name}, car:${item.car}} clicked !`;
        }
    },
    template: `
    <div>
        <filter-ripe 
            v-bind:getItems="getItems"
            v-bind:columns="filterColumns" 
            v-bind:values="[]"
            v-on:click:table:row="onTableRowClick"
        >
            <template v-slot:item="{ item, index }">
                <td class="id">
                    {{ item.id }}
                </td>
                <td class="user">
                    {{ item.name }}
                </td>
                <td class="device">
                    {{ item.car }}
                </td>
            </template>
        </filter-ripe>
    </div>
    `
}));
