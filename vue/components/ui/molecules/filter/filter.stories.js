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
            default: boolean("Enable Checkboxes", true)
        }
    },
    data: function() {
        return {
            selectedCheckboxesData: []
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
        <global></global>
        <filter-ripe 
            v-bind:getItems="getItems"
            v-bind:table-columns="tableColumns" 
            v-bind:lineup-fields="lineupFields"
            v-bind:enable-checkboxes="enableCheckboxes"
            v-bind:selected-checkboxes.sync="selectedCheckboxesData"
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
        <p>Selected Checkboxes: {{ selectedCheckboxesData }}</p>
    </div>
    `
}));
