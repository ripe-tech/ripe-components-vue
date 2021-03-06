import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, boolean } from "@storybook/addon-knobs";

import "./details.stories.css";

storiesOf("Components/Organisms/Details", module)
    .addDecorator(withKnobs)
    .add("Details", () => ({
        props: {
            title: {
                type: String,
                default: text("Title", "Details")
            },
            itemName: {
                type: String,
                default: text("Item Name", "Order")
            },
            columns: {
                type: Number,
                default: number("Columns", 4)
            },
            imageUrl: {
                type: String,
                default: text("Image URL", "https://cdn.platforme.com/images/platforme.square.png")
            },
            loaded: {
                type: Boolean,
                default: boolean("Item Loaded", true)
            },
            item: {
                type: Object,
                default: () => ({
                    id: 1,
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
                    { value: "name", label: "Person", note: "age" },
                    { value: "car" },
                    { value: "city" },
                    { value: "shoes" },
                    { value: "trousers" },
                    { value: "shirt" }
                ]
            },
            optionsItems: {
                type: Array,
                default: () => [
                    { label: "Item 1", value: "item_1", event: "item_1" },
                    { label: "Item 2", value: "item_2", event: "item_2" },
                    { label: "Item 3", value: "item_3", separator: true, event: "item_3" },
                    { label: "Item 4", value: "item_4", event: "item_4" }
                ]
            },
            headerButtons: {
                type: Boolean,
                default: boolean("Header Buttons", true)
            }
        },
        template: `
            <details-ripe
                v-bind:values="values"
                v-bind:columns="columns"
                v-bind:title="title"
                v-bind:image-url="imageUrl"
                v-bind:options-items="optionsItems"
                v-bind:item="item"
                v-bind:name="itemName"
                v-bind:loaded="loaded"
                v-bind:context="{}"
                v-bind:index="0"
                v-bind:get-items="() => values"
                v-bind:header-buttons="headerButtons"
            >
                <template v-slot:shirt>
                    <p>Custom entry</p>
                </template>
                <template v-slot:label-city>
                    <p>Custom label</p>
                </template>
                <template v-slot:options-item_4>
                    <div>Custom item</div>
                </template>
            </details-ripe>
        `
    }));
