import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Chat Message", () => ({
        props: {
            username: {
                default: text("Username", "Username")
            },
            date: {
                default: number("Date", 1576840199)
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
                    imgUrl:
                        "https://cdn3.iconfinder.com/data/icons/pictomisc/100/happyface-512.png",
                    count: 0,
                    userHasReacted: false,
                    behavior: false
                }
            },
            reactions: {
                type: Array,
                default: () => [
                    {
                        emoji: "👍",
                        count: 3,
                        userHasReacted: false
                    }
                ]
            }
        },
        data: function() {
            return {
                reactionOptionCounter: 0,
                moreOptionsOptionCounter: 0,
                reactionsData: this.reactions
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
                    v-bind:reactions="reactionsData"
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
