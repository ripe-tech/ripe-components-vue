<template>
    <div class="chat-message">
        <img class="user-image" v-bind:src="userImgPath" />
        <div class="message-container">
            <div class="message-header">
                <div class="user-information">
                    <span class="username">{{ username }}</span>
                    <span class="date">{{ date }}</span>
                </div>
                <div class="line-container">
                    <hr />
                </div>
            </div>
            <div class="message-content">
                <span class="message">{{ message }}</span>
                <div class="links">
                    <link-platforme
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
                    <button-icon-platforme
                        class="reaction"
                        v-bind:icon="reaction.icon"
                        v-bind:size="24"
                        v-for="reaction in reactions"
                        v-bind:key="reaction.icon"
                    />
                </div>
            </div>
        </div>
        <div class="options-container">
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
    margin: 4px 0px 0px 0px;
}

.chat-message .message-container .message-header .user-information {
    display: inline-block;
}

.chat-message .message-container .message-header .user-information .username {
    color: #0d0d0d;
    font-weight: bold;
    letter-spacing: 0.7px;
}

.chat-message .message-container .message-header .user-information .date {
    color: #a4adb5;
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
    margin-top: 6px;
}

.chat-message .message-container .message-content .links .link {
    display: table;
}

.chat-message .message-container .message-content .reactions {
    font-size: 0px; //It fixes white spaces between divs
    margin: 10px 0px 0px 0px;
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
export const ChatMessagePlatforme = {
    name: "chat-message-platforme",
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
            type: String,
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
export default ChatMessagePlatforme;
</script>
