import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Search Persistence with local storage", () => ({
        props: {
        },
        data: function() {
            return {};
        },
        template: `
            <div>
                <search-persistent-local-storage />
            </div>
        `
    }));
