import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Switcher", module)
    .addDecorator(withKnobs)
    .add("Switcher", () => ({
        props: {
            checked: {
                default: boolean("Checked", false)
            },
            disabled: {
                default: boolean("Disabled", false)
            }
        },
        data: function() {
            return {
                checkedData: this.checked
            };
        },
        watch: {
            checked(value) {
                this.checkedData = value;
            }
        },
        template: `
            <div>
                <switcher
                    v-bind:checked.sync="checkedData"
                    v-bind:disabled="disabled" />
                <p>The switcher's value is: {{ checkedData }}</p>
            </div>
        `
    }));
