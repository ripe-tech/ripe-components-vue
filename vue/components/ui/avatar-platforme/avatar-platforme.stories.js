import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select, boolean, color } from "@storybook/addon-knobs";

storiesOf("Avatar", module)
    .addDecorator(withKnobs)
    .add("Avatar", () => ({
        props: {
            imgUrl: {
                default: text("Image URL", "http://placekitten.com/g/100/100")
            },
            size: {
                default: select(
                    "Size",
                    {
                        "Micro (16px)": "micro",
                        "Tiny (24px)": "tiny",
                        "Small (32px)": "small",
                        "Medium (40px)": "medium",
                        "Large (96px)": "large",
                        "Giant (128px)": "giant"
                    },
                    "giant"
                )
            },
            title: {
                default: text("Title", "Cute")
            },
            subtitle: {
                default: text("Subtext", "Kitten")
            },
            content: {
                default: text("Content", "Miau miau...")
            },
            notify: {
                default: boolean("Notify", true)
            },
            notifyColor: {
                default: color("Notify color", "green")
            },
            notifyBorderColor: {
                default: color("Notify border color", "white")
            }
        },
        template: `
        <div>
            <avatar-platforme
                v-bind:content="content"
                v-bind:subtitle="subtitle"
                v-bind:title="title"
                v-bind:notify-color="notifyColor"
                v-bind:notify-border-color="notifyBorderColor"
                v-bind:notify="notify"
                v-bind:size="size"
                v-bind:imgUrl="imgUrl" />

            <p> Giant, large, medium, small, tiny, micro: </p>

            <avatar-platforme v-bind:size="'giant'" v-bind:imgUrl="imgUrl" />
            <avatar-platforme v-bind:size="'large'" v-bind:imgUrl="imgUrl" />
            <avatar-platforme v-bind:size="'medium'" v-bind:imgUrl="imgUrl" />
            <avatar-platforme v-bind:size="'small'" v-bind:imgUrl="imgUrl" />
            <avatar-platforme v-bind:size="'tiny'" v-bind:imgUrl="imgUrl" />
            <avatar-platforme v-bind:size="'micro'" v-bind:imgUrl="imgUrl" />
        </div>
        `
    }));
