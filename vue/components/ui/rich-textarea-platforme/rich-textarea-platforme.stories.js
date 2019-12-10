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
        template: `
            <div style="width:500px">
                <rich-textarea-platforme
                    v-bind:hello="hello"
                />
            </div>
            `
    }));
