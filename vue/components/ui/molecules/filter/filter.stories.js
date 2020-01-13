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
        onTableRowClick(value) {
            this.tableRowClickedText = `Table Row ${value.index} with item {id: ${value.item.id}, user:${value.item.user}, system:${value.item.system}} clicked !`;
        }
    },
    template: `
    <div>
        <filter-ripe 
            v-bind:getItems="getItems"
            v-bind:columns="filterColumns" 
            v-bind:values="[]"
            v-on:click:table:row="value => onTableRowClick(value)"
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
