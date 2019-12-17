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
                <div class="files-title">
                    <span>Files</span>
                </div>
                <div class="files-list">
                    <p>File 1</p>
                    <p>File 2</p>
                    <p>File 3</p>
                    <p>File 4</p>
                    <p>File 5</p>
                    <p>File 6</p>
                    <p>File 7</p>
                    <p>File 8</p>
                    <p>File 9</p>
                    <p>File 10</p>
                    <p>File 11</p>
                    <p>File 12</p>
                    <p>File 13</p>
                    <p>File 14</p>
                    <p>File 15</p>
                </div>
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

.chat-files-container .files-title {
    border: solid 1px #e4e8f0;
    height: 42px;
}

.chat-files-container .files-title span {
    background-color: $white;
    color: $light-black;
    display: block;
    font-weight: bold;
    letter-spacing: 0.7px;
    line-height: 42px;
    margin: 0px 20px 0px 20px;
}

.chat-files-container .files-list {
    height: 308px;
    overflow: auto;
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
            type: String,
            default: null
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