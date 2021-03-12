import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, select, text } from "@storybook/addon-knobs";

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
            variant: {
                default: select(
                    "Variant",
                    {
                        Unset: null,
                        Colored: "colored",
                        Grey: "grey"
                    },
                    null
                )
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
                    v-bind:variant="variant || undefined"
                    v-bind:checked-text="checkedText"
                    v-bind:unchecked-text="uncheckedText"
                />
                <p>The switcher's value is: {{ checkedData }}</p>
            </div>
        `
    }));
