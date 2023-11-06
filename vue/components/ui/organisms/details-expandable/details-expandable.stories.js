import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Components/Organisms/Details Expandable", module)
    .addDecorator(withKnobs)
    .add("Details Expandable", () => ({
        props: {
            data: {
                type: Object,
                default: () => ({
                    firstRow: {
                        fieldA: "something",
                        fieldB: "something else",
                        fieldObject: {
                            propertyA: "property a",
                            propertyB: "property b"
                        }
                    },
                    secondRow: {
                        fieldC: "yet something",
                        fieldD: "yet something else",
                        fieldObject: {
                            propertyC: "property c",
                            propertyD: "property d"
                        }
                    }
                })
            },
            sectionSize: {
                default: "small"
            },
            sectionAnimated: {
                default: true
            },
            sectionUppercase: {
                default: true
            },
            labelFontSize: {
                default: 14
            },
            discardButtonText: {
                default: "Discard changes or not..."
            },
            saveButtonText: {
                default: "Save changes now!"
            }
        },
        methods: {
            onDiscardClick() {
                console.log("onDiscardClick");
            },
            onSaveClick() {
                console.log("onSaveClick");
            }
        },
        template: `
            <details-expandable-ripe
                v-bind:data="data"
                v-bind:section-size="sectionSize"
                v-bind:animated="sectionAnimated"
                v-bind:uppercase-section="sectionUppercase"
                v-bind:label-font-size="labelFontSize"
                v-bind:style="'margin-top: 25px'"
                v-bind:discard-button-text="discardButtonText"
                v-bind:save-button-text="saveButtonText"
                v-on:discard:click="onDiscardClick"
                v-on:save:click="onSaveClick"
            >
                <template v-slot:firstRow-label-fieldA>
                    name
                </template>
                <template v-slot:firstRow-fieldObject>
                    <input-ripe v-bind:style="'width: 50%'" v-bind:value="data.firstRow.fieldObject.propertyA" />
                </template>
                <template v-slot:second_row-fieldObject>
                    <input-ripe v-bind:style="'width: 50%'" v-bind:value="data.secondRow.fieldObject.propertyC" />
                </template>
            </details-expandable-ripe>
        `
    }));
