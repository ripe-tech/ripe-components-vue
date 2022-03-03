import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, select } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Form Input", module)
    .addDecorator(withKnobs)
    .add("Form Input", () => ({
        props: {
            variant: {
                default: select(
                    "Variant",
                    {
                        Unset: null,
                        Inline: "inline"
                    },
                    null
                )
            },
            header: {
                default: text("Header", "Header")
            },
            tooltipText: {
                default: text("Tooltip Text", "Tooltip Text")
            },
            alignment: {
                default: select(
                    "Alignment",
                    {
                        Left: "left",
                        Center: "center",
                        Right: "right"
                    },
                    "left"
                )
            },
            footer: {
                default: text("Footer", "Footer")
            },
            headerVariant: {
                default: select(
                    "Header Variant",
                    {
                        Unset: null,
                        Error: "error",
                        Warning: "warning",
                        Success: "success"
                    },
                    null
                )
            },
            headerSize: {
                default: select(
                    "Header Size",
                    {
                        Unset: null,
                        Small: "small",
                        Medium: "medium",
                        Large: "large"
                    },
                    "medium"
                )
            },
            footerVariant: {
                default: select(
                    "Footer Variant",
                    {
                        Unset: null,
                        Error: "error",
                        Warning: "warning",
                        Success: "success"
                    },
                    null
                )
            },
            footerSize: {
                default: select(
                    "Footer Size",
                    {
                        Unset: null,
                        Small: "small",
                        Medium: "medium",
                        Large: "large"
                    },
                    "small"
                )
            },
            headerMinWidth: {
                default: number("Header Minimum Width", null)
            },
            footerMinWidth: {
                default: number("Footer Minimum Width", null)
            }
        },
        template: `
            <form-input
                v-bind:variant="variant"
                v-bind:alignment="alignment"
                v-bind:header="header"
                v-bind:tooltip-text="tooltipText"
                v-bind:footer="footer"
                v-bind:header-variant="headerVariant"
                v-bind:header-size="headerSize"
                v-bind:footer-variant="footerVariant"
                v-bind:footer-size="footerSize"
                v-bind:header-min-width="headerMinWidth"
                v-bind:footer-min-width="footerMinWidth"    
            >
                <input-ripe />
            </form-input>
        `
    }));
