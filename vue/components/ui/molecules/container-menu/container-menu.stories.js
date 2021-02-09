import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select, number, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Container Menu", module)
    .addDecorator(withKnobs)
    .add("Container Menu", () => ({
        props: {
            alignment: {
                default: select(
                    "Alignment",
                    {
                        Right: "right",
                        Left: "left"
                    },
                    "right"
                )
            },
            mode: {
                default: select(
                    " Mode",
                    {
                        Collapse: "collapse",
                        Fixed: "fixed",
                        Floating: "floating"
                    },
                    "collapse"
                )
            },
            menuVisible: {
                default: boolean("Visible Menu", true)
            },
            menuWidth: {
                default: number("Menu Width", 200)
            },
            animationDuration: {
                default: number("Animation Duration", 0.3)
            },
            animationFunction: {
                default: text("Animation Function", "ease-in-out")
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
        template: `
            <container-menu
                v-bind:alignment="alignment" 
                v-bind:mode="mode" 
                v-bind:menu-visible.sync="menuVisibleData" 
                v-bind:menu-width="menuWidth"
                v-bind:animation-duration="animationDuration"
                v-bind:animation-function="animationFunction"
            >
                <template v-slot:content>
                    <p>This is the actual content</p>
                    <p style="text-align: right;">This is also the actual content</p>
                    <button-color
                        v-bind:size="'small'"
                        v-if="mode !== 'fixed'"
                        v-on:click="toggleMenu"
                    >
                        Toggle menu
                    </button-color>
                </template>
                <template v-slot:menu>
                    <div style='background-color: LightSalmon; height: 100%;'>
                        <p>This is a contextual menu</p>           
                    </div>
                </template>
            </container-menu>
        `
    }));
