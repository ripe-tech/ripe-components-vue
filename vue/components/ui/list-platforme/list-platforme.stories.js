import { storiesOf } from "@storybook/vue";
import { withKnobs, number } from "@storybook/addon-knobs";

import "./list-platforme.stories.css";

storiesOf("Data", module)
    .addDecorator(withKnobs)
    .add("List", () => ({
        props: {
            containerWidth: {
                type: Number,
                default: number("Container Width", 375)
            },
            items: {
                type: Array,
                default: () => [
                    {
                        id: 1,
                        image:
                            "https://ripe-core-ci.platforme.com/api/compose?brand=swear&format=png&frame=0&height=1000&model=vyner&p=lining%3Acalf_lining%3Awhite&p=front%3Anappa%3Awhite&p=side%3Anappa%3Awhite&p=sole%3Arubber%3Awhite&p=laces%3Anylon%3Awhite&p=logo%3Ametal%3Asilver&p=hardware%3Ametal%3Asilver&p=shadow%3Adefault%3Adefault&width=1000&frame=0&background=ffffff",
                        order: 5412,
                        status: "created",
                        brand: "swear",
                        date: "Oct 31 → Nov 11"
                    },
                    {
                        id: 1,
                        image:
                            "https://ripe-core-ci.platforme.com/api/compose?brand=swear&format=png&frame=0&height=1000&model=vyner&p=lining%3Acalf_lining%3Awhite&p=front%3Anappa%3Awhite&p=side%3Anappa%3Awhite&p=sole%3Arubber%3Awhite&p=laces%3Anylon%3Awhite&p=logo%3Ametal%3Asilver&p=hardware%3Ametal%3Asilver&p=shadow%3Adefault%3Adefault&width=1000&frame=0&background=ffffff",
                        order: 5412,
                        status: "created",
                        brand: "swear",
                        date: "Oct 31 → Nov 11"
                    }
                ]
            }
        },
        template: `
            <div class="container" v-bind:style="{ width: String(containerWidth) + 'px' }">
                <list-platforme v-bind:items="items">
                    <template v-slot="{ item }">
                        <div class="row">
                            <div class="half"><img class="image" v-bind:src="item.image" /></div>
                            <div class="half order-info">
                                <label-value-platforme v-bind:label="'order'" v-bind:value="item.order" />
                                <label-value-platforme v-bind:label="'status'" v-bind:value="item.status" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="half"><label-value-platforme v-bind:label="'brand'" v-bind:value="item.brand" /></div>
                            <div class="half"><label-value-platforme v-bind:label="'date'" v-bind:value="item.date" /></div>
                        </div>
                    </template>
                </list-platforme>
            </div>
            `
    }));
