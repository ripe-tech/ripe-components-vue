import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Chat Message", module)
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
            thumbsUpCount: {
                default: number("Thumbs Up Count", 3)
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
        watch: {
            thumbsUpCount(value) {
                this.reactionsData[0].count = value;
            }
        },
        data: function() {
            this.reactions[0].count = this.thumbsUpCount;
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
                    <p>Thumbs up reaction count: {{ this.reactionsData[0].count }}</p>
                    <p>Thumbs down reaction count: {{ this.reactionsData[1].count }}</p>
                </div>
            </div>
            `
    }));
