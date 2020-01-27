import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number, select } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Listing", () => ({
        props: {
            context: {
                type: Object,
                default: () => ({ filter: "" })
            },
            tableColumns: {
                type: Array,
                default: () => [
                    { value: "id", label: "ID", width: "100px" },
                    { value: "user", label: "User" },
                    { value: "device", label: "Device" }
                ]
            },
            lineupFields: {
                type: Array,
                default: () => [
                    { value: "id", label: "ID", width: "100px" },
                    { value: "user", label: "User" },
                    { value: "device", label: "Device" }
                ]
            },
            name: {
                default: text("Name", "Devices")
            },
            notFoundText: {
                default: text("Not Found text", "Custom Not Found text")
            },
            titleText: {
                default: text("Title", "Custom Title")
            },
            filterPlaceholder: {
                default: text("Filter", "Custom Filter placeholder text")
            },
            searchIconVisible: {
                default: boolean("Search Icon visible", true)
            },
            searchWidth: {
                default: number("Search width", 450)
            },
            hasPersistentFilters: {
                default: boolean("Has Persistent Filters", true)
            },
            persistentFilters: {
                type: Array,
                default: () => [
                    {
                        name: "Filter 1",
                        value: "user=Ripe",
                        tenancy: "brand",
                        context: "swear",
                        metadata: { lan: "en" }
                    },
                    {
                        name: "Filter 2 with a big ammount of characters in its name",
                        value: "device=Macintosh",
                        tenancy: "factory",
                        context: "barbara_guimaraes",
                        metadata: { lan: "en" }
                    }
                ]
            },
            searchEnableDelete: {
                default: boolean("Search Delete Button enabled", true)
            },
            filterButtonMaxWidth: {
                default: number("Filter Button max width", 250)
            },
            img: {
                type: String,
                default: text("Image", "https://cdn.platforme.com/images/platforme.square.png")
            },
            imgStyle: {
                type: Object,
                default: () => ({
                    float: "left",
                    height: "34px"
                })
            },
            containerMode: {
                default: select(
                    "Mode",
                    {
                        Default: "default",
                        Expanded: "expanded"
                    },
                    "default"
                )
            }
        },
        methods: {
            getItems({ options = {}, params = {} } = {}) {
                return [
                    {
                        id: 1,
                        user: "Ripe",
                        device: "Windows"
                    },
                    {
                        id: 2,
                        user: "Tech",
                        device: "Macintosh"
                    }
                ];
            }
        },
        template: `
            <div>
                <global></global>
                <listing
                    v-bind:context="context"
                    v-bind:table-columns="tableColumns"
                    v-bind:lineup-fields="lineupFields"
                    v-bind:get-items="getItems"
                    v-bind:name="'devices'"
                    v-bind:not-found-text="notFoundText"
                    v-bind:title-text="titleText"
                    v-bind:filter-placeholder="filterPlaceholder"
                    v-bind:use-query="false"
                    v-bind:search-icon-visible="searchIconVisible"
                    v-bind:search-width="searchWidth"
                    v-bind:has-persistent-filters="hasPersistentFilters"
                    v-bind:persistent-filters="persistentFilters"
                    v-bind:search-enable-delete="searchEnableDelete"
                    v-bind:filter-button-max-width="filterButtonMaxWidth"
                    v-bind:container-mode="containerMode"
                >
                    <template v-slot:icons>
                        <img v-bind:src="img" v-bind:style="imgStyle" />
                    </template>
                    <template v-slot:table-item="{ item, index, addFilter }">
                        <td class="id">
                            {{ item.id }}
                        </td>
                        <td class="user" v-on:click="addFilter('user', item.user)">
                            {{ item.user || "-" }}
                        </td>
                        <td class="device" v-on:click="addFilter('device', item.device)">
                            {{ item.device }}
                        </td>
                    </template>
                </listing>
            </div>
        `
    }));
