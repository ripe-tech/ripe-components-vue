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
                v-bind:send-button-props="{ loading: sendingMessage, disabled: sendingMessage }"
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
        },
        sendMessage: {
            type: Function,
            default: message => message
        }
    },
    data: function() {
        return {
            messagesData: this.messages,
            textData: "",
            attachmentsData: [],
            sendingMessage: false
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
        richText() {
            return this.textData.replace(/\n/g, "<br />");
        }
    },
    mounted: function() {
        this.scrollToLastMessage();
    },
    methods: {
        async trySendMessage() {
            if (this.validMessage) return null;

            const message = {
                username: this.username,
                avatarUrl: this.avatarUrl,
                date: Date.now() / 1000,
                messageContent: {
                    text: this.richText,
                    attachments: this.attachmentsData,
                    reactions: []
                }
            };

            let result;
            this.sendingMessage = true;
            try {
                result = await this.sendMessage(message);
            } finally {
                this.sendingMessage = false;
            }

            if (!result) return;

            result = Array.isArray(result) ? result : [];
            this.messagesData.push(...result);
            result.forEach(v => this.$emit("new:message", v));
            this.$emit("update:messages", this.messagesData);

            this.clearMessage();
            this.scrollToLastMessage();

            return result;
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
        async onSendMessageClick() {
            await this.trySendMessage();
        },
        onUploadAreaUpdateFiles(attachments) {
            this.attachmentsData = this.attachmentsData.concat(attachments);
        },
        onTextareaKeydown(event) {
            this.$emit("keydown", event);
        },
        async onTextareaEnter() {
            await this.trySendMessage();
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
