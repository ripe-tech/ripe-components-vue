import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Components/Organisms/Details Expandable", module)
    .addDecorator(withKnobs)
    .add("Details Expandable", () => ({
        props: {
            data: {
                type: Object,
                default: () => ({
                    customer: {
                        name: "John Doe",
                        phone: "351999999999",
                        email: "john_doe@platforme.com",
                        address: {
                            line: "2540 Shore Blvd Apt LF",
                            city: "Astoria",
                            postal_code: "11102-3954",
                            country_code: "US",
                            state_code: "NY"
                        }
                    },
                    shipper: {
                        name: "Coolstuffz Porto",
                        phone: "222333444",
                        address: {
                            line: "Rua de Santa Catarina 4",
                            city: "Porto",
                            postal_code: "4000542",
                            country_code: "PT"
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
