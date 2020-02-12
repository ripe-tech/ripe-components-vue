import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Switcher", () => ({
        props: {
            toggled: {
                default: boolean("Toggled", false)
            }
        },
        data: function() {
            return {
                toggledData: this.toggled
            };
        },
        watch: {
            toggled(value) {
                this.toggledData = value;
            }
        },
        template: `
            <div>
                <switcher v-bind:toggled.sync="toggledData" />
                <p>The switcher's value is: {{ toggledData }}</p>
            </div>
        `
    }));
