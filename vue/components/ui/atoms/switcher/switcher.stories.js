import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Switcher", module)
    .addDecorator(withKnobs)
    .add("Switcher", () => ({
        props: {
            checked: {
                default: boolean("Checked", false)
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            checkedColor: {
                default: text("Checked Color", "#1d1d1d")
            },
            uncheckedColor: {
                default: text("Unchecked Color", "#cccccc")
            },
            checkedText: {
                default: text("Checked Text", null)
            },
            uncheckedText: {
                default: text("Unchecked Text", null)
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
                    v-bind:disabled="disabled"
                    v-bind:checked-color="checkedColor"
                    v-bind:checked-text="checkedText"
                    v-bind:unchecked-text="uncheckedText"
                />
                <p>The switcher's value is: {{ checkedData }}</p>
            </div>
        `
    }));
