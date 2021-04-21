import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Organisms/Entity Show", module)
    .addDecorator(withKnobs)
    .add("Entity Show", () => ({
        props: {
            name: {
                default: text("Name", "Person")
            },
            fields: {
                type: Array,
                default: () => [
                    { value: "name" },
                    { value: "email" },
                    { value: "phone" },
                    { value: "address" },
                    { value: "city" },
                    { value: "state" }
                ]
            },
            getEntity: {
                type: Function,
                default: () => ({
                    name: "Louise J Figueroa",
                    email: "alta1995@gmail.com",
                    phone: "210-605-3044",
                    address: "4033 Morris Street",
                    city: "San Antonio",
                    state: "Texas(TX)"
                })
            },
            getEntities: {
                type: Function,
                default: () => [
                    {
                        name: "Louise J Figueroa",
                        email: "alta1995@gmail.com",
                        phone: "210-605-3044",
                        address: "4033 Morris Street",
                        city: "San Antonio",
                        state: "Texas(TX)"
                    },
                    {
                        name: "Linda J Silber",
                        email: "axel2008@yahoo.com",
                        phone: "904-254-9396",
                        address: "3702 Lunetta Street",
                        city: "Venice",
                        state: "Florida(FL)"
                    }
                ]
            },
            breadcrumbs: {
                type: Array,
                default: () => [{ text: "Google", href: "https://www.google.com" }]
            }
        },
        template: `
            <entity-show
                v-bind:name="name"
                v-bind:fields="fields"
                v-bind:get-entity="getEntity"
                v-bind:get-entities="getEntities"
                v-bind:breadcrumbs="breadcrumbs"
            >
                <template v-slot:value-state="{ entity }">
                    custom state - {{entity.state}}
                </template>
            </entity-show>
        `
    }));
