import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Listing", () => ({
        props: {
            context: {
                type: Object,
                default: () => ({ filter: "" })
            },
            columns: {
                type: Array,
                default: () => [
                    { value: "id", label: "ID", width: "100px" },
                    { value: "user", label: "User" },
                    { value: "device", label: "Device" }
                ]
            },
            values: {
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
            }
            // TODO add new props
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
                    v-bind:columns="columns"
                    v-bind:get-items="getItems"
                    v-bind:name="'devices'"
                    v-bind:use-query="false"
                    v-bind:filter-fields="filterFields"
                    v-bind:values="values"
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
