import { storiesOf } from "@storybook/vue";
import { withKnobs, select, number, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Content Menu", () => ({
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
                default: boolean("Visible menu", true)
            },
            menuWidth: {
                default: number("Menu width", 200)
            },
            animationDuration: {
                default: number("Animation duration", 0.3)
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
            <content-menu
                v-bind:alignment="alignment" 
                v-bind:mode="mode" 
                v-bind:menuVisible.sync="menuVisibleData" 
                v-bind:menuWidth="menuWidth"
                v-bind:animationDuration="animationDuration"
            >
                <template v-slot:content>
                    <p>This is the actual content</p>
                    <p style="text-align: right;">This is also the actual content</p>
                    <button v-if="mode !== 'fixed'" v-on:click="toggleMenu">Toggle menu</button>
                </template>
                <template v-slot:menu>
                    <div style='background-color: LightSalmon; height: 100%;'>
                        <p>This is a contextual menu</p>           
                    </div>
                </template>
            </content-menu>
        `
    }));
