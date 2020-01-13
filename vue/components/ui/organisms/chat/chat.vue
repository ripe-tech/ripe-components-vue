<template>
    <div class="chat">
        <upload-area v-on:update:files="value => onUploadAreaUpdateFiles(value)">
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
                <attachments v-bind:attachments="allAttachments" />
            </div>
            <div class="chat-input-container" v-on:keydown.enter.exact.prevent="onEnter()">
                <rich-textarea
                    v-bind:value.sync="textData"
                    v-bind:attachments.sync="attachmentsData"
                    v-bind:send-button-disabled="!validMessage"
                    v-bind:placeholder="'Say something here...'"
                    v-bind:resize="false"
                    v-on:focus:textarea="onTextareaFocus"
                    v-on:blur:textarea="onTextareaBlur"
                    v-on:click:send-message="onSendMessageClick()"
                />
            </div>
        </upload-area>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.chat .upload-area {
    background-color: $grey-6;
    box-sizing: border-box;
    padding: 20px 20px 20px 20px;
    transition: opacity 0.125s ease-in;
}

.chat .upload-area.dragging {
    opacity: 0.3;
}

.chat .upload-area .chat-container {
    display: flex;
    max-height: 350px;
}

.chat .upload-area .chat-container .chat-messages-container {
    flex: 1 0;
    overflow: auto;
}

.chat .upload-area .chat-container .chat-messages-container .chat-message {
    margin: 0px 0px 0px 20px;
}

.chat .upload-area .chat-container .chat-messages-container .chat-message:not(:first-child) {
    margin: 20px 0px 0px 20px;
}

.chat .upload-area .chat-container .attachments {
    display: block;
    width: 250px;
}

body.tablet .chat .upload-area .chat-container .attachments,
body.mobile .chat .upload-area .chat-container .attachments {
    display: none;
}

.chat .upload-area .chat-input-container {
    overflow: hidden;
}

.chat .upload-area .chat-input-container .rich-textarea {
    display: block;
    margin-top: 20px;
    width: auto;
}

.chat .upload-area.dragging .chat-input-container .rich-textarea {
    pointer-events: none;
}

.chat .upload-area .chat-input-container .send-button {
    float: right;
    margin-top: 16px;
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
        },
        richText() {
            return this.textData.replace(/\n/g, "<br>");
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
                    text: this.richText,
                    attachments: this.normalizedAttachments,
                    reactions: []
                }
            });

            this.$emit("new:message", {
                messageText: this.richText,
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
        onUploadAreaUpdateFiles(attachments) {
            this.attachmentsData = this.attachmentsData.concat(attachments);
        },
        onTextareaFocus() {
            this.$emit("focus:textarea");
        },
        onTextareaBlur() {
            this.$emit("blur:textarea");
        }
    }
};

export default Chat;
</script>
