import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Rich Text Area", () => ({
        props: {
            hello: {
                default: text("Hello World", "Hello !!!")
            }
        },
        data: function() {
            return {
                textAreaText: this.value
            };
        },
        methods: {
            onValue(value) {
                this.textAreaText = value;
            }
        },
        template: `
            <div style="width:500px">
                <rich-textarea-platforme
                    v-bind:hello="hello"
                    v-on:update:value="value => onValue(value)"
                />
                <p>Text: {{ textAreaText }}</p>
            </div>
            `
    }));
