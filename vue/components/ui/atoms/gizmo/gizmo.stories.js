import { storiesOf } from "@storybook/vue";
import { withKnobs, number, text, color, boolean } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Gizmo", () => ({
        props: {
            x: {
                default: number("X", 60)
            },
            y: {
                default: number("Y", 60)
            },
            width: {
                default: number("Width", 30)
            },
            height: {
                default: number("Height", 30)
            },
            interactableMargin: {
                default: number("Interactable Margin", 10)
            },
            round: {
                default: boolean("Round", false)
            },
            backgroundColor: {
                default: color("Background Color", "#ffffff")
            },
            borderStyle: {
                default: text("Border Style", "solid")
            },
            borderWidth: {
                default: number("Border Width", 2)
            },
            borderColor: {
                default: color("Border Color", "#ff0000")
            },
            icon: {
                default: text("Icon", "back-right")
            },
            iconSize: {
                default: number("Icon size", 25)
            },
            iconBackgroundColor: {
                default: color("Icon Background Color", "#ffffff")
            }
        },
        template: `
            <gizmo
                v-bind:x="x"
                v-bind:y="y"
                v-bind:width="width"
                v-bind:height="height"
                v-bind:interactable-margin="interactableMargin"
                v-bind:round="round"
                v-bind:background-color="backgroundColor"
                v-bind:border-style="borderStyle"
                v-bind:border-width="borderWidth"
                v-bind:border-color="borderColor"
                v-bind:icon="icon"
                v-bind:icon-size="iconSize"
                v-bind:icon-background-color="iconBackgroundColor"
            />
        `
    }));
