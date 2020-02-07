<template>
    <div class="chat">
        <upload-area v-on:update:files="onUploadAreaUpdateFiles">
            <div class="chat-container" v-if="messages && messages.length > 0">
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
                <attachments
                    v-bind:attachments="allAttachments"
                    v-if="allAttachments && allAttachments.length > 0"
                />
            </div>
            <rich-textarea
                v-bind:value.sync="textData"
                v-bind:attachments.sync="attachmentsData"
                v-bind:send-button-disabled="validMessage"
                v-bind:placeholder="'Say something here...'"
                v-bind:resize="true"
                v-on:focus:textarea="onTextareaFocus"
                v-on:blur:textarea="onTextareaBlur"
                v-on:click:send-message="onSendMessageClick"
                v-on:keydown="onTextareaKeydown"
                v-on:keydown.enter.exact.prevent="onTextareaEnter"
            />
        </upload-area>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.chat > .upload-area {
    box-sizing: border-box;
    padding: 20px 20px 20px 20px;
    transition: opacity 0.125s ease-in;
}

.chat > .upload-area.dragging {
    opacity: 0.3;
}

.chat > .upload-area > .chat-container {
    display: flex;
    max-height: 350px;
}

.chat > .upload-area > .chat-container > .chat-messages-container {
    flex: 1 0;
    margin-bottom: 20px;
    overflow: auto;
}

.chat > .upload-area > .chat-container > .chat-messages-container .chat-message {
    margin-top: 20px;
}

.chat > .upload-area > .chat-container > .chat-messages-container .chat-message:first-child {
    margin-top: 0px;
}

.chat > .upload-area > .chat-container > .attachments {
    display: block;
    width: 250px;
}

body.tablet .chat > .upload-area > .chat-container > .attachments,
body.mobile .chat > .upload-area > .chat-container > .attachments {
    display: none;
}

.chat > .upload-area > .rich-textarea {
    display: block;
    width: auto;
}

.chat > .upload-area.dragging > .rich-textarea {
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
        normalizedAttachments() {
            return this.attachmentsData.map(attachment => ({
                name: attachment.name,
                path: ""
            }));
        },
        validMessage() {
            return !(this.textData.trim() || this.attachmentsData.length);
        },
        richText() {
            return this.textData.replace(/\n/g, "<br />");
        }
    },
    mounted: function() {
        this.scrollToLastMessage();
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
                if (!messagesContainer) return;
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            });
        },
        onSendMessageClick() {
            this.sendMessage();
        },
        onUploadAreaUpdateFiles(attachments) {
            this.attachmentsData = this.attachmentsData.concat(attachments);
        },
        onTextareaKeydown(event) {
            this.$emit("keydown", event);
        },
        onTextareaEnter() {
            this.sendMessage();
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
