<template>
    <div class="chat-message">
        <img class="user-image" v-bind:src="userImgPath" />
        <div class="message-container">
            <div class="message-header">
                <div class="user-information">
                    <span class="username">{{ username }}</span>
                    <span class="date">{{ timeString(date) }}</span>
                </div>
                <div class="line-container" v-if="hasReactionOptions">
                    <hr />
                </div>
            </div>
            <div class="message-content">
                <span class="message">{{ message }}</span>
                <div class="links">
                    <link-ripe
                        v-bind:text="attachment.name"
                        v-bind:href="attachment.path"
                        v-bind:disabled="false"
                        v-bind:size="'small'"
                        v-bind:color="'blue'"
                        v-for="attachment in attachments"
                        v-bind:key="attachment.name"
                    />
                </div>
                <div class="reactions">
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
        <div class="options-container" v-if="hasReactionOptions">
            <div class="reaction-option" v-on:click="onReactionOptionClick('reactionOption')" />
            <div class="more-options-option" v-on:click="onMoreOptionsOptionClick('moreOptions')" />
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
    display: inline-block;
    flex: 1;
}

.chat-message .message-container .message-header {
    display: flex;
    margin: 3px 0px 0px 0px;
}

.chat-message .message-container .message-header .user-information {
    display: inline-block;
}

.chat-message .message-container .message-header .user-information .username {
    color: #0d0d0d;
    font-weight: bold;
    letter-spacing: 0.7px;
    padding: 0px 6px 0px 0px;
}

.chat-message .message-container .message-header .user-information .date {
    color: #a4adb5;
    font-size: 12px;
    letter-spacing: 0.3px;
}

.chat-message .message-container .message-header .line-container {
    flex: 1 0;
    margin: 2px 0px 0px 20px;
    visibility: hidden;
}

.chat-message .message-container .message-header .line-container hr {
    border: solid 1px #e4e8f0;
}

.chat-message .message-container .message-content .message {
    color: #0d0d0d;
    letter-spacing: 0.3px;
}

.chat-message .message-container .message-content .links {
    margin: 6px 0px 0px 0px;
}

.chat-message .message-container .message-content .links .link {
    display: table;
}

.chat-message .message-container .message-content .reactions {
    font-size: 0px; //It fixes white spaces between divs
    margin: 10px 0px 0px 0px;
}

.chat-message .message-container .message-content .reactions > .reaction {
    margin: 0px 2px 0px 0px;
}

.chat-message .options-container {
    background-color: $grey-6;
    border: solid 1px #e4e8f0;
    border-radius: 6px;
    display: inline-flex;
    font-size: 0px;
    height: 26px;
    padding: 2px 2px 2px 2px;
    visibility: hidden;
}

.chat-message .options-container .reaction-option,
.chat-message .options-container .more-options-option {
    cursor: pointer;
    height: 24px;
    opacity: 0.4;
    width: 30px;
}

.chat-message .options-container .reaction-option {
    background: url("~./assets/happy-face.svg") center no-repeat;
    background-size: 18px 18px;
    border-right: solid 1px #e4e8f0;
}

.chat-message .options-container .more-options-option {
    background: url("~./assets/ellypsis.svg") center no-repeat;
    background-size: 18px 18px;
    border-left: solid 1px #e4e8f0;
}

.chat-message:hover,
.chat-message:hover .options-container,
.chat-message:hover .message-container .message-header .line-container {
    background-color: $white;
    visibility: visible;
}

.chat-message .options-container .reaction-option:hover,
.chat-message .options-container .more-options-option:hover {
    opacity: 1;
}

.chat-message .options-container:hover {
    border: solid 3px #e4e8f0;
    padding: 0px 0px 0px 0px;
}
</style>

<script>
import { utilsMixin } from "../../../../mixins";

export const ChatMessage = {
    name: "chat-message",
    mixins: [utilsMixin],
    props: {
        userImgPath: {
            // TODO remove -> this will be replaced by avatar
            type: String,
            default: "http://i.pravatar.cc"
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
        hasReactionOptions: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        emitOptionClick(option) {
            this.$emit("option-clicked", option);
        },
        onReactionOptionClick(option) {
            this.emitOptionClick(option);
        },
        onMoreOptionsOptionClick(option) {
            this.emitOptionClick(option);
        }
    }
};
export default ChatMessage;
</script>
