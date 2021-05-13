import { storiesOf } from "@storybook/vue";
import { boolean, select } from "@storybook/addon-knobs";

storiesOf("Components/Organisms/Input List", module).add("Input List", () => ({
    props: {
        fields: {
            default: () => [
                {
                    value: "gender",
                    type: "enum",
                    props: {
                        options: [
                            { value: "male", label: "Female" },
                            { value: "female", label: "Male" }
                        ]
                    }
                },
                {
                    value: "scale",
                    type: "enum",
                    props: {
                        options: [
                            { value: "it", label: "IT" },
                            { value: "fr", label: "FR" },
                            { value: "uk", label: "UK" }
                        ]
                    }
                },
                {
                    value: "size",
                    type: "text"
                }
            ]
        },
        buttonAddRow: {
            default: select(
                "Button Add Row",
                {
                    Top: "top",
                    Bottom: "bottom",
                    None: null
                },
                "top"
            )
        },
        header: {
            default: boolean("Header", true)
        }
    },
    data: function() {
        return {
            values: []
        };
    },
    template: `
        <div>
            <input-list
                v-bind:fields="fields"
                v-bind:values.sync="values"
                v-bind:button-add-row="buttonAddRow"
                v-bind:header="header"
            />
            <p> Values: {{ values }} </p>
        </div>
    `
}));
