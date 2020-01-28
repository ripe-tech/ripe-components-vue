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
            selectedCheckboxes: {
                type: Array,
                default: () => [true, false, true]
            }
        },
        data: function() {
            return {
                reverseData: this.reverse,
                sortData: this.sort,
                selectedCheckboxesData: this.selectedCheckboxes
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
                    v-bind:enableCheckboxes="enableCheckboxes"
                    v-bind:selectedCheckboxes.sync="selectedCheckboxesData"s
                    v-bind:sort.sync="sortData"
                    v-bind:reverse.sync="reverseData"
                    v-bind:alignment="alignment"
                    v-bind:variant="variant"
                />
                <p>Sort: {{ sortData }}, Reverse: {{ reverseData }}</p>
                <p>Selected checkboxes: {{ selectedCheckboxesData }}</p>
            </div>
        `
    }));
