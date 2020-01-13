import { storiesOf } from "@storybook/vue";
import { withKnobs, select, number, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Content Menu", () => ({
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
                        Fixed: "fixed",
                        Collapse: "collapse",
                        Floating: "floating"
                    },
                    "fixed"
                )
            },
            menuVisible: {
                default: boolean("Visible menu", true)
            },
            menuWidth: {
                default: number("Menu width", 300)
            },
            contentMinWidth: {
                default: number("Content min-width", 500)
            },
            animationTimeout: {
                default: number("Animation timeout", 0.3)
            }
        },
        data: function() {
            return {
                menuVisibleData: this.menuVisible
            };
        },
        watch: {
            menuVisible(value) {
                this.menuVisibleData = value;
            }
        },
        methods: {
            toggleMenu() {
                this.menuVisibleData = !this.menuVisibleData;
            }
        },
        computed: {
            menuText: function() {
                const msg = "This is the menu. It is";
                return this.menuVisibleData ? `${msg} visible` : `${msg} invisible`;
            }
        },
        template: `
            <content-menu
                v-bind:menuOrientation="menuOrientation" 
                v-bind:menuMode="menuMode" 
                v-bind:menuVisible="menuVisibleData" 
                v-bind:menuWidth="menuWidth"
                v-bind:contentMinWidth="contentMinWidth"
                v-bind:animationTimeout="animationTimeout">
                <template v-slot:menu>
                    <p> {{menuText}}</p>
                    <p> Menu mode: {{menuMode}}</p>
                    <button v-if="menuMode!=='fixed'" v-on:click="toggleMenu">Close menu</button>
                    </template>
                <template v-slot:content>
                    <h4>This is the content.</h4>
                    <button v-if="menuMode!=='fixed'" v-on:click="toggleMenu">Toggle menu</button>
                    </template>
            </content-menu>
        `
    }));
