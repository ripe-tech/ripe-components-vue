<template>
    <div class="chat">
        <div class="chat-container">
            <div class="box1"></div>
            <div class="box2"></div>
        </div>
        <div class="chat-input-container">
            <div class="chat-input">            
                <textarea-platforme
                v-bind:initialHeight="100"
                v-on:update:value="value => onTextareaValue(value)"
                v-bind:placeholder="'Say something here...'"
                v-bind:resize="false"
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

.chat-container {
    display: flex;
    height: 350px;
}

.box1 {
    background-color: lightcoral;
    flex: 1 0;
}
.box2 {
    background-color: lightgreen;
    width: 250px;
}

.chat-input-container {
    background-color: lightblue;
    width: 100%;
}

.chat-input-container .chat-input {
    padding: 20px 20px 20px 20px;
}

.chat-input-container .chat-input ::v-deep .textarea textarea {
    width: 100%;
}

.chat-input-container .chat-input .chat-options{
    //background-color: lightseagreen;
    margin-top:-31px;
    font-size: 0px;
    padding: 0px 9px 0px 9px
}

.chat-input-container .chat-input .optionExample{
    display: inline-block;
    height: 22px;
    width: 22px;
    background-color: chocolate;
    margin: 4px 4px 4px 4px;
}
</style>

<script>
export const ChatPlatforme = {
    name: "chat-platforme",
    props: {
        helloText: {
            type: String,
            default: null
        }
    },
    methods: {
        onTextareaValue(value) {
            //TODO
            console.log(`Textarea changed: ${value}`);
        }
    }
};

export default ChatPlatforme;
</script>
