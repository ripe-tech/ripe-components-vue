import { storiesOf } from "@storybook/vue";

storiesOf("Molecules", module).add("Filter", () => ({
    props: {
        columns: {
            type: Array,
            default: () => [
                { value: "id", label: "ID" },
                { value: "name", label: "Name" },
                { value: "car", label: "Car" }
            ]
        },
        values: {
            type: Array,
            default: () => [
                { value: "id", label: "ID" },
                { value: "name", label: "Name" },
                { value: "car", label: "Car" }
            ]
        }
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
        }
    },
    template: `
    <div>
        <global></global>
        <filter-ripe 
            v-bind:getItems="getItems"
            v-bind:columns="columns" 
            v-bind:values="values"
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
