import { storiesOf } from "@storybook/vue";
import { withKnobs, select, boolean, number, color } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Table Menu", () => ({
        props: {
            menuOrientation: {
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
                    "Menu Visibility Mode",
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
            animationTimeout: {
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
            mockItems: {
                default: () => [
                    {
                        id: 1,
                        user: "Bill Gates",
                        os: "Windows",
                        alive: true,
                        mars: false,
                        programmer: true
                    },
                    {
                        id: 2,
                        user: "Steve Jobs",
                        os: "Macintosh",
                        alive: false,
                        mars: false,
                        programmer: false
                    },
                    {
                        id: 3,
                        user: "Linus Torvalds",
                        os: "Linux",
                        alive: true,
                        mars: false,
                        programmer: true
                    }
                ]
            },
            mockColumns: {
                type: Array,
                default: () => [
                    { value: "id", label: "ID" },
                    { value: "user", label: "User" },
                    { value: "os", label: "Operating System" },
                    { value: "alive", label: "Alive" },
                    { value: "programmer", label: "Programmer" },
                    { value: "mars", label: "Shipped car to mars" }
                ]
            },
            editColumns: {
                type: Array,
                default: ["user", "os", "alive", "programmer", "mars"]
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
                    v-bind:columns="mockColumns"
                    v-bind:items="mockItems"
                    v-bind:sort.sync="sortData"
                    v-bind:reverse.sync="reverseData"
                    v-bind:menu-visible="menuVisibleData"
                    v-bind:inputVariant="inputVariant"
                    v-bind:edit-columns="editColumns"
                    v-bind:menuOrientation="menuOrientation" 
                    v-bind:menuMode="menuMode" 
                    v-bind:menuVisible="menuVisibleData" 
                    v-bind:menuWidth="menuWidth"
                    v-bind:menuBackgroundColor="menuBackgroundColor"
                    v-bind:animationTimeout="animationTimeout"/>
            </div>
        `
    }));
