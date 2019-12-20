import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Chat Message", () => ({
        props: {
            username: {
                default: text("Username", "Username")
            },
            date: {
                default: text("Date", "Nov 28")
            },
            message: {
                default: text(
                    "Message",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et lacus ac arcu ullamcorper condimentum."
                )
            },
            attachments: {
                // TODO change -> need to know what data I will receive
                type: Array,
                default: () => [
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
                ]
            },
            addReactionButton: {
                type: Object,
                default: {
                    id: "addEmoji",
                    icon: null,
                    imgUrl:
                        "https://cdn3.iconfinder.com/data/icons/pictomisc/100/happyface-512.png",
                    emoji: null,
                    count: 0,
                    userHasReacted: false,
                    behavior: false
                }
            }
        },
        data: function() {
            return {
                reactionOptionCounter: 0,
                moreOptionsOptionCounter: 0,
                reactions: [
                    {
                        id: "r1",
                        icon: "chart",
                        imgUrl: null,
                        emoji: null,
                        count: 1,
                        userHasReacted: true,
                        behavior: false
                    },
                    {
                        id: "r2",
                        icon: null,
                        imgUrl: null,
                        emoji: "😱",
                        count: 6,
                        userHasReacted: true,
                        behavior: false
                    },
                    {
                        id: "r3",
                        icon: null,
                        imgUrl: null,
                        emoji: "👍",
                        count: 3,
                        userHasReacted: false,
                        behavior: false
                    },
                    {
                        id: "r4",
                        icon: null,
                        imgUrl: null,
                        emoji: "👎",
                        count: 6,
                        userHasReacted: false,
                        behavior: false
                    }
                ]
            };
        },
        methods: {
            onOptionClick(option) {
                switch (option) {
                    case "reactionOption":
                        this.reactionOptionCounter++;
                        break;
                    case "moreOptions":
                        this.moreOptionsOptionCounter++;
                        break;
                    default:
                        break;
                }
            }
        },
        template: `
            <div>
                <chat-message
                    v-bind:username="username"
                    v-bind:date="date"
                    v-bind:message="message"
                    v-bind:attachments="attachments"
                    v-bind:reactions="reactions"
                    v-bind:addReactionButton="addReactionButton"
                    v-on:option-clicked="value => onOptionClick(value)"
                />
                <div>
                    <p>Reaction Option event count: {{ reactionOptionCounter }}</p>
                    <p>More Options Option event count: {{ moreOptionsOptionCounter }}</p>
                </div>
            </div>
            `
    }));
