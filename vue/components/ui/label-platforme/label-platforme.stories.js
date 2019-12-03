import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Label", () => ({
        props: {
            color: {
                default: text("Color", "")
            },
            size: {
                default: text("Size", "")
            }
        },
        template: `
            <div>
                <div><label-platforme v-bind:text='"This is a normal label"'></label-platforme></div>
                <div><label-platforme v-bind:text='"This is a small label"' v-bind:color='color' v-bind:size='"small"'></label-platforme></div>
                <div><label-platforme v-bind:text='"This is a large label"' v-bind:color='color' v-bind:size='"large"'></label-platforme></div>
                <div><label-platforme v-bind:text='"This is a label"' v-bind:color='color' v-bind:size='size'></label-platforme></div>
            </div>
        `
    }));
