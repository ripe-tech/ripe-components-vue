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
            reactions: {
                // TODO change -> this will be replaced by what Daniel is doing
                type: Array,
                default: () => [
                    { icon: "chart", imgUrl: null, emoji: null, count: 3, userHasReacted: false },
                    {
                        icon: null,
                        imgUrl:
                            "https://a.slack-edge.com/production-standard-emoji-assets/10.2/apple-large/1f4aa@2x.png",
                        emoji: null,
                        count: 0,
                        userHasReacted: false
                    },
                    { icon: null, imgUrl: null, emoji: "😱", count: 6, userHasReacted: false },
                    { icon: null, imgUrl: null, emoji: null, count: 2, userHasReacted: false }
                ]
            }
        },
        data: function() {
            return {
                reactionOptionCounter: 0,
                moreOptionsOptionCounter: 0
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
                    v-on:option-clicked="value => onOptionClick(value)"
                />
                <div>
                    <p>Reaction Option event count: {{ reactionOptionCounter }}</p>
                    <p>More Options Option event count: {{ moreOptionsOptionCounter }}</p>
                </div>
            </div>
            `
    }));
