<template>
    <div class="chat">
        <upload-area
            v-bind:files="attachmentsData"
            v-on:update:files="value => onUpdateAttachmentsData(value)"
        >
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
                <attachments v-bind:attachments="allAttachments" v-bind:height="306" />
            </div>
            <div class="chat-input-container" v-on:keydown.enter.exact.prevent="onEnter()">
                <rich-textarea
                    v-bind:value.sync="textData"
                    v-bind:attachments="attachmentsData"
                    v-bind:placeholder="'Say something here...'"
                    v-bind:resize="false"
                    v-on:update:attachments="value => onUpdateAttachmentsData(value)"
                />
                <button-color
                    class="send-button"
                    v-bind:text="'Send message'"
                    v-on:click="onSendMessageClick()"
                    v-bind:small="true"
                    v-bind:icon="'send'"
                    v-bind:alignment="'center'"
                />
            </div>
        </upload-area>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.chat .upload-area {
    transition: opacity 0.125s ease-in;
}

.chat .upload-area.dragging {
    opacity: 0.3;
}

.chat .chat-container {
    display: flex;
    height: 350px;
}

.chat .chat-messages-container {
    background-color: $grey-6;
    flex: 1 0;
    overflow: auto;
}

.chat .chat-messages-container .chat-message:not(:first-child) {
    margin: 20px 0px 0px 0px;
}

.chat .attachments {
    display: block;
    width: 250px;
}

body.tablet .attachments,
body.mobile .attachments {
    display: none;
}

.chat .chat-input-container {
    background-color: $grey-6;
    overflow: hidden;
}

.chat .chat-input-container .rich-textarea {
    display: block;
    margin: 20px 20px 0px 20px;
    width: auto;
}

.chat .chat-input-container .send-button {
    float: right;
    margin: 16px 20px 16px 16px;
}

.chat .upload-area.dragging .chat-input-container .rich-textarea {
    pointer-events: none;
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
            textData: "",
            attachmentsData: []
        };
    },
    watch: {
        messages(value) {
            this.messagesData = value;
        }
    },
    computed: {
        allAttachments() {
            return this.messages.map(message => message.messageContent.attachments).flat();
        },
        validMessage() {
            return !(this.textData.trim() || this.attachmentsData.length);
        },
        normalizedAttachments() {
            return this.attachmentsData.map(attachment => ({
                name: attachment.name,
                path: ""
            }));
        }
    },
    methods: {
        sendMessage() {
            if (this.validMessage) return;

            this.messagesData.push({
                username: this.username,
                avatarUrl: this.avatarUrl,
                date: Date.now() / 1000,
                messageContent: {
                    text: this.textData,
                    attachments: this.normalizedAttachments,
                    reactions: []
                }
            });

            this.$emit("new:message", {
                messageText: this.textData,
                attachments: this.attachmentsData
            });
            this.$emit("update:messages", this.messagesData);

            this.clearMessage();
            this.scrollToLastMessage();
        },
        clearMessage() {
            this.textData = "";
            this.attachmentsData = [];
        },
        scrollToLastMessage() {
            this.$nextTick(() => {
                const messagesContainer = this.$refs["chat-messages"];
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            });
        },
        onSendMessageClick() {
            this.sendMessage();
        },
        onEnter() {
            this.sendMessage();
        },
        onUpdateAttachmentsData(attachments) {
            this.attachmentsData = this.attachmentsData.concat(attachments);
        }
    }
};

export default Chat;
</script>
