import { storiesOf } from "@storybook/vue";
import { withKnobs, select } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Table Expandable", module)
    .addDecorator(withKnobs)
    .add("Table Expandable", () => ({
        props: {
            columns: {
                type: Array,
                default: () => [
                    { value: "part", label: "Part" },
                    { value: "price", label: "Price" }
                ]
            },
            innerColumns: {
                type: Array,
                default: () => [{ value: "key" }, { value: "value" }]
            },
            variant: {
                default: select(
                    "Variant",
                    {
                        Unset: null,
                        Dense: "dense",
                        Auto: "auto"
                    },
                    null
                )
            },
            items: {
                default: () => [
                    {
                        id: 5,
                        part: "side0_tongue_detail",
                        price: 12.2,
                        parts: [
                            { rule_id: 18680 },
                            { rule_count: 4 },
                            { price_taxes: 4 },
                            { vat: 2.81 },
                            { vat_included: true }
                        ]
                    },
                    {
                        id: 4,
                        part: "hardware",
                        price: 12.2,
                        parts: [
                            { rule_id: 18680 },
                            { rule_count: 4 },
                            { price_taxes: 4 },
                            { vat: 2.81 },
                            { vat_included: true }
                        ]
                    }
                ]
            }
        },
        methods: {
            partsToItems(parts) {
                return parts.map(part => {
                    const base = {};
                    const [key, value] = Object.entries(part)[0];
                    base.id = key;
                    base.key = key;
                    base.value = value;
                    return base;
                });
            }
        },
        template: `
            <table-expandable
                v-bind:variant="variant"
                v-bind:columns="columns"
                v-bind:items="items"
            >
                <template v-slot:expanded-content="{ item }" >
                    <table-ripe
                        v-bind:variant="variant"
                        v-bind:header="false"
                        v-bind:columns="innerColumns"
                        v-bind:items="partsToItems(item.parts)"
                    />
                </template>
            </table-expandable>
        `
    }));
