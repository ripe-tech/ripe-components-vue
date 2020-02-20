import { storiesOf } from "@storybook/vue";
import { withKnobs, select, boolean, number } from "@storybook/addon-knobs";

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
            rowSelection: {
                default: () => boolean("Row Selection", false)
            },
            selectedId: {
                default: () => number("Selected Id", null)
            }
        },
        data: function() {
            return {
                reverseData: this.reverse,
                sortData: this.sort
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
                    v-bind:items="mockItems"
                    v-bind:sort.sync="sortData"
                    v-bind:reverse.sync="reverseData"
                    v-bind:alignment="alignment"
                    v-bind:variant="variant"
                    v-bind:row-selection="rowSelection"
                    v-bind:selected-id="selectedId"
                />
                <p>Sort: {{ sortData }}, Reverse: {{ reverseData }}</p>
            </div>
        `
    }));
