import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Description", () => ({
        props: {
            title: {
                default: text("Title", "Enabled")
            },
            subtitle: {
                default: text(
                    "Subtext",
                    "Subtitle checking text wrap lero lero lero lero lero lero lero lero"
                )
            },
            wrap: {
                default: boolean("Wrap Text", false)
            },
            selected: {
                default: boolean("Selected", false)
            }
        },
        template: `
            <div>
                <description
                    v-bind:title='title'
                    v-bind:subtitle='subtitle'
                    v-bind:selected='selected'
                    v-bind:wrap='wrap'>
                </description>
            </div>
        `
    }));
