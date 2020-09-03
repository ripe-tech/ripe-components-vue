import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";

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
            filterFields: {
                type: Object,
                default: () => ({
                    user: "likei",
                    device: "likei"
                })
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
            },
            checkboxes: {
                default: () => boolean("Checkboxes", false)
            },
            checkedItems: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            createUrl: {
                type: String,
                default: text("Create Url", "https://www.platforme.com")
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
                        user: "Ripe",
                        device: "Windows"
                    },
                    {
                        id: 2,
                        user: "Tech",
                        device: "Macintosh"
                    },
                    {
                        id: 3,
                        user: "DDigitt",
                        device: "iPad"
                    },
                    {
                        id: 4,
                        user: "Six London",
                        device: "Blackberry"
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
                    v-bind:use-query="false"
                    v-bind:filter-fields="filterFields"
                    v-bind:container-mode="containerMode"
                    v-bind:checkboxes="checkboxes"
                    v-bind:checked-items.sync="checkedItemsData"
                    v-bind:create-url="createUrl"
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
                <p>Checked items: {{ checkedItemsData }}</p>
            </div>
        `
    }));
