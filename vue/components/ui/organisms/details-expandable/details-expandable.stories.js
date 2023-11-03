import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Components/Organisms/Details Expandable", module)
    .addDecorator(withKnobs)
    .add("Details Expandable", () => ({
        props: {
            data: {
                type: Object,
                default: () => ({
                    first_row: {
                        field_a: "something",
                        field_b: "something else",
                        field_object: {
                            property_a: "property a",
                            property_b: "property b"
                        }
                    },
                    second_row: {
                        field_c: "yet something",
                        field_d: "yet something else",
                        field_object: {
                            property_a: "property c",
                            property_b: "property d"
                        }
                    }
                })
            },
            labelFontSize: {
                default: 14
            },
            discardButtonText: {
                default: "Discard changes or not..."
            },
            saveButtonText: {
                default: "Save changes now!"
            }
        },
        methods: {
            onDiscardClick() {
                console.log("onDiscardClick");
            },
            onSaveClick() {
                console.log("onSaveClick");
            }
        },
        template: `
            <details-expandable-ripe
                v-bind:data="data"
                v-bind:label-font-size="labelFontSize"
                v-bind:style="'margin-top: 25px'"
                v-bind:discard-button-text="discardButtonText"
                v-bind:save-button-text="saveButtonText"
                v-on:discard:click="onDiscardClick"
                v-on:save:click="onSaveClick"
            >
            <template v-slot:customer>Customized Customer</template>
            <template v-slot:customer-label-name>name</template>
            <template v-slot:customer-address>
                <input-ripe v-bind:style="'width: 50%'" v-bind:value="data.customer.address.city"></input-ripe>
            </template>
            <template v-slot:shipper-address>
                <input-ripe v-bind:style="'width: 50%'" v-bind:value="data.shipper.address.city"></input-ripe>
            </template>
            </details-expandable-ripe>
        `
    }));
