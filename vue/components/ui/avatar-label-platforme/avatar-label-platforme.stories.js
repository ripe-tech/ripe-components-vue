import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";

storiesOf("Label Avatar", module)
    .addDecorator(withKnobs)
    .add("Simple", () => ({
        props: {
            imgUrl: {
                default: text("Image URL", "http://placekitten.com/g/100/100")
            }
        },
        template: `
            <div>
                <avatar-label-platforme v-bind:notify-color="notifyColor" v-bind:notify="notify" v-bind:size="size" v-bind:imgUrl="imgUrl"/>

                <p> micro, tiny, small, medium, large, giant: </p>

                <avatar-label-platforme v-bind:size="'giant'" v-bind:imgUrl="imgUrl"/>
                <avatar-label-platforme v-bind:size="'large'" v-bind:imgUrl="imgUrl"/>
                <avatar-label-platforme v-bind:size="'medium'" v-bind:imgUrl="imgUrl"/>
                <avatar-label-platforme v-bind:size="'small'" v-bind:imgUrl="imgUrl"/>
                <avatar-label-platforme v-bind:size="'tiny'" v-bind:imgUrl="imgUrl"/>
                <avatar-label-platforme v-bind:size="'micro'" v-bind:imgUrl="imgUrl"/>
            </div>
        `
    }));
