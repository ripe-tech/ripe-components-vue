import { storiesOf } from "@storybook/vue";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Table", () => ({
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
            }
        },
        data: function() {
            return {
                reverseData: this.reverse,
                sortData: this.sort,
                rowClickedText: ""
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
            onRowClick(item, index) {
                this.rowClickedText = `Row ${index} with item {id: ${item.id}, user:${item.user}, system:${item.system}} clicked !`;
            }
        },
        template: `
            <div>
                <table-ripe
                    class="table"
                    v-bind:columns="mockColumns"
                    v-bind:items="mockItems"
                    v-bind:sort.sync="sortData"
                    v-bind:reverse.sync="reverseData"
                    v-on:click="onRowClick"
                />
                <p>Sort: {{ sortData }}, Reverse: {{ reverseData }}</p>
                <p>Last Row Clicked: {{ rowClickedText }}</p>
            </div>
        `
    }));
