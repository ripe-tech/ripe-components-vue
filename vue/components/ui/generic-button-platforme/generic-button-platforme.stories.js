import { storiesOf } from "@storybook/vue";
import { withKnobs, color, text, boolean } from "@storybook/addon-knobs";

storiesOf("Generic Button", module)
    .addDecorator(withKnobs)
    .add("button", () => ({
        props: {
            scaleAnimation: {
                default: boolean("Scale Animation", false)
            },
            arrowAnimation: {
                default: boolean("Arrow Animation", false)
            },
            text: {
                default: text("Button Text", "Click")
            },
            textColor: {
                default: color("Text Color", "#ffffff")
            },
            borderColor: {
                default: color("Border Color", "#0957AF")
            },
            backgroundColor: {
                default: color("Background Color", "#0957AF")
            }
        },
        template: `
            <div>
                <generic-button-platforme
                    v-bind:text="text"
                    v-bind:backgroundColor="backgroundColor"
                    v-bind:textColor="textColor"
                    v-bind:borderColor="borderColor"
                    v-bind:arrowAnimation="arrowAnimation"
                    v-bind:scaleAnimation="scaleAnimation"
                    />
            </div>
        `
    }));
