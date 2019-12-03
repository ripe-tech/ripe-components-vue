import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Data", module)
    .addDecorator(withKnobs)
    .add("Lineup", () => ({
        props: {
            items: {
                type: Array,
                default: () => [
                    {
                        name: "Theodore",
                        age: 14,
                        car: "Toyota Prius",
                        city: "Matosinhos",
                        shoes: "Vyner",
                        trousers: "Levi's",
                        shirt: "Antonio Morato"
                    },
                    {
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
                    { id: "name", label: "Person" },
                    { id: "car" },
                    { id: "city" },
                    { id: "shoes" },
                    { id: "trousers" },
                    { id: "shirt" }
                ]
            }
        },
        template: `
            <lineup-platforme
                v-bind:values="values"
                v-bind:items="items"
            >
                <template v-slot:shirt>
                    <p>Custom entry</p>
                </template>
                <template v-slot:city-label>
                    <p>Custom label</p>
                </template>
            </lineup-platforme>
        `
    }));
