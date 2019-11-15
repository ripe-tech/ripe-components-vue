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
        }
    },
    data: function() {
        return {
            filterItems: [
                {
                    id: 1,
                    name: "John",
                    car: "Mercedes-Benz"
                },
                {
                    id: 2,
                    name: "Marie",
                    car: "Volvo"
                },
                {
                    id: 3,
                    name: "Anna",
                    car: "Land-Rover"
                }
            ]
        };
    },
    template: `
    <div class="filter-platforme">
    <search-platforme placeholder="Search Orders"   />
            <table-platforme
                class="table"
                v-bind:columns="filterColumns"
                v-bind:items="filterItems"
            >
                    <template v-slot="{ item }">
                        <td class="id">
                            {{ item.id }}
                        </td>
                        <td class="user">
                            {{ item.name || "-" }}
                        </td>
                        <td class="device">
                            {{ item.car }}
                        </td>
                    </template>
            </table-platforme>
        </div>
    `
}));