import { storiesOf } from "@storybook/vue";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Table Menu", () => ({
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
                        system: "Windows",
                        bool: true,
                        alive: true,
                        mars: false,
                        saturn: false,
                        jupiter: false
                    },
                    {
                        id: 2,
                        user: "Steve Jobs",
                        system: "Macintosh",
                        bool: false
                    },
                    {
                        id: 3,
                        user: "Linus Torvalds",
                        system: "Linux",
                        bool: false,
                        alive: true,
                        mars: false,
                        saturn: false,
                        jupiter: false
                    }
                ]
            },
            mockColumns: {
                type: Array,
                default: () => [
                    { value: "id", label: "ID" },
                    { value: "user", label: "User" },
                    { value: "system", label: "System" },
                    { value: "bool", label: "Boolean" },
                    { value: "alive", label: "Alive" },
                    { value: "mars", label: "Went to mars" },
                    { value: "saturn", label: "Went to saturn" },
                    { value: "jupiter", label: "Went to jupiter" },
                    { value: "programmer", label: "Programmer" }
                ]
            },
            editColumns: {
                type: Object,
                default: ["id", "user", "system", "bool", "alive", "mars", "saturn", "jupiter", "programmer"]
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
                <table-menu
                    v-bind:columns="mockColumns"
                    v-bind:items="mockItems"
                    v-bind:sort.sync="sortData"
                    v-bind:reverse.sync="reverseData"
                    v-bind:edit-columns="editColumns"
                />
            </div>
        `
    }));
