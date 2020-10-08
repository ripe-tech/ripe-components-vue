import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Entity Lister", () => ({
        props: {
            name: {
                default: text("Name", "Person")
            },
            columns: {
                type: Array,
                default: () => [
                    { value: "name", label: "Name" },
                    { value: "email", label: "Email" },
                    { value: "phone", label: "Phone" }
                ]
            },
            createButton: {
                default: boolean("Create Button", false)
            },
            editEntity: {
                default: boolean("Edit Button", false)
            }
        },
        methods: {
            getEntities() {
                return [
                    {
                        id: 0,
                        name: "Louise J Figueroa",
                        email: "alta1995@gmail.com",
                        phone: "210-605-3044"
                    },
                    {
                        id: 1,
                        name: "Linda J Silber",
                        email: "axel2008@yahoo.com",
                        phone: "904-254-9396"
                    }
                ];
            }
        },
        template: `
            <entity-lister
                v-bind:name="name"
                v-bind:columns="columns"
                v-bind:get-entities="getEntities"
                v-bind:create-button="createButton"
                v-bind:edit-entity="editEntity"
                v-bind:listing-props="{ useQuery: false }"
            />
        `
    }));
