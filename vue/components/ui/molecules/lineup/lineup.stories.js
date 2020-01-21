import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

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
            }
        },
        template: `
            <lineup
                v-bind:fields="fields"
                v-bind:items="items"
            >
                <template v-slot:shirt>
                    <p>Custom entry</p>
                </template>
                <template v-slot:city-label>
                    <p>Custom label</p>
                </template>
            </lineup>
        `
    }));
