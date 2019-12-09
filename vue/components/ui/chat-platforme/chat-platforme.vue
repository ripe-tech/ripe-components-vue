<template>
    <div class="chat">
        <div class="chat-container">
            <div class="chat-messages-container">
                <p>awhawhawhawh</p>
                <p>awgwhhwahah</p>
                <p>awgagwagw</p>
                <p>afwaf</p>
                <p>awgawg</p>
                <p>eeeegwagawgeeee</p>
                <p>awhawhawh</p>
                <p>awhawhwahawhah</p>
                <p>ahawhawh</p>
                <p>eaue4u4eie4i</p>
                <p>awhasgejrse</p>
                <p>ue4ujes5j5rk</p>
                <p>e5k5erieie</p>
                <p>se5is5eisei</p>
            </div>
            <div class="chat-files-container">
                <div class="files-title">
                    Files
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

.chat-messages-container {
    background-color: lightcoral;
    flex: 1 0;
    overflow: auto;
}
.chat-files-container {
    background-color: lightgreen;
    width: 250px;
}

.chat-files-container .files-title{
    height: 42px;
    background-color: rgb(220, 255, 220);
}

.chat-files-container .files-list{
    height: 308px;
    overflow: auto;
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
