import { storiesOf } from "@storybook/vue";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Pagination", module)
    .addDecorator(withKnobs)
    .add("Pagination", () => ({
        props: {
            page: {
                default: number("Current Page", 1)
            },
            pages: {
                default: number("Pages", 5)
            },
            hideLong: {
                default: boolean("Hide pages if too many", true)
            }
        },
        data: function() {
            return {
                pageData: this.page
            };
        },
        watch: {
            page(value) {
                this.pageData = value;
            }
        },
        template: `
            <pagination
                v-bind:page.sync="pageData"
                v-bind:pages="pages"
                v-bind:hide-long="hideLong"
            />
        `
    }));
