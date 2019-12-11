import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Lists", module)
    .addDecorator(withKnobs)
    .add("Files List", () => ({
        props: {
            hello: {
                default: text("Hello World", "Hello !!!")
            }
        },
        template: `
            <div>
                <files-list-platforme
                    v-bind:hello="hello"
                />
            </div>
            `
    }));
