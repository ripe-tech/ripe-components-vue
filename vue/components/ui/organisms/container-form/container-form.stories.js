import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Organisms/Container Form", module)
    .addDecorator(withKnobs)
    .add("Container Form", () => ({
        props: {
            title: {
                type: String,
                default: text("Title", "My form")
            },
            fields: {
                type: Object,
                default: () => ({
                    "General Info": [
                        [
                            {
                                title: "Column #1 Section #1",
                                fields: [
                                    {
                                        value: "username",
                                        type: "text"
                                    },
                                    {
                                        value: "email",
                                        type: "text",
                                        meta: "email"
                                    }
                                ]
                            },
                            {
                                title: "Column #1 Section #2",
                                fields: [
                                    {
                                        value: "username2",
                                        type: "text"
                                    },
                                    {
                                        value: "email2",
                                        type: "text",
                                        meta: "email"
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
                                        type: "text"
                                    },
                                    {
                                        value: "description",
                                        type: "text",
                                        meta: "long"
                                    },
                                    {
                                        value: "imageUrl",
                                        type: "text",
                                        meta: "image-url"
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
                                        type: "text",
                                        meta: "number"
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
                                        type: "text",
                                        meta: "number"
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
                    age2: 2,
                    description: "",
                    imageUrl: "https://pepethefrogfaith.files.wordpress.com/2016/09/pepe.png?w=640"
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
                <container-form
                    v-bind:title="title"
                    v-bind:fields="fields"
                    v-bind:values.sync="valuesData"
                    v-bind:on-delete="onDelete"
                    v-bind:form-props="{ 'on-save': onSave }"
                />
                <p>{{ valuesData }}</p>
            </div>
        `
    }));
