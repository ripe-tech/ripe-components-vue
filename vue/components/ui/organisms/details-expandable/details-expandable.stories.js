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
            fontSize: {
                type: Number,
                default: 14
            }
        },
        template: `
            <details-expandable-ripe
                v-bind:data="data"
                v-bind:label-font-size="fontSize"
                v-bind:style="'margin-top: 25px'"
            >
            <template v-slot:customer-address>
                <input-ripe v-bind:style="'width: 50%'" v-bind:value="data.customer.address.city"></input-ripe>
            </template>
            <template v-slot:shipper-address>
                <input-ripe v-bind:style="'width: 50%'" v-bind:value="data.shipper.address.city"></input-ripe>
            </template>
            </details-expandable-ripe>
        `
    }));
