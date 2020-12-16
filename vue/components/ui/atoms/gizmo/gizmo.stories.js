import { storiesOf } from "@storybook/vue";
import { withKnobs, number } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Gizmo", () => ({
        props: {
            x: {
                default: number("X", 30)
            },
            y: {
                default: number("Y", 30)
            },
            width: {
                default: number("Width", 0)
            },
            height: {
                default: number("Height", 100)
            },
            interactableMargin: {
                default: number("interactable Margin", 10)
            }
        },
        template: `
            <gizmo
                v-bind:x="x"
                v-bind:y="y"
                v-bind:width="width"
                v-bind:height="height"
                v-bind:interactable-margin="interactableMargin"
            />
        `
    }));
