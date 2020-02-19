import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Progress List", () => ({
        props: {
            items: {
                type: Array,
                default: () => [
                    {
                        title: "ermenegildo_zegna",
                        description: "780.12MB",
                        finished: true,
                        progress: 100,
                        actionText: "Go to build",
                        actionIcon: "arrow-right-top"
                    },
                    {
                        title: "sergio_rossi",
                        description: "1.23GB",
                        finished: true,
                        progress: 100,
                        actionText: "Go to build",
                        actionIcon: "arrow-right-top"
                    },
                    {
                        title: "dior",
                        description: "420.92MB",
                        finished: false,
                        progress: 27,
                        actionText: "Go to build",
                        actionIcon: "arrow-right-top"
                    }
                ]
            },
            footerText: {
                default: text("Footer Text", "Footer text example")
            }
        },
        template: `
            <div>
                <progress-list v-bind:items="items" v-bind:footer-text="footerText" >
                    Custom Footer
                </progress-list>
            </div>
        `
    }));
