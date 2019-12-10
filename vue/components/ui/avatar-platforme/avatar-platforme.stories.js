import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";

storiesOf("Avatar", module)
    .addDecorator(withKnobs)
    .add("Simple", () => ({
        props: {
            imgUrl: {
                default: text("Image URL", "http://placekitten.com/g/100/100")
            },
            size: {
                default: select(
                    "Size",
                    {
                        Micro: "micro",
                        Tiny: "tiny",
                        Small: "small",
                        Medium: "medium",
                        Large: "large",
                        Giant: "giant"
                    },
                    "giant"
                )
            },
            notify: {
                default: boolean("Notify", true)
            },
            notifyColor: {
                default: text("Notify color", "green")
            }
        },
        template: `
            <div>
                <avatar-platforme v-bind:notify-color="notifyColor" v-bind:notify="notify" v-bind:size="size" v-bind:imgUrl="imgUrl"/>

                <p> micro, tiny, small, medium, large, giant: </p>

                <avatar-platforme v-bind:notify="true" v-bind:size="'giant'" v-bind:imgUrl="imgUrl"/>
                <avatar-platforme v-bind:notify="true" v-bind:size="'large'" v-bind:imgUrl="imgUrl"/>
                <avatar-platforme v-bind:notify="true" v-bind:size="'medium'" v-bind:imgUrl="imgUrl"/>
                <avatar-platforme v-bind:notify="true" v-bind:size="'small'" v-bind:imgUrl="imgUrl"/>
                <avatar-platforme v-bind:notify="true" v-bind:size="'tiny'" v-bind:imgUrl="imgUrl"/>
                <avatar-platforme v-bind:notify="true" v-bind:size="'micro'" v-bind:imgUrl="imgUrl"/>
            </div>
        `
    }));
