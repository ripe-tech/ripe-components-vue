import { storiesOf } from "@storybook/vue";

storiesOf("Input", module).add("Label", () => ({
    template: `
            <div>
                <div><label-platforme v-bind:text='"This is a normal label"'></label-platforme></div>
                <div><label-platforme v-bind:text='"This is a small label"' v-bind:size='"small"'></label-platforme></div>
                <div><label-platforme v-bind:text='"This is a large label"' v-bind:size='"large"'></label-platforme></div>
                <div><label-platforme v-bind:text='"This is an error label"' v-bind:color='"error"'></label-platforme></div>
            </div>
        `
}));
