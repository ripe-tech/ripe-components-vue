import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, text, number, select } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Search Persistence", () => ({
        props: {
            value: {
                default: text("Value", "")
            },
            filters: {
                type: Array,
                default: () => [
                    {
                        label: "Filter 1",
                        value: "filter_1",
                        filter: "brand=dummy",
                        tenancy: "brand",
                        context: "List products of brand dummy",
                        metadata: { lan: "en" }
                    },
                    {
                        label: "Filter 2 with a big ammount of characters in its name",
                        value: "filter_2",
                        filter: "status=pending",
                        tenancy: "factory",
                        context: "Status Pending",
                        metadata: { lan: "en" }
                    },
                    {
                        label: "Filter 3",
                        value: "filter_3",
                        filter: "status=created",
                        tenancy: "factory",
                        context: "Status Created",
                        metadata: { lan: "en" }
                    },
                    {
                        label: "Filter 4",
                        value: "filter_4",
                        filter: "status=sent",
                        tenancy: "factory",
                        context: "Status Sent",
                        metadata: { lan: "en" }
                    }
                ]
            },
            placeholder: {
                default: text("Placeholder", "This is a search input")
            },
            iconVisible: {
                default: boolean("Icon Visible", true)
            },
            clearVisible: {
                default: boolean("Clear Visible", true)
            },
            variant: {
                default: select(
                    "Variant",
                    {
                        Unset: null,
                        Dark: "dark"
                    },
                    null
                )
            },
            width: {
                default: number("Width", null)
            },
            loading: {
                default: boolean("Loading", false)
            }
        },
        data: function() {
            return {
                valueData: this.value,
                filtersData: this.filters
            };
        },
        watch: {
            filter(value) {
                this.filterData = value;
            }
        },
        template: `
            <div>
                <global />
                <search-persistent
                    v-bind:value.sync="valueData"
                    v-bind:filters.sync="filtersData"
                    v-bind:placeholder="placeholder"
                    v-bind:icon-visible="iconVisible"
                    v-bind:clear-visible="clearVisible"
                    v-bind:variant="variant"
                    v-bind:width="width"
                    v-bind:loading="loading"    
                />
                <p>Value: {{ valueData }}</p>
                <p>Filters:</p>
                <ul>
                    <li v-for="filter in filtersData">{{ filter }}</li>
                </ul>
            </div>
        `
    }));
