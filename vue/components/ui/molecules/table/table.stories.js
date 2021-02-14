import { storiesOf } from "@storybook/vue";
import { withKnobs, select, boolean, number } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Table", module)
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
            header: {
                default: () => boolean("Header", true)
            },
            alignment: {
                default: select(
                    "Alignment",
                    {
                        Unset: null,
                        Center: "center",
                        Left: "left",
                        Right: "right"
                    },
                    null
                )
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
            rowSelection: {
                default: () => boolean("Row Selection", false)
            },
            selectedRow: {
                default: () => number("Selected Row", null)
            },
            checkboxes: {
                default: () => boolean("Checkboxes", true)
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
            checkedItems: {
                type: Object,
                default: () => {
                    return { 1: true, 2: false, 3: true };
                }
            }
        },
        data: function() {
            return {
                reverseData: this.reverse,
                sortData: this.sort,
                checkedItemsData: this.checkedItems
            };
        },
        watch: {
            sort(value) {
                this.sortData = value;
            },
            reverse(value) {
                this.reverseData = value;
            },
            checkedItems(value) {
                this.checkedItemsData = value;
            }
        },
        template: `
            <div>
                <table-ripe
                    v-bind:columns="mockColumns"
                    v-bind:items="mockItems"
                    v-bind:header="header"
                    v-bind:sort.sync="sortData"
                    v-bind:reverse.sync="reverseData"
                    v-bind:alignment="alignment"
                    v-bind:variant="variant"
                    v-bind:row-selection="rowSelection"
                    v-bind:selected-row="selectedRow"
                    v-bind:checkboxes="checkboxes"
                    v-bind:checked-items.sync="checkedItemsData"
                />
                <p>Sort: {{ sortData }}, Reverse: {{ reverseData }}</p><br>
                <p>Checked Items: {{ checkedItemsData }}</p>
            </div>
        `
    }));
