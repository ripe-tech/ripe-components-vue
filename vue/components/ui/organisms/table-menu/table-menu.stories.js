import { storiesOf } from "@storybook/vue";
import { withKnobs, select, boolean, number, color, text } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Table Menu", () => ({
        props: {
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
            },
            selectedIndex: {
                type: Number,
                default: number("Selected index", null)
            },
            tableTitle: {
                type: String,
                default: text("Table header title", "")
            },
            menuTitle: {
                type: String,
                default: text("Menu header title", "Arguments")
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
            menuVisible: {
                default: boolean("Visible menu", true)
            },
            maxHeight: {
                type: Number,
                default: number("Max height", null)
            },
            menuWidth: {
                default: number("Menu width", 300)
            },
            menuBackgroundColor: {
                default: color("Menu background color", "#ffffff")
            },
            animationDuration: {
                default: number("Animation duration", 0.3)
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
            reverse: {
                default: () => boolean("Reverse", null)
            },
            checkboxes: {
                default: () => boolean("Enable checkboxes", true)
            },
            checkedItems: {
                type: Object,
                default: () => {
                    return { 0: true, 1: false, 2: true };
                }
            },
            allowSelectedHighlight: {
                default: () => boolean("Allow selected Highlight", true)
            }
        },
        data: function() {
            return {
                itemsData: this.mockItems,
                checkedItemsData: this.checkedItems,
                selectedIndexData: this.selectedIndex,
                reverseData: this.reverse,
                sortData: this.sort,
                menuVisibleData: this.menuVisible
            };
        },
        watch: {
            selectedIndex(value) {
                this.selectedIndexData = value;
            },
            menuVisible(value) {
                this.menuVisibleData = value;
            },
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
                    v-bind:items.sync="itemsData"
                    v-bind:columns="mockColumns"
                    v-bind:edit-columns="editColumns"
                    v-bind:checkboxes="checkboxes"
                    v-bind:checked-items.sync="checkedItemsData"
                    v-bind:selected-index.sync="selectedIndexData"
                    v-bind:table-title="tableTitle" 
                    v-bind:menu-title="menuTitle" 
                    v-bind:menu-mode="menuMode" 
                    v-bind:menu-visible.sync="menuVisibleData"
                    v-bind:max-height="maxHeight"
                    v-bind:menu-width="menuWidth"
                    v-bind:menu-alignment="menuAlignment" 
                    v-bind:menu-background-color="menuBackgroundColor"
                    v-bind:input-variant="inputVariant"
                    v-bind:sort.sync="sortData"
                    v-bind:reverse.sync="reverseData"
                    v-bind:animation-duration="animationDuration"
                    v-bind:allow-selected-highlight="allowSelectedHighlight"
                />
                    <p>Sort: {{ sortData }}, Reverse: {{ reverseData }}, Menu visible: {{ menuVisibleData }}</p><br>
                    <p>Selected Index: {{selectedIndexData}}</p>
                    <p>Items: {{ itemsData }}</p><br>
                    <p>Checked Items: {{ checkedItemsData }}</p>
            </div>

        `
    }));
