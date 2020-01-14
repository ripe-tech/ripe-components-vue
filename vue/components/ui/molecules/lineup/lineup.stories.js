import { storiesOf } from "@storybook/vue";
import { withKnobs, number } from "@storybook/addon-knobs";

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
            values: {
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
            }
        },
        template: `
            <lineup
                v-bind:values="values"
                v-bind:items="items"
                v-bind:columns="columns"
            >
                <template v-slot:shirt>
                    Custom entry
                </template>
                <template v-slot:city-key>
                    Custom city title
                </template>
                <template v-slot:city-value>
                    Custom city value
                </template>
                <template v-slot:trousers-note>
                    Custom trousers note
                </template>
            </lineup>
        `
    }));
