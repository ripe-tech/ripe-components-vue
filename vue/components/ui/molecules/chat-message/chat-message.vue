<template>
    <div class="chat-message">
        <avatar class="user-image" v-bind:img-url="avatarUrl" v-bind:size="'tiny'" />
        <div class="message-container">
            <div class="message-header">
                <div class="username">
                    {{ username }}
                </div>
                <div class="date">
                    {{ dateString(date) }}
                </div>
                <div class="time">
                    {{ timeString(date) }}
                </div>
            </div>
            <div class="message-content">
                <div class="message">
                    <span v-html="message" />
                </div>
                <div class="links">
                    <div
                        class="link-container"
                        v-for="attachment in attachments"
                        v-bind:key="attachment.name"
                    >
                        <link-ripe
                            v-bind:text="attachment.name"
                            v-bind:href="attachment.path"
                            v-bind:disabled="false"
                            v-bind:size="'small'"
                            v-bind:color="'blue'"
                        />
                    </div>
                </div>
                <div class="reactions">
                    <reaction
                        v-bind:icon="reaction.icon"
                        v-bind:img-url="reaction.imgUrl"
                        v-bind:emoji="reaction.emoji"
                        v-bind:count.sync="reaction.count"
                        v-bind:user-reacted.sync="reaction.userHasReacted"
                        v-bind:behavior="true"
                        v-for="reaction in mergedReactions"
                        v-bind:key="reaction.id"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.chat-message {
    background-color: $grey-6;
    display: flex;
    padding: 6px 0px 6px 0px;
}

.chat-message .user-image {
    border: solid 1px #e3e8f1;
    border-radius: 50%;
    box-shadow: 0 2px 5px 0 rgba(67, 86, 100, 0.25);
    height: 24px;
    margin: 0px 8px 0px 0px;
    width: 24px;
}

.chat-message .message-container {
    flex: 1 0;
}

.chat-message .message-container .message-header {
    margin: 3px 0px 0px 0px;
}

.chat-message .message-container .message-header .username {
    color: #0d0d0d;
    display: inline-block;
    font-weight: bold;
    letter-spacing: 0.7px;
    padding: 0px 6px 0px 0px;
    vertical-align: bottom;
}

.chat-message .message-container .message-header .date,
.chat-message .message-container .message-header .time {
    color: #a4adb5;
    display: inline-block;
    font-size: 12px;
    letter-spacing: 0.3px;
    vertical-align: bottom;
}

.chat-message .message-container .message-header .time {
    margin-left: 3px;
}

.chat-message .message-container .message-content .message {
    color: #0d0d0d;
    letter-spacing: 0.3px;
    line-height: 18px;
    margin-top: 4px;
}

.chat-message .message-container .message-content .links {
    line-height: 20px;
    margin: 6px 0px 0px 0px;
}

.chat-message .message-container .message-content .reactions {
    font-size: 0px;
    margin-top: 10px;
}

.chat-message .message-container .message-content .reactions > .reaction {
    margin-right: 4px;
}
</style>

<script>
import { utilsMixin } from "../../../../mixins";

export const ChatMessage = {
    name: "chat-message",
    mixins: [utilsMixin],
    props: {
        avatarUrl: {
            type: String,
            default: null
        },
        username: {
            type: String,
            required: true
        },
        date: {
            type: Number,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        attachments: {
            type: Array,
            default: () => []
        },
        reactions: {
            type: Array,
            default: () => []
        },
        defaultReactions: {
            type: Array,
            default: () => [
                {
                    id: "thumbsup",
                    emoji: "👍",
                    count: 0,
                    userHasReacted: false
                }
            ]
        }
    },
    computed: {
        mergedReactions() {
            const existingReactions = this.reactions.map(reaction => reaction.id);
            const missingReactions = this.defaultReactions.filter(
                reaction => !existingReactions.includes(reaction.id)
            );
            return [].concat(this.reactions, missingReactions);
        }
    }
};
export default ChatMessage;
</script>
