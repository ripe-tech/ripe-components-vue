import { storiesOf } from "@storybook/vue";
import { withKnobs, select, boolean, number, color, text } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Table Menu", () => ({
        props: {
            menuAlignment: {
                default: select(
                    "Menu Orientation",
                    {
                        Right: "right",
                        Left: "left"
                    },
                    "right"
                )
            },
            menuMode: {
                default: select(
                    "Menu Visibility menuMode",
                    {
                        Collapse: "collapse",
                        Fixed: "fixed",
                        Floating: "floating"
                    },
                    "collapse"
                )
            },
            menuVisible: {
                default: boolean("Visible menu", true)
            },
            menuWidth: {
                default: number("Menu width", 300)
            },
            maxHeight: {
                type: Number,
                default: number("Max height", null)
            },
            animationDuration: {
                default: number("Animation timeout", 0.3)
            },
            menuBackgroundColor: {
                default: color("Menu background color", "#ffffff")
            },
            inputVariant: {
                default: select(
                    "Input Variant",
                    {
                        Unset: null,
                        Dark: "dark"
                    },
                    "dark"
                )
            },
            reverse: {
                default: () => boolean("Reverse", null)
            },
            sort: {
                default: select(
                    "Sort Column",
                    {
                        Unset: null,
                        Id: "id",
                        User: "user",
                        "Operating System": "os",
                        Alive: "alive",
                        Mars: "mars",
                        Programmer: "programmer"
                    },
                    null
                )
            },
            selectedIndex: {
                type: Number,
                default: number("Selected index", null)
            },
            menuTitle: {
                type: String,
                default: text("Menu header title", "Arguments")
            },
            mockItems: {
                default: () => [
                    {
                        id: 1,
                        user: "Bill Gates",
                        os: "Windows",
                        alive: true,
                        net: 123.23,
                        programmer: true
                    },
                    {
                        id: 2,
                        user: "Steve Jobs",
                        os: "Macintosh",
                        alive: false,
                        net: 123123,
                        programmer: false
                    },
                    {
                        id: 3,
                        user: "Linus Torvalds",
                        os: "Linux",
                        alive: true,
                        net: 321.123,
                        programmer: true
                    }
                ]
            },
            mockColumns: {
                type: Array,
                default: () => [
                    { value: "id", label: "ID" },
                    { value: "user", label: "User", type: "text" },
                    { value: "os", label: "Operating System", type: "text" },
                    { value: "alive", label: "Alive", type: "boolean" },
                    { value: "programmer", label: "Programmer", type: "boolean" },
                    { value: "net", label: "Net worth", type: "money" }
                ]
            },
            editColumns: {
                type: Array,
                default: ["user", "os", "alive", "programmer", "net"]
            }
        },
        data: function() {
            return {
                reverseData: this.reverse,
                sortData: this.sort,
                menuVisibleData: this.menuVisible
            };
        },
        watch: {
            sort(value) {
                this.sortData = value;
            },
            reverse(value) {
                this.reverseData = value;
            },
            menuVisible(value) {
                this.menuVisibleData = value;
            }
        },
        template: `
            <div>
                <table-menu
                    v-bind:items="mockItems"
                    v-bind:columns="mockColumns"
                    v-bind:edit-columns="editColumns"
                    v-bind:selected-index="selectedIndex"
                    v-bind:menu-title="menuTitle" 
                    v-bind:menu-mode="menuMode" 
                    v-bind:menu-visible.sync="menuVisibleData"
                    v-bind:menu-width="menuWidth"
                    v-bind:max-height="maxHeight"
                    v-bind:menu-alignment="menuAlignment" 
                    v-bind:menu-background-color="menuBackgroundColor"
                    v-bind:input-variant="inputVariant"
                    v-bind:sort.sync="sortData"
                    v-bind:reverse.sync="reverseData"
                    v-bind:animation-duration="animationDuration"/>
                <p>Sort: {{ sortData }}, Reverse: {{ reverseData }}, Menu visible: {{ menuVisibleData }}</p>
            </div>

        `
    }));
