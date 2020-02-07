import { storiesOf } from "@storybook/vue";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Table", () => ({
        props: {
            mockColumns: {
                type: Array,
                default: () => [
                    { value: "id", label: "ID" },
                    { value: "user", label: "User" },
                    { value: "system", label: "System" }
                ]
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
                        user: "Terry A. Davis",
                        system: "TempleOS 2"
                    },
                    {
                        id: 6,
                        user: "Terry A. Davis",
                        system: "TempleOS 3"
                    },
                    {
                        id: 7,
                        user: "Terry A. Davis",
                        system: "TempleOS 4"
                    },
                    {
                        id: 8,
                        user: "Terry A. Davis",
                        system: "TempleOS 5"
                    }
                ]
            },
            enableCheckboxes: {
                default: () => boolean("Enable checkboxes", true)
            },
            checkedItems: {
                type: Object,
                default: () => {
                    return { 1: true, 2: false, 3: true };
                }
            },
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
            allowSelectedHighlight: {
                default: () => boolean("Allow selection highlight", false)
            }
        },
        data: function() {
            return {
                itemsData: this.mockItems,
                checkedItemsData: this.checkedItems,
                sortData: this.sort,
                reverseData: this.reverse
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
                    v-bind:allow-selected-highlight="allowSelectedHighlight"
                />
                <p>Sort: {{ sortData }}, Reverse: {{ reverseData }}</p><br>
                <p>Items: {{ itemsData }}</p><br>
                <p>Checked Items: {{ checkedItemsData }}</p>
            </div>
        `
    }));
