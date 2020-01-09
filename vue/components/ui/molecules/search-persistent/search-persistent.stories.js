import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, text, number } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Search Persistence", () => ({
        props: {
            filter: {
                default: text("Filter", "")
            },
            placeholder: {
                default: text("Placeholder", "This is a search input")
            },
            loading: {
                default: boolean("Loading", false)
            },
            width: {
                default: number("Width", 300)
            },
            persistentFilters: {
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
                    },
                    {
                        separator: "separator"
                    },
                    {
                        label: "Save Filter",
                        value: "save_filter_option"
                    }
                ]
            }
        },
        data: function() {
            return {
                filterData: this.filter
            };
        },
        template: `
            <div>
                <search-persistent
                    v-bind:filter.sync="filterData"
                    v-bind:placeholder="placeholder"
                    v-bind:loading="loading"
                    v-bind:persistent-filters="persistentFilters"
                    v-bind:width="width"
                />
                <p>Filter: {{ filterData }}</p>
            </div>
        `
    }));
