import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Progress List Item", () => ({
        props: {
            title: {
                default: text("Title", "ermenegildo_zegna")
            },
            description: {
                default: text("Description", "780.12MB")
            },
            finished: {
                default: boolean("Finished", false)
            },
            progress: {
                default: number("Progress", null)
            },
            actionText: {
                default: text("Action Text", "Go to build")
            },
            actionIcon: {
                default: text("Action Icon", "arrow-right-top")
            }
        },
        template: `
            <div>
                <progress-list-item
                    v-bind:title="title"
                    v-bind:description="description"
                    v-bind:finished="finished"
                    v-bind:progress="progress"
                    v-bind:actionText="actionText"
                    v-bind:actionIcon="actionIcon"
                />
            </div>
        `
    }));
