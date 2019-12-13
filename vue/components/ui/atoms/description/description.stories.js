import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Description", () => ({
        props: {
            title: {
                default: text("Title", "Titulo Lero Lero")
            },
            subtitle: {
                default: text(
                    "Subtext",
                    "O incentivo ao avanço tecnológico, assim como o surgimento do comércio virtual causa impacto indireto na reavaliação de alternativas às soluções ortodoxas.a"
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
