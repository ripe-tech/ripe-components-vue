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
                default: number("Menu width", null)
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
                const msg = "This is the menu. Curretly it's";
                return this.menuVisibleData ? `${msg} visible` : `${msg} invisible`;
            }
        },
        template: `
            <content-menu
                v-bind:menuOrientation="menuOrientation" 
                v-bind:menuMode="menuMode" 
                v-bind:menuVisible="menuVisibleData" 
                v-bind:menuWidth="menuWidth"
                v-bind:animationTimeout="animationTimeout">
                <template v-slot:content>
                    <div  style='background-color: IndianRed;'>
                        <p>This is the content.</p>
                        <p>It is always visible.</p>
                        <p>Animation timeout unit is seconds.</p>
                        <p>You can set min-width to .content-menu ::v-deep .content if sidebar shrinks first in mobile/tablet</p>
                        <button v-if="menuMode!=='fixed'" v-on:click="toggleMenu">Toggle menu</button>
                    </div>
                </template>
                <template v-slot:menu>
                    <div  style='background-color: LightSalmon;'>
                        <p>{{menuText}}</p>
                        <p>Menu mode: {{menuMode}}</p>
                        <button v-if="menuMode!=='fixed'" v-on:click="toggleMenu">Close menu</button>                
                    </div>
                </template>
            </content-menu>
        `
    }));
