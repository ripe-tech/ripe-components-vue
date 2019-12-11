import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Lists", module)
    .addDecorator(withKnobs)
    .add("Files List", () => ({
        props: {
            filesItems: {
                type: Array,
                default: () => [
                    { name: "random-file", extension:".pdf", path: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
                    { name: "lorem-ipsum", extension:".pdf", path: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
                    { name: "img-153133", extension:".jpeg", path: "http://i.pravatar.cc" },
                    { name: "screenshot13122019", extension:".jpeg", path: "http://i.pravatar.cc" }
                ]
            }
        },
        template: `
            <div>
                <files-list-platforme
                    v-bind:filesItems="filesItems"
                />
            </div>
            `
    }));
