import { storiesOf } from "@storybook/vue";
import { withKnobs, select, text } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Dropdown", () => ({
        props: {
            icon: {
                default: select(
                    "Icon",
                    {
                        Default: "edit",
                        Drop: "drop"
                    },
                    "edit"
                )
            },
            secondaryIcon: {
                default: select(
                    "Secondary Icon",
                    {
                        Default: "chevron-down",
                        Drop: "drop"
                    },
                    "chevron-down"
                )
            },
            label: {
                default: text("Label text", "Edit")
            },
            mockItems: {
                type: Array,
                default: () => [
                    { value: "duplicate", label: "Duplicate" },
                    { value: "delete", label: "Delete" }
                ]
            }
        },
        data: function() {
            return {
                primaryButtonPressed: false,
                optionButtonPressed: null
            };
        },
        methods: {
            onOptionsButtonPressed(item) {
                this.optionButtonPressed = item;
            },
            onPrimaryButtonPressed() {
                this.primaryButtonPressed = !this.primaryButtonPressed;
            }
        },
        template: `
            <div>
                <button-dropdown v-bind:text="label" v-bind:icon="icon" v-bind:secondary-icon="secondaryIcon" v-bind:items="mockItems" v-on:click:item-dropdown="onOptionsButtonPressed" v-on:click:primary-button="onPrimaryButtonPressed" />
                <br>
                <br>
                <p>Primary button pressed: {{ this.primaryButtonPressed }},<br>  Item Options pressed: {{ this.optionButtonPressed }}</p>
            </div>
        `
    }));
