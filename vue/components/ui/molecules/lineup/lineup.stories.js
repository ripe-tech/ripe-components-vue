import { storiesOf } from "@storybook/vue";
import { withKnobs, number, select } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Lineup", () => ({
        props: {
            items: {
                type: Array,
                default: () => [
                    {
                        id: 0,
                        name: "Theodore",
                        age: 14,
                        car: "Toyota Prius",
                        city: "Matosinhos",
                        shoes: "Vyner",
                        trousers: "Levi's",
                        shirt: "Antonio Morato"
                    },
                    {
                        id: 1,
                        name: "Pepe",
                        age: 48,
                        car: "Toyota Yaris",
                        city: "Paris",
                        shoes: "Nike",
                        trousers: "Puma",
                        shirt: "Cavalinho"
                    }
                ]
            },
            fields: {
                type: Array,
                default: () => [
                    { value: "name", label: "Person" },
                    { value: "car" },
                    { value: "city" },
                    { value: "shoes" },
                    { value: "trousers" },
                    { value: "shirt" }
                ]
            },
            columns: {
                default: number("Columns", 2)
            },
            variant: {
                default: select(
                    "Variant",
                    {
                        Unset: null,
                        Spaced: "spaced"
                    },
                    null
                )
            }
        },
        template: `
            <lineup
                v-bind:fields="fields"
                v-bind:items="items"
                v-bind:columns="columns"
                v-bind:variant="variant"
            >
                <template v-slot:shirt>
                    Custom entry
                </template>
                <template v-slot:city-key>
                    Custom city title
                </template>
                <template v-slot:city-field>
                    Custom city value
                </template>
                <template v-slot:trousers-note>
                    Custom trousers note
                </template>
            </lineup>
        `
    }));
