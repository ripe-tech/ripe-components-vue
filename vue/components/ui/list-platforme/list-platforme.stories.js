import { storiesOf } from "@storybook/vue";

storiesOf("Data", module).add("Table", () => ({
    props: {
        items: {
            type: Array,
            default: () => [
                {
                    id: 1,
                    image: "",
                    order: 5412,
                    status: "created",
                    brand: "swear",
                    date: "Oct 31 → Nov 11"
                }
            ]
        }
    },
    template: `
            <list-platforme v-bind:items="items">
                <template v-slot="{ item }">
                    <div class="row">
                        <div class="row-item"><img src="item.image" /></div>
                        <div class="row-item">item.order</div>
                        <div class="row-item">item.status</div>
                    </div>
                    <div class="row">
                        <div class="row-item">item.brand</div>
                        <div class="row-item">item.date</div>
                    </div>
                </template>
            </table-platforme>
        `
}));
