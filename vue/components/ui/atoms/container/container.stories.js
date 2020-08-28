import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select, number } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Container", () => ({
        props: {
            mode: {
                default: select(
                    "Mode",
                    {
                        Default: "default",
                        Expanded: "expanded"
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
                        id: "notshow",
                        text: "Not showing",
                        icon: "eye",
                        color: "none",
                        size: 30,
                        hide: true
                    }
                ]
            },
            breadcrumbs: {
                type: Array,
                default: () => [
                    {
                        text: "Google",
                        href: "https://www.google.com"
                    },
                    {
                        text: "Platforme",
                        href: "https://www.platforme.com",
                        target: "_blank"
                    },
                    {
                        text: "RIPE White"
                    }
                ]
            },
            breadcrumbsFontSize: {
                default: number("Breadcrumbs Font Size", 26)
            },
            breadcrumbsSeparator: {
                default: text("Breadcrumbs Separator", "/")
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
                    v-bind:header-buttons="headerButtons"
                    v-on:header-button:click="(event, id) => onHeaderButtonClick(event, id)"
                />
                <container-ripe
                    style='height: 200px'
                    v-bind:mode="mode"
                    v-bind:title="breadcrumbs"
                    v-bind:breadcrumbs-font-size="breadcrumbsFontSize"
                    v-bind:breadcrumbs-separator="breadcrumbsSeparator"
                    v-bind:header-buttons="headerButtons"
                    v-on:header-button:click="(event, id) => onHeaderButtonClick(event, id)"
                />
            </div>
        `
    }));
