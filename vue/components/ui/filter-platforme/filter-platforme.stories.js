import { storiesOf } from "@storybook/vue";

storiesOf("Input", module).add("Filter", () => ({
    props: {
        filterColumns: {
            type: Array,
            default: () => [
                { id: "id", title: "ID" },
                { id: "name", title: "Name" },
                { id: "car", title: "Car" }
            ]
        },
        getItems: {
            type: Array,
            default: () => [
                {
                    id: 1,
                    name: "John",
                    car: "Mercedes Benz"
                },
                {
                    id: 2,
                    name: "Marie",
                    car: "Volvo"
                },
                {
                    id: 3,
                    name: "Anna",
                    car: "Land Rover"
                }
            ]

        }
    },
    computed: {
        matches() {
          return this.search
            ? this.editions.filter(edition => {
              let match = false
              for (let key in edition) {
                if (edition[key].toLowerCase().includes(this.search.toLowerCase())) {
                  return true
                }
              }
            })
            : this.editions
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
      <filter-platforme 
      v-bind:getItems="getItems"
      v-bind:columns="filterColumns"
      v-bind:filter="filter"
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

    `
}));