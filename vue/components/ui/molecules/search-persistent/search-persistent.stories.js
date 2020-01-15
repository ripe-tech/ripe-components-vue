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
                        name: "Filter 1",
                        value: "brand=dummy",
                        tenancy: "brand",
                        context: "swear",
                        metadata: { lan: "en" }
                    },
                    {
                        name: "Filter 2 with a big ammount of characters in its name",
                        value: "status=pending",
                        tenancy: "factory",
                        context: "barbara_guimaraes",
                        metadata: { lan: "en" }
                    },
                    {
                        name: "Filter 3",
                        value: "status=created",
                        tenancy: "factory",
                        context: "barbara_guimaraes",
                        metadata: { lan: "en" }
                    },
                    {
                        name: "Filter 4",
                        value: "status=sent",
                        tenancy: "factory",
                        context: "coimbroes_33",
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
            dropdownMinWidth: {
                default: number("Dropdown Min Width", 200)
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
            value(value) {
                this.valueData = value;
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
                    v-bind:dropdown-min-width="dropdownMinWidth"
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
