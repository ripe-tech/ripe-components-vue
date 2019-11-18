import { storiesOf } from "@storybook/vue";

storiesOf("Filter", module).add("Filter", () => ({
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
    <div class="container-header">
    <div class="container-header-right">
        <search-platforme placeholder="Search Orders" v-bind:value.sync="filter" />
    </div>
      <filter-platforme 
      v-bind:getItems="getItems"
      v-bind:columns="filterColumns" 
      >
      <template v-slot:item="{ item, index }">
        <td class="id" style="text-align:center">
            {{ item.id }}
        </td>
        <td class="user" style="text-align:center">
            {{ item.name }}
        </td>
        <td class="device" style="text-align:center">
            {{ item.car }}
        </td>
        </template>
      </filter-platforme>
    </div>
    `
}));
