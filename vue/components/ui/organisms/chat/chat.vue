<template>
    <div class="chat">
        <div class="chat-container">
            <div class="chat-messages-container">
                <chat-message
                    v-bind:username="message.username"
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
        <div class="chat-input-container">
            <rich-textarea
                v-bind:value="message.text"
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

.chat-files-container {
    width: 250px;
}

.chat-input-container {
    background-color: $grey-6;
    overflow: hidden;
}

.chat-input-container .rich-textarea {
    margin: 20px 20px 0px 20px;
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
        messages: {
            type: Array,
            default: () => []
        }
    },
    data: function() {
        return {
            message: {
                text: null,
                attachments: []
            }
        };
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
        sendMessage() {
            // TODO
            console.log("Message sent");
            console.log(this.message);
        },
        onTextareaValue(value) {
            // TODO
            this.message.text = value;
            console.log(`Textarea changed: ${this.message.text}`);
        },
        onSendMessageClick() {
            this.sendMessage();
        }
    }
};

export default Chat;
</script>
