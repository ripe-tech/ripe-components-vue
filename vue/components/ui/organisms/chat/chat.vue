<template>
    <div class="chat">
        <div class="chat-container">
            <div class="chat-messages-container" ref="chat-messages">
                <chat-message
                    v-bind:username="message.username"
                    v-bind:avatar="message.avatarUrl"
                    v-bind:date="message.date"
                    v-bind:message="message.messageContent.text"
                    v-bind:attachments="message.messageContent.attachments"
                    v-bind:reactions="message.messageContent.reactions"
                    v-for="(message, index) in messages"
                    v-bind:key="index"
                />
            </div>

            <div class="chat-files-container">
                <attachments v-bind:attachments="allAttachments" v-bind:height="306" />
            </div>
        </div>
        <div class="chat-input-container" v-on:keyup.enter.exact="onEnter()">
            <rich-textarea
                v-bind:value="message.messageContent.text"
                v-bind:attachments.sync="message.messageContent.attachments"
                v-bind:placeholder="'Say something here...'"
                v-bind:resize="false"
                v-on:update:value="value => onTextareaValue(value)"
            />
            <button-color
                class="send-button"
                v-bind:text="'Send message'"
                v-on:click="onSendMessageClick()"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.chat {
    border: solid 2px #e4e8f0;
}

.chat-container {
    display: flex;
    height: 350px;
}

.chat-messages-container {
    background-color: $grey-6;
    flex: 1 0;
    overflow: auto;
}

.chat-messages-container .chat-message:not(:first-child) {
    margin: 20px 0px 0px 0px;
}

body.desktop-device .chat-files-container {
    display: block;
    width: 250px;
}

body.tablet-device .chat-files-container,
body.mobile-device .chat-files-container {
    display: none;
}

.chat-input-container {
    background-color: $grey-6;
    overflow: hidden;
}

.chat-input-container .rich-textarea {
    display: block;
    margin: 20px 20px 0px 20px;
    width: auto;
}

.chat-input-container .send-button {
    float: right;
    margin: 16px 20px 16px 16px;
}
</style>

<script>
export const Chat = {
    name: "chat",
    props: {
        avatarUrl: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        messages: {
            type: Array,
            default: () => []
        }
    },
    data: function() {
        return {
            messagesData: this.messages,
            message: {
                avatarUrl: this.avatarUrl,
                username: this.username,
                date: Date.now(),
                messageContent: {
                    text: null,
                    attachments: [],
                    reactions: []
                }
            }
        };
    },
    watch: {
        messages(value) {
            this.messagesData = value;
        }
    },
    computed: {
        allAttachments() {
            const allAttachments = [];
            this.messages.forEach(message =>
                Array.prototype.push.apply(allAttachments, message.messageContent.attachments)
            );

            return allAttachments;
        },
        normalizedTextareaText() {
            return this.message.messageContent.text
                ? this.message.messageContent.text.trim()
                : null;
        }
    },
    methods: {
        emitUpdateMessages(value) {
            this.$emit("update:messages", value);
        },
        sendMessage() {
            if (!this.normalizedTextareaText) return;

            this.$emit("send-message", this.message);

            // this.messagesData.push(JSON.parse(JSON.stringify(this.message)));
            // this.emitUpdateMessages(this.messagesData);
            // this.clearTextarea();
            // this.$nextTick(() => this.scrollToLastMessage());
        },
        clearTextarea() {
            this.message.messageContent.text = "";
        },
        scrollToLastMessage() {
            const messagesContainerElement = this.$refs["chat-messages"];
            messagesContainerElement.scrollTop = messagesContainerElement.scrollHeight;
        },
        onTextareaValue(value) {
            this.message.messageContent.text = value;
        },
        onSendMessageClick() {
            this.sendMessage();
        },
        onEnter() {
            this.sendMessage();
        }
    }
};

export default Chat;
</script>
