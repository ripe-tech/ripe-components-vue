import { storiesOf } from "@storybook/vue";

import "./filter-platforme.stories.css";

storiesOf("Data", module).add("Filter", () => ({
    props: {
        filterColumns: {
            type: Array,
            default: () => [
                { id: "id", title: "ID" },
                { id: "name", title: "Name" },
                { id: "car", title: "Car" }
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
        <global-platforme />
        <filter-platforme 
            v-bind:getItems="getItems"
            v-bind:columns="filterColumns" 
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
            <template v-slot:item-list="{ item, index }">
                <div class="row"><p>{{ item.id }}</p></div>
                <div class="row">
                    <div class="half"><p>{{ item.name }}</p></div>
                    <div class="half"><p>{{ item.car }}</p></div>
                </div>
            </template>
        </filter-platforme>
    </div>
    `
}));
