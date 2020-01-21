import { storiesOf } from "@storybook/vue";
import { withKnobs, select, boolean, number } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("DynamicTable", () => ({
        props: {
            sort: {
                default: select(
                    "Sort Column",
                    {
                        Unset: null,
                        Id: "id",
                        User: "user",
                        System: "system"
                    },
                    null
                )
            },
            reverse: {
                default: () => boolean("Reverse", null)
            },
            mockItems: {
                default: () => [
                    {
                        id: 1,
                        user: "Bill Gates",
                        system: "Windows"
                    },
                    {
                        id: 2,
                        user: "Steve Jobs",
                        system: "Macintosh"
                    },
                    {
                        id: 3,
                        user: "Linus Torvalds",
                        system: "Linux"
                    }
                ]
            },
            mockColumns: {
                type: Array,
                default: () => [
                    { value: "id", label: "ID" },
                    { value: "user", label: "User" },
                    { value: "system", label: "System" }
                ]
            },
            buttonOffset: {
                type: Number,
                default: () => number("Button Offset", 200)
            }
        },
        data: function() {
            return {
                reverseData: this.reverse,
                sortData: this.sort,
                editItemClicked: null,
                optionsItemClicked: null
            };
        },
        watch: {
            sort(value) {
                this.sortData = value;
            },
            reverse(value) {
                this.reverseData = value;
            }
        },
        methods: {
            editPressed(item) {
                this.editItemClicked = item;
            },
            optionsPressed(item) {
                this.optionsItemClicked = item;
            }
        },
        template: `
            <div>
                <dynamic-table
                    class="dynamic-table"
                    v-bind:columns="mockColumns"
                    v-bind:items="mockItems"
                    v-bind:button-offset="buttonOffset"
                    v-on:click:edit="editPressed"
                    v-on:click:item-options="optionsPressed"
                    v-bind:sort.sync="sortData"
                    v-bind:reverse.sync="reverseData"
                />
                <p>Edit clicked: {{ this.editItemClicked }},<br>  Item Options clicked: {{ this.optionsItemClicked }}</p>
            </div>
        `
    }));
