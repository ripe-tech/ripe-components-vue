import { storiesOf } from "@storybook/vue";
import { withKnobs, select, text, number, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Table", () => ({
        props: {
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
                    { id: "id", title: "ID" },
                    { id: "user", title: "User" },
                    { id: "system", title: "System" }
                ]
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
                />
                <p>Sort: {{ sortData }}, Reverse: {{ reverseData }}</p>
            </div>
        `
    }));
