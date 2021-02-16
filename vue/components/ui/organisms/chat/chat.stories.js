import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Organisms/Chat", module)
    .addDecorator(withKnobs)
    .add("Chat", () => ({
        props: {
            avatarUrl: {
                type: String,
                default: text(
                    "Avatar Url",
                    "https://id.platforme.com/admin/accounts/ns%40platforme.com/avatar"
                )
            },
            username: {
                type: String,
                default: text("Username", "NFSS10")
            },
            messages: {
                type: Array,
                default: () => [
                    {
                        username: "NFSS10",
                        avatarUrl:
                            "https://id.platforme.com/admin/accounts/ns%40platforme.com/avatar",
                        date: 1574950742823,
                        messageContent: {
                            text:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et lacus ac arcu ullamcorper condimentum.",
                            attachments: [
                                {
                                    name: "lorem-ipsum.pdf",
                                    path:
                                        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                },
                                {
                                    name: "lorem-ipsum2.pdf",
                                    path:
                                        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                }
                            ],
                            reactions: [
                                {
                                    id: "thumbsup",
                                    emoji: "👍",
                                    count: 2
                                },
                                {
                                    id: "alien",
                                    emoji: "👽",
                                    count: 5
                                },
                                {
                                    id: "smile",
                                    emoji: "😀",
                                    count: 2
                                }
                            ]
                        }
                    },
                    {
                        username: "3rdvision",
                        avatarUrl:
                            "https://id.platforme.com/admin/accounts/v-da%40platforme.com/avatar",
                        date: 1574950742823,
                        messageContent: {
                            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                            attachments: [
                                {
                                    name: "randomscreenshot.jpeg",
                                    path: "https://cdn.platforme.com/images/platforme.square.png"
                                }
                            ],
                            reactions: []
                        }
                    },
                    {
                        username: "BeeMargarida",
                        avatarUrl:
                            "https://id.platforme.com/admin/accounts/t-ms%40platforme.com/avatar",
                        date: 1574950742823,
                        messageContent: {
                            text:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in tristique dui. Praesent a lectus non libero facilisis tincidunt ut.",
                            attachments: [],
                            reactions: [
                                {
                                    id: "thumbsup",
                                    emoji: "👍",
                                    count: 2
                                }
                            ]
                        }
                    },
                    {
                        username: "Benedito0",
                        avatarUrl:
                            "https://id.platforme.com/admin/accounts/v-mb%40platforme.com/avatar",
                        date: 1574990742823,
                        messageContent: {
                            text: "Lorem ipsum dolor sit.",
                            attachments: [],
                            reactions: []
                        }
                    },
                    {
                        username: "blazeque",
                        avatarUrl:
                            "https://id.platforme.com/admin/accounts/v-db%40platforme.com/avatar",
                        date: 1575950742823,
                        messageContent: {
                            text:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis nisi massa. Pellentesque consequat tortor vitae enim porta tempor. Quisque eu enim at leo semper luctus. Donec vitae hendrerit justo. Nulla facilisi. Aenean mollis vehicula.",
                            attachments: [],
                            reactions: []
                        }
                    }
                ]
            }
        },
        data: function() {
            return {
                messagesData: this.messages
            };
        },
        template: `
            <div>
                <global />
                <chat
                    v-bind:avatar-url="avatarUrl"
                    v-bind:username="username"
                    v-bind:messages.sync="messagesData"
                 />
                 <div>
                    <p v-for="(message, index) in messagesData">
                        {{ index }} <br />
                        {{ message.avatarUrl }}
                        {{ message.username }} {{ message.date }} <br />
                        {{ message.messageContent.text }} <br />
                        Attachments Length: {{ message.messageContent.attachments.length }}  Reactions Length: {{ message.messageContent.reactions.length }}
                    </p>
                 </div>
            </div>
            `
    }));
