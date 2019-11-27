import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select } from "@storybook/addon-knobs";

storiesOf("Components", module)
    .addDecorator(withKnobs)
    .add("Tabs", () => ({
        template: '<tag-platforme v-bind:size="size" v-bind:color="color" v-bind:text="text" />'
    }));
