import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Form", () => ({
        props: {
            title: {
                type: String,
                default: text("Title", "My form")
            },
            items: {
                type: Object,
                default: () => ({
                    "General Info": [
                        [
                            {
                                title: "Column #1 Section #1",
                                fields: [
                                    {
                                        value: "username",
                                        type: "string"
                                    },
                                    {
                                        value: "email",
                                        type: "email"
                                    }
                                ]
                            },
                            {
                                title: "Column #1 Section #2",
                                fields: [
                                    {
                                        value: "username2",
                                        type: "string"
                                    },
                                    {
                                        value: "email2",
                                        type: "email"
                                    }
                                ]
                            }
                        ],
                        [
                            {
                                title: "Column #2 Section #1",
                                fields: [
                                    {
                                        value: "username3",
                                        type: "string"
                                    },
                                    {
                                        value: "email3",
                                        type: "email"
                                    }
                                ]
                            }
                        ]
                    ],
                    "Personal Details": [
                        [
                            {
                                title: "Column #1",
                                fields: [
                                    {
                                        value: "age",
                                        type: "number"
                                    }
                                ]
                            }
                        ],
                        [
                            {
                                title: "Column #2",
                                fields: [
                                    {
                                        value: "age2",
                                        type: "number"
                                    }
                                ]
                            }
                        ]
                    ]
                })
            }
        },
        data: function() {
            return {
                valuesData: {
                    username: "My username",
                    email: "a@a.pt",
                    username2: "My username 2",
                    email2: "b@b.pt",
                    username3: "My username 3",
                    email3: "c@c.pt",
                    age: 1,
                    age2: 2
                }
            };
        },
        methods: {
            async onDelete() {
                await this._sleep();
            },
            async onSave() {
                await this._sleep();
            },
            async _sleep(time = 500) {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, time);
                });
            }
        },
        template: `
            <div>
                <global />
                <form-ripe
                    v-bind:title="title"
                    v-bind:items="items"
                    v-bind:values.sync="valuesData"
                    v-bind:on-delete="onDelete"
                    v-bind:on-save="onSave"
                />
                <p>{{ valuesData }}</p>
            </div>
        `
    }));
