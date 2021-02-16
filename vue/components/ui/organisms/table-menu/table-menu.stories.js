import { storiesOf } from "@storybook/vue";
import { withKnobs, select, boolean, number, color, text } from "@storybook/addon-knobs";

storiesOf("Components/Organisms/Table Menu", module)
    .addDecorator(withKnobs)
    .add("Table Menu", () => ({
        props: {
            selectedIndex: {
                type: Number,
                default: number("Selected index", null)
            },
            tableTitle: {
                type: String,
                default: text("Table title", "Awesome programmers")
            },
            menuTitle: {
                type: String,
                default: text("Menu title", "Something wrong?")
            },
            menuMode: {
                default: select(
                    "Menu Mode",
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
                    "Menu Alignment",
                    {
                        Right: "right",
                        Left: "left"
                    },
                    "right"
                )
            },
            menuVisible: {
                default: boolean("Menu Visible", false)
            },
            menuWidth: {
                default: number("Menu Width", 300)
            },
            menuBackgroundColor: {
                default: color("Menu Background Color", "#ffffff")
            },
            animationDuration: {
                default: number("Animation Duration", 0.3)
            },
            items: {
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
            columns: {
                type: Array,
                default: () => [
                    { value: "id", label: "ID" },
                    { value: "user", label: "User", type: "text", edit: true },
                    { value: "os", label: "Operating System", type: "text", edit: true },
                    { value: "alive", label: "Alive", type: "boolean", edit: true },
                    { value: "programmer", label: "Programmer", type: "boolean", edit: true },
                    { value: "net", label: "Net worth", type: "money", edit: true }
                ]
            }
        },
        data: function() {
            return {
                menuVisibleData: this.menuVisible,
                selectedIndexData: this.selectedIndex
            };
        },
        watch: {
            menuVisible(value) {
                this.menuVisibleData = value;
            },
            selectedIndex(value) {
                this.selectedIndexData = value;
            }
        },
        template: `
            <div>
                <table-menu
                    v-bind:items="items"
                    v-bind:columns="columns"
                    v-bind:selected-index.sync="selectedIndexData"
                    v-bind:table-title="tableTitle"
                    v-bind:menu-title="menuTitle" 
                    v-bind:menu-mode="menuMode" 
                    v-bind:menu-visible.sync="menuVisibleData"
                    v-bind:menu-width="menuWidth"
                    v-bind:menu-alignment="menuAlignment" 
                    v-bind:menu-background-color="menuBackgroundColor"
                    v-bind:animation-duration="animationDuration">
                    <template v-slot:item-alive="{ item }">
                        <checkmark v-bind:value="item.alive" />
                    </template>
                    <template v-slot:item-programmer="{ item }">
                        <checkmark v-bind:value="item.programmer" />
                    </template>
                    <template v-slot:arg-alive="{ selectedItem }">
                        <form-input v-bind:header="'Is it alive?'" v-bind:variant="'inline'">
                            <checkbox v-bind:checked="selectedItem.alive" v-on:update:checked="value => $set(selectedItem, 'alive', value)" />
                        </form-input>
                    </template>
                    <template v-slot:arg-programmer="{ selectedItem }">
                        <form-input v-bind:header="'Programmer?'" v-bind:variant="'inline'">
                            <checkbox v-bind:checked="selectedItem.programmer" v-on:update:checked="value => $set(selectedItem, 'programmer', value)" />
                        </form-input>
                    </template>
                </table-menu>
                <p>Menu visible: {{ menuVisibleData }}, selected: {{ selectedIndexData }}</p>
            </div>
        `
    }));
