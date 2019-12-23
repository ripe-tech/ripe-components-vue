import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Chat", () => ({
        props: {
            username: {
                type: String,
                default: text("Username", "TestingUsername")
            },
            messages: {
                type: Array,
                default: () => [
                    {
                        username: "NFSS10",
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
                            reactions: [{ icon: "thumb-up" }, { icon: "happy-face" }]
                        }
                    },
                    {
                        username: "3rdvision",
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
                        date: 1574950742823,
                        messageContent: {
                            text:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in tristique dui. Praesent a lectus non libero facilisis tincidunt ut.",
                            attachments: [],
                            reactions: [{ icon: "thumb-up" }]
                        }
                    },
                    {
                        username: "Benedito0",
                        date: 1574990742823,
                        messageContent: {
                            text: "Lorem ipsum dolor sit.",
                            attachments: [],
                            reactions: []
                        }
                    },
                    {
                        username: "blazeque",
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
        watch: {
            messages(value) {
                this.messagesData = value;
            }
        },
        template: `
            <div>
                <global />
                <chat 
                    v-bind:username="username"
                    v-bind:messages.sync="messagesData"
                 />
                 <div>
                    <p v-for="(message, index) in messagesData">
                        {{ index }} <br>
                        {{ message.username }} {{ message.date }} <br>
                        {{ message.messageContent.text }} <br>
                        Attachments Length: {{ message.messageContent.attachments.length }}  Reactions Length: {{ message.messageContent.reactions.length }}
                    </p>
                 </div>
            </div>
            `
    }));
