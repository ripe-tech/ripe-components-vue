import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import "./details-platforme.stories.css";

storiesOf("Data", module)
    .addDecorator(withKnobs)
    .add("Details", () => ({
        props: {
            title: {
                type: String,
                default: text("title", "Details")
            },
            columns: {
                type: Number,
                default: number("Columns", 4)
            },
            imageUrl: {
                type: String,
                default: text("Image URL", "https://cdn.platforme.com/images/platforme.square.png")
            },
            item: {
                type: Object,
                default: () => ({
                    name: "Theodore",
                    age: 14,
                    car: "Toyota Prius",
                    city: "Matosinhos",
                    shoes: "Vyner",
                    trousers: "Levi's",
                    shirt: "Antonio Morato"
                })
            },
            values: {
                type: Array,
                default: () => [
                    { id: "name", label: "Person", note: "age" },
                    { id: "car" },
                    { id: "city" },
                    { id: "shoes" },
                    { id: "trousers" },
                    { id: "shirt" }
                ]
            },
            optionsItems: {
                type: Array,
                default: () => [
                    { text: "Item 1", event: "item_1" },
                    { text: "Item 2", event: "item_2" },
                    { text: "Item 3", event: "item_3" }
                ]
            }
        },
        template: `
            <details-platforme
                v-bind:values="values"
                v-bind:columns="columns"
                v-bind:title="title"
                v-bind:image-url="imageUrl"
                v-bind:options-items="optionsItems"
                v-bind:item="item"
            >
                <template v-slot:shirt>
                    <p>Custom entry</p>
                </template>
                <template v-slot:label-city>
                    <p>Custom label</p>
                </template>
            </details-platforme>
        `
    }));
