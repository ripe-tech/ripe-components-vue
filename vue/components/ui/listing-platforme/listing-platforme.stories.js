import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Data", module)
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
                    { id: "id", title: "ID", width: "100px" },
                    { id: "user", title: "User" },
                    { id: "device", title: "Device" }
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
        },
        methods: {
            getItems({ options = {}, params = {} } = {}) {
                return [
                    {
                        id: 1,
                        user: "Platforme",
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
                <global-platforme />
                    <listing-platforme
                        v-bind:context="context"
                        v-bind:columns="columns"
                        v-bind:get-items="getItems"
                        v-bind:name="'jobs'"
                        v-bind:use-query="false"
                        v-bind:filter-fields="filterFields"
                    >
                        <template v-slot:icons>
                            <img class="logo" v-bind:src="img" v-bind:style="imgStyle" />
                        </template> 
                        <template v-slot:item="{ item, index, addFilter }">
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
                    </listing-platforme>
            </div>
        `
    }));
