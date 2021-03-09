import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Organisms/Entity Create", module)
    .addDecorator(withKnobs)
    .add("Entity Create", () => ({
        props: {
            name: {
                default: text("Name", "Person")
            },
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
                                        props: { placeholder: "User email" }
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
            createEntity: {
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
            <div>
                <global />
                <entity-create
                    v-bind:name="name"
                    v-bind:fields="fields"
                    v-bind:create-entity="createEntity"
                    v-bind:breadcrumbs="breadcrumbs"
                    v-bind:form-props="{
                        rejectButtonProps: {
                            text: rejectButtonText
                        },
                        acceptButtonProps: {
                            icon: acceptButtonIcon
                        }
                    }"
                />
            </div>
        `
    }));
