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
                        dense: "dense"
                    },
                    null
                )
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
                    },
                    {
                        id: 4,
                        user: "Terry A. Davis",
                        system: "TempleOS"
                    },
                    {
                        id: 5,
                        user: "Terry A. Davis Clone",
                        system: "TempleOS 2"
                    },
                    {
                        id: 6,
                        user: "Terry A. Davis Clone 1",
                        system: "TempleOS 3"
                    },
                    {
                        id: 7,
                        user: "Terry A. Davis Clone 2",
                        system: "TempleOS 4"
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
            enableCheckboxes: {
                default: () => boolean("Enable checkboxes", true)
            },
            checkedItems: {
                type: Object,
                default: () => {
                    return { 0: true, 1: false, 2: true };
                }
            }
        },
        data: function() {
            return {
                reverseData: this.reverse,
                sortData: this.sort,
                itemsData: this.mockItems,
                checkedItemsData: this.checkedItems
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
        template: `
            <div>
                <table-ripe
                    class="table"
                    v-bind:columns="mockColumns"
                    v-bind:items.sync="itemsData"
                    v-bind:enable-checkboxes="enableCheckboxes"
                    v-bind:checked-items.sync="checkedItemsData"
                    v-bind:sort.sync="sortData"
                    v-bind:reverse.sync="reverseData"
                    v-bind:alignment="alignment"
                    v-bind:variant="variant"
                />
                <p>Sort: {{ sortData }}, Reverse: {{ reverseData }}</p>
                <p>Checked Items: {{ checkedItemsData }}</p>
            </div>
        `
    }));
