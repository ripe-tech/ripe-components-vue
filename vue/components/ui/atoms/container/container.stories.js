import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Container", module)
    .addDecorator(withKnobs)
    .add("Container", () => ({
        props: {
            mode: {
                default: select(
                    "Mode",
                    {
                        Default: "default",
                        Expanded: "expanded",
                        Inline: "inline"
                    },
                    "default"
                )
            },
            title: {
                default: text("Title", "Container title")
            },
            headerButtons: {
                type: Array,
                default: () => [
                    {
                        id: "preview",
                        text: "Preview",
                        icon: "eye",
                        color: "none",
                        size: 30
                    },
                    {
                        id: "disabled",
                        text: "Disabled",
                        icon: "bin",
                        color: "none",
                        size: 30,
                        disabled: true
                    },
                    {
                        id: "loading",
                        text: "Loading",
                        icon: "eye",
                        color: "none",
                        size: 30,
                        loading: true
                    },
                    {
                        id: "create",
                        text: "Create",
                        icon: "add",
                        type: "color"
                    },
                    {
                        id: "notshow",
                        text: "Not showing",
                        icon: "eye",
                        color: "none",
                        size: 30,
                        hide: true
                    }
                ]
            },
            overflowX: {
                default: text("Overflow X", null)
            },
            overflowY: {
                default: text("Overflow Y", null)
            }
        },
        methods: {
            onHeaderButtonClick(event, id) {
                console.log("Header Button Click", event, id);
            }
        },
        template: `
            <div>
                <global />
                <container-ripe
                    style='height: 200px'
                    v-bind:mode="mode"
                    v-bind:title="title"
                    v-bind:headerButtons="headerButtons"
                    v-bind:overflow-x="overflowX"
                    v-bind:overflow-Y="overflowY"
                    v-on:header-button:click="(event, id) => onHeaderButtonClick(event, id)"
                />
            </div>
        `
    }));
