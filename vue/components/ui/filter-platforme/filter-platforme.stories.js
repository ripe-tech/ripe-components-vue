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
    <div>
    <container-platforme>
    <div class="container-header">
        <div class="container-header-right">
            <search-platforme placeholder="Search Orders" v-bind:value.sync="filter" />
        </div>
    </div>
      <filter-platforme 
      v-bind:getItems="getItems"
      v-bind:columns="filterColumns"
      v-bind:filter="filter"
      v-bind:options.sync="filterOptions"
      >
      <template v-slot:item="{ item, index, addFilter }">
        <td class="id">
            {{ item.id }}
        </td>
        <td class="user" v-on:click="addFilter('user', item.user)">
            {{ item.name || "-" }}
        </td>
        <td class="device" v-on:click="addFilter('device', item.device)">
            {{ item.car }}
        </td>
        </template>
      </filter-platforme>
    </div>
<container-platforme/>
    `
}));
