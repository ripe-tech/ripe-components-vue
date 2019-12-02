import { storiesOf } from "@storybook/vue";

storiesOf("Components", module).add("Link", () => ({
    template: `
            <div>
                <div><link-platforme v-bind:text='"This is a normal link"' v-bind:disabled='disabled'></link-platforme></div>
                <div><link-platforme v-bind:text='"This is a small link"' v-bind:disabled='disabled' v-bind:size='"small"'></link-platforme></div>
            </div>
        `
    }));
