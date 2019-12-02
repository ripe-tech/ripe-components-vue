import { storiesOf } from "@storybook/vue";

storiesOf("Components", module).add("Link", () => ({
    template: `
            <div>
                <div><link-platforme v-bind:text='"This is a normal link"'></link-platforme></div>
                <div><link-platforme v-bind:text='"This is a small link"' v-bind:size='"small"'></link-platforme></div>
            </div>
        `
}));
