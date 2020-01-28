import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, select } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
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
                v-bind:header="header"
                v-bind:footer="footer"
                v-bind:header-variant="headerVariant"
                v-bind:footer-variant="footerVariant"
                v-bind:header-min-width="headerMinWidth"
                v-bind:footer-min-width="footerMinWidth"    
            >
                <input-ripe />
            </form-input>
        `
    }));
