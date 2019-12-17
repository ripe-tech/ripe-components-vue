<template>
    <div class="chat">
        <div class="chat-container">
            <div class="chat-messages-container">
                <chat-message
                    v-for="message in messages"
                    v-bind:key="message.username"
                    v-bind:username="message.username"
                    v-bind:date="message.date"
                    v-bind:message="message.messageContent.text"
                    v-bind:attachments="message.messageContent.attachments"
                    v-bind:reactions="message.messageContent.reactions"
                />
            </div>

            <div class="chat-files-container">
                <attachments-list v-bind:attachments="allAttachments" />
            </div>
        </div>
        <div class="chat-input-container">
            <div class="chat-input">
                <textarea-ripe
                    v-bind:initial-height="100"
                    v-bind:placeholder="'Say something here...'"
                    v-bind:resize="false"
                    v-on:update:value="value => onTextareaValue(value)"
                />
                <div class="chat-options">
                    <div class="optionExample" />
                    <div class="optionExample" />
                    <div class="optionExample" />
                    <div class="optionExample" />
                    <div class="optionExample" />
                </div>
            </div>
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
    background-color: $grey-6;
    width: 250px;
}


.chat-input-container {
    background-color: $grey-6;
    width: 100%;
}

.chat-input-container .chat-input {
    border-top: solid 2px #e4e8f0;
    padding: 20px 20px 20px 20px;
}

.chat-input-container .chat-input ::v-deep .textarea {
    width: 100%;
}

.chat-input-container .chat-input .chat-options {
    font-size: 0px; //It fixes white spaces between divs
    //background-color: lightseagreen;
    margin-top: -31px;
    padding: 0px 9px 0px 9px;
}

.chat-input-container .chat-input .optionExample {
    background: url("~./assets/clip.svg") center;
    background-size: 22px 22px;
    display: inline-block;
    height: 22px;
    margin: 4px 4px 4px 4px;
    width: 22px;
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
    computed: {
        allAttachments() {
            let allAttachments = [];
            this.messages.forEach(message =>
                Array.prototype.push.apply(allAttachments, message.messageContent.attachments)
            );

            return allAttachments;
        }
    },
    methods: {
        onTextareaValue(value) {
            // TODO
            console.log(`Textarea changed: ${value}`);
        }
    }
};

export default Chat;
</script>