<template>
    <div class="chat-message">
        <avatar class="avatar" v-bind:src="avatar" v-bind:size="'small'" />
        <div class="message-container">
            <div class="message-header">
                <div class="username">
                    {{ username }}
                </div>
                <div class="date-time">
                    <div class="date">
                        {{ dateString(date) }}
                    </div>
                    <div class="time">
                        {{ timeString(date, undefined, { seconds: false }) }}
                    </div>
                </div>
            </div>
            <div class="message-content">
                <div class="message">
                    <span v-html="message" />
                </div>
                <div class="links" v-if="attachments && attachments.length > 0">
                    <div
                        class="link-container"
                        v-for="(attachment, index) in attachments"
                        v-bind:key="index"
                    >
                        <link-ripe
                            v-bind:text="attachment.name"
                            v-bind:href="attachment.path"
                            v-bind:disabled="false"
                            v-bind:size="'small'"
                            v-bind:color="'blue'"
                            v-bind:target="'_blank'"
                        />
                    </div>
                </div>
                <div class="reactions" v-if="reactions && reactions.length > 0">
                    <reaction
                        v-bind:icon="reaction.icon"
                        v-bind:img-url="reaction.imgUrl"
                        v-bind:emoji="reaction.emoji"
                        v-bind:count.sync="reaction.count"
                        v-bind:user-reacted.sync="reaction.userHasReacted"
                        v-bind:behavior="true"
                        v-for="reaction in reactions"
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
    display: flex;
}

.chat-message > .avatar {
    margin: 0px 12px 0px 0px;
}

.chat-message > .message-container {
    flex: 1 0;
}

.chat-message > .message-container > .message-header {
    line-height: 18px;
    margin: 0px 0px 10px 0px;
}

.chat-message > .message-container > .message-header > .username {
    color: #0d0d0d;
    display: inline-block;
    font-weight: 600;
    padding: 0px 6px 0px 0px;
    vertical-align: top;
    line-height: 18px;
}

.chat-message > .message-container > .message-header > .date-time {
    font-size: 10px;
    font-weight: 500;
    vertical-align: top;
    line-height: 13px;
    margin-top: 1px;
}

.chat-message > .message-container > .message-header > .date-time > .date,
.chat-message > .message-container > .message-header > .date-time > .time {
    display: inline-block;
}

.chat-message > .message-container > .message-header > .time {
    margin-left: 3px;
}

.chat-message > .message-container > .message-content > .message {
    color: #0d0d0d;
    font-size: 13px;
    line-height: 20px;
    margin-top: 4px;
}

.chat-message > .message-container > .message-content > .links {
    line-height: 20px;
    margin: 6px 0px 0px 0px;
}

.chat-message > .message-container > .message-content > .reactions {
    font-size: 0px;
    margin-top: 10px;
}

.chat-message > .message-container > .message-content > .reactions > .reaction {
    margin-right: 4px;
}
</style>

<script>
import { utilsMixin } from "../../../../mixins";

export const ChatMessage = {
    name: "chat-message",
    mixins: [utilsMixin],
    props: {
        avatar: {
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
            default: () => [
                {
                    id: "thumbsup",
                    emoji: "👍",
                    count: 0,
                    userHasReacted: false
                }
            ]
        }
    }
};
export default ChatMessage;
</script>
