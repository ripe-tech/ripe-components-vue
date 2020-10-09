import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Entity Editor", () => ({
        props: {
            fields: {
                type: Object,
                default: () => ({
                    "Person Info": [
                        [
                            {
                                fields: [
                                    {
                                        value: "name",
                                        label: "Name*",
                                        type: "text",
                                        props: { placeholder: "First and last" }
                                    },
                                    {
                                        value: "email",
                                        label: "E-mail*",
                                        type: "text",
                                        props: { placeholder: "User email", disabled: true }
                                    },
                                    {
                                        value: "address",
                                        label: "Address",
                                        type: "text",
                                        meta: "longtext",
                                        props: { placeholder: "Username" }
                                    }
                                ]
                            }
                        ],
                        [
                            {
                                fields: [
                                    {
                                        value: "company",
                                        label: "Organization",
                                        type: "text",
                                        props: { placeholder: "Organization" }
                                    },
                                    {
                                        value: "position",
                                        label: "Position",
                                        type: "text",
                                        props: { placeholder: "Position" }
                                    },
                                    {
                                        value: "phone",
                                        label: "Phone",
                                        type: "text",
                                        props: { placeholder: "+- - - -" }
                                    }
                                ]
                            }
                        ]
                    ]
                })
            },
            getEntity: {
                type: Function,
                default: () => ({
                    name: "Louise J Figueroa",
                    email: "alta1995@gmail.com",
                    phone: "210-605-3044",
                    address: "4033 Morris Street"
                })
            },
            updateEntity: {
                type: Function,
                default: () => {}
            },
            breadcrumbs: {
                type: Array,
                default: () => [{ text: "People", href: "https://www.google.com" }]
            },
            rejectButtonText: {
                default: text("Reject Button Text", "Discard")
            },
            acceptButtonIcon: {
                default: text("Accept Button Icon", "save")
            }
        },
        template: `
            <entity-editor
                v-bind:name="'Person'"
                v-bind:fields="fields"
                v-bind:get-entity="getEntity"
                v-bind:update-entity="updateEntity"
                v-bind:breadcrumbs="breadcrumbs"
                v-bind:form-props="{
                    rejectButtonProps: {
                        text: rejectButtonText,
                        minWidth: 40
                    },
                    acceptButtonProps: {
                        icon: acceptButtonIcon
                    }
                }"
            />
        `
    }));
