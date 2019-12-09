<template>
    <div class="chat">
        <div class="chat-container">
            <div class="box1"></div>
            <div class="box2"></div>
        </div>
        <div class="chat-input-container">
            <textarea-platforme

                v-on:update:value="value => onTextareaValue(value)"
                v-bind:placeholder="'placeholder text'"
                v-bind:resize="false"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.chat-container {
    display: flex;
    height: 100px;
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
    height: 100px;
}

.chat-input-container ::v-deep .textarea textarea {
    width: 100%;
    height: 50px;
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
