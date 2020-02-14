import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Filter", () => ({
        props: {
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
            enableCheckboxes: {
                default: () => boolean("Enable checkboxes", false)
            },
            allowSelectedHighlight: {
                default: () => boolean("Allow selection highlight", false)
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
            },
            getCheckedItems() {
                return {};
            }
        },
        template: `
    <div>
        <global></global>
        <filter-ripe 
            v-bind:getItems="getItems"
            v-bind:enable-checkboxes="enableCheckboxes"
            v-bind:getCheckedItems="getCheckedItems"
            v-bind:table-columns="tableColumns" 
            v-bind:lineup-fields="lineupFields"
            v-bind:allow-selected-highlight="allowSelectedHighlight"
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
    </div>
    `
    }));
