import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Overlay", module)
    .addDecorator(withKnobs)
    .add("Overlay", () => ({
        props: {
            visible: {
                default: boolean("Visible", false)
            }
        },
        watch: {
            visible: function(value) {
                value ? this.$bus.$emit("show-overlay") : this.$bus.$emit("hide-overlay");
            }
        },
        template: "<overlay-platforme></overlay-platforme>"
    }));
