import { storiesOf } from "@storybook/vue";
import { withKnobs, number } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Attachments List", () => ({
        props: {
            attachments: {
                type: Array,
                default: () => [
                    {
                        name: "random-file.zip",
                        path: "https://github.com/ripe-tech/ripe-sdk/archive/master.zip"
                    },
                    {
                        name: "lorem-ipsum.pdf",
                        path:
                            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    },
                    {
                        name: "img-153133.jpeg",
                        path: "http://i.pravatar.cc"
                    },
                    {
                        name: "screenshot13122019",
                        path: "http://i.pravatar.cc"
                    },
                    {
                        name: "lorem-ipsum-file",
                        path:
                            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    },
                    {
                        name: "img-533122019",
                        path: "http://i.pravatar.cc"
                    }
                ]
            },
            width: {
                default: number("Initial Width", 250)
            },
            height: {
                default: number("Initial Height", 200)
            }
        },
        template: `
            <div>
                <attachments-list
                    v-bind:attachments="attachments"
                    v-bind:width="width"
                    v-bind:height="height"
                />
            </div>
            `
    }));
