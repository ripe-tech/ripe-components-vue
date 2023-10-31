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
            }
        },
        template: `
            <details-expandable-ripe
                v-bind:data="data"
            >
            <template v-slot="slotProps">
            <label-ripe v-bind:text='slotProps.fieldName'></label-ripe>
                <input-ripe v-bind:value=slotProps.fieldValue></input-ripe>
            </template>
            </details-expandable-ripe>
        `
    }));









