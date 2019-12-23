import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Chat", () => ({
        props: {
            messages: {
                type: Array,
                default: () => [
                    {
                        username: "NFSS10",
                        date: "Nov 28",
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
                        date: "Nov 28",
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
                        date: "Nov 28",
                        messageContent: {
                            text:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in tristique dui. Praesent a lectus non libero facilisis tincidunt ut.",
                            attachments: [],
                            reactions: [{ icon: "thumb-up" }]
                        }
                    },
                    {
                        username: "Benedito0",
                        date: "Nov 29",
                        messageContent: {
                            text: "Lorem ipsum dolor sit.",
                            attachments: [],
                            reactions: []
                        }
                    },
                    {
                        username: "blazeque",
                        date: "Nov 30",
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
                lastSentMessage: null,
                sentMessageCount: 0
            };
        },
        methods: {
            onMessageSent(message) {
                this.lastSentMessage = message;
                this.sentMessageCount++;
            }
        },
        template: `
            <div>
                <global />
                <chat 
                    v-bind:messages="messages"
                    v-on:messageSent="value => onMessageSent(value)"
                 />
                 <div>
                    <p>Sent Messages count: {{ sentMessageCount }}</p>
                    <p>Last Message: {{ lastSentMessage }}</p>
                 </div>
            </div>
            `
    }));
