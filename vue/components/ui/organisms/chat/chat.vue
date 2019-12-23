<template>
    <div class="chat">
        <div class="chat-container">
            <div class="chat-messages-container" ref="chat-messages">
                <chat-message
                    v-bind:username="message.username"
                    v-bind:avatarUrl="message.avatarUrl"
                    v-bind:date="message.date"
                    v-bind:message="message.messageContent.text"
                    v-bind:attachments="message.messageContent.attachments"
                    v-bind:reactions="message.messageContent.reactions"
                    v-for="message in messages"
                    v-bind:key="message.username"
                />
            </div>

            <div class="chat-files-container">
                <attachments-list v-bind:attachments="allAttachments" v-bind:height="306" />
            </div>
        </div>
        <div class="chat-input-container"
            v-on:keyup.enter.exact="onEnter()"
            >
            <rich-textarea
                v-bind:value="message.messageContent.text"
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
    width: 250px;
    display: block;
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
        }
    },
    methods: {
        emitUpdateMessages(value) {
            this.$emit("update:messages", value);
        },
        sendMessage() {
            if(!this.message.messageContent.text) return;

            this.messagesData.push(this.message);
            this.emitUpdateMessages(this.messagesData);
            this.clearTextarea();
            this.showLastMessage();
        },
        clearTextarea()
        {
            this.message.messageContent.text = "";
        },
        showLastMessage()
        {
            const messagesContainerElement = this.$refs["chat-messages"];
            messagesContainerElement.scrollTop = messagesContainerElement.scrollHeight;
        },
        onTextareaValue(value) {
            this.message.messageContent.text = value;
        },
        onSendMessageClick() {
            this.sendMessage();
        },
        onEnter()
        {
            this.sendMessage();
        }
    }
};

export default Chat;
</script>
