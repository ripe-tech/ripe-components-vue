import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Rich Text Area", () => ({
        props: {
            optionsItems: {
                type: Array,
                default: () => [
                    { icon: "chat", event: "item_1" },
                    { icon: "cart", event: "item_2" },
                    { icon: "walking", event: "item_3" }
                ]
            }
        },
        data: function() {
            return {
                textAreaText: this.value,
                chatEventCounter: 0,
                cartEventCounter: 0,
                walkingEventCounter: 0
            };
        },
        methods: {
            onValue(value) {
                this.textAreaText = value;
            },
            onIconEvent(value) {
                switch (value) {
                    case "chatEvent":
                        this.chatEventCounter++;
                        break;
                    case "cartEvent":
                            this.cartEventCounter++;
                        break;
                    case "walkingEvent":
                            this.walkingEventCounter++;
                        break;
                    default:
                }
            }
        },
        template: `
            <div style="width:500px">
                <rich-textarea-platforme
                    v-bind:options-items="optionsItems"
                    v-on:update:value="value => onValue(value)"
                    v-on:click:item_1="onIconEvent('chatEvent')"
                    v-on:click:item_2="onIconEvent('cartEvent')"
                    v-on:click:item_3="onIconEvent('walkingEvent')"
                />
                <p>Text: {{ textAreaText }}</p>
                <p>Chat event count: {{ chatEventCounter }}</p>
                <p>Cart event count: {{ cartEventCounter }}</p>
                <p>Walking event count: {{ walkingEventCounter }}</p>
            </div>
            `
    }));
