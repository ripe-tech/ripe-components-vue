import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Chat Message", () => ({
        props: {
            username: {
                default: text("Username", "Username")
            },
            avatar: {
                default: text("Avatar", "http://i.pravatar.cc")
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
                type: Array,
                default: () => [
                    {
                        id: "thumbsup",
                        emoji: "👍",
                        count: 0,
                        userHasReacted: false
                    },
                    {
                        id: "thumbsdown",
                        emoji: "👎",
                        count: 3,
                        userHasReacted: true
                    }
                ]
            }
        },
        data: function() {
            return {
                reactionsData: this.reactions
            };
        },
        template: `
            <div>
                <chat-message
                    v-bind:username="username"
                    v-bind:avatar="avatar"
                    v-bind:date="date"
                    v-bind:message="message"
                    v-bind:attachments="attachments"
                    v-bind:reactions.sync="reactionsData"
                />
                <div>
                    <p>Thumb up reaction count: {{ this.reactionsData[0].count }}</p>
                    <p>Thumb down reaction count: {{ this.reactionsData[1].count }}</p>
                </div>
            </div>
            `
    }));
