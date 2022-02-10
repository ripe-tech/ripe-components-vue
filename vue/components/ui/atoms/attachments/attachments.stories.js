import { storiesOf } from "@storybook/vue";
import { withKnobs, number } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Attachments", module)
    .addDecorator(withKnobs)
    .add("Attachments", () => ({
        props: {
            width: {
                default: number("Width", 250)
            },
            height: {
                default: number("Height", 200)
            },
            attachments: {
                type: Array,
                default: () => [
                    {
                        name: "random-file.zip",
                        path: "https://github.com/ripe-tech/ripe-sdk/archive/master.zip"
                    },
                    {
                        name: "lorem-ipsum.pdf",
                        path: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    },
                    {
                        name: "img-153133.jpeg",
                        path: "http://i.pravatar.cc"
                    },
                    {
                        name: "screenshot-13122019",
                        path: "http://i.pravatar.cc"
                    },
                    {
                        name: "dummy.pdf",
                        path: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    },
                    {
                        name: "img-533122019.jpg",
                        path: "http://i.pravatar.cc"
                    },
                    {
                        name: "this-is-a-very-long-file-name-on-a-single-word-img-533122019",
                        path: "http://i.pravatar.cc"
                    }
                ]
            }
        },
        template: `
            <div>
                <attachments
                    v-bind:attachments="attachments"
                    v-bind:width="width"
                    v-bind:height="height"
                />
            </div>
            `
    }));
