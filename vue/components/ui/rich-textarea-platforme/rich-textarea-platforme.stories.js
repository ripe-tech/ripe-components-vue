import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Rich Text Area", () => ({
        props: {
            id: {
                default: text("Id", "textarea-id")
            },
            value: {
                default: text("Value", "This is a text")
            },
            optionsItems: {
                type: Array,
                default: () => [
                    { icon: "clip", event: "item_1" },
                    { icon: "at-sign", event: "item_2" },
                    { icon: "happy-face", event: "item_3" }
                ]
            },
            placeholder: {
                default: text("Placeholder", "This is a placeholder")
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            initialWidth: {
                default: number("Initial Width", 500)
            },
            initialHeight: {
                default: number("Initial Height", 100)
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
            <div>
                <rich-textarea-platforme
                    v-bind:id="id"
                    v-bind:value="value"
                    v-bind:options-items="optionsItems"
                    v-bind:placeholder="placeholder"
                    v-bind:disabled="disabled"
                    v-on:update:value="value => onValue(value)"
                    v-on:click:item_1="onIconEvent('chatEvent')"
                    v-on:click:item_2="onIconEvent('cartEvent')"
                    v-on:click:item_3="onIconEvent('walkingEvent')"
                />
                <div>
                    <p>Text: {{ textAreaText }}</p>
                    <p>Chat event count: {{ chatEventCounter }}</p>
                    <p>Cart event count: {{ cartEventCounter }}</p>
                    <p>Walking event count: {{ walkingEventCounter }}</p>
                </div>
            </div>
            `
    }));
