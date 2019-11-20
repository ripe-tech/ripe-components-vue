import { storiesOf } from "@storybook/vue";

storiesOf("Input", module).add("Label", () => ({
    template: `
            <div>
                <label-platforme v-bind:text='"This is a normal label"'></label-platforme>
                <label-platforme v-bind:text='"This is a small label"' v-bind:small='true'></label-platforme>
            </div>
        `
}));
