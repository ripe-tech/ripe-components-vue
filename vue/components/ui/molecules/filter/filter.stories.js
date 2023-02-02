import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Filter", module)
    .addDecorator(withKnobs)
    .add("Filter", () => ({
        props: {
            checkboxes: {
                default: () => boolean("Checkboxes", false)
            },
            tableColumns: {
                type: Array,
                default: () => [
                    { value: "id", label: "ID" },
                    { value: "name", label: "Name" },
                    { value: "car", label: "Car" }
                ]
            },
            lineupFields: {
                type: Array,
                default: () => [
                    { value: "id", label: "ID" },
                    { value: "name", label: "Name" },
                    { value: "car", label: "Car" }
                ]
            },
            rowSelection: {
                default: () => boolean("Row Selection", false)
            },
            checkedItems: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        data: function() {
            return {
                checkedItemsData: this.checkedItems
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
            }
        },
        template: `
            <div>
                <global />
                <filter-ripe
                    v-bind:getItems="getItems"
                    v-bind:table-columns="tableColumns"
                    v-bind:lineup-fields="lineupFields"
                    v-bind:row-selection="rowSelection"
                    v-bind:checkboxes="checkboxes"
                    v-bind:checked-items.sync="checkedItemsData"
                >
                    <template v-slot:table-item="{ item, index }">
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
                <p>Checked Items: {{ checkedItemsData }}</p>
            </div>
        `
    }));
