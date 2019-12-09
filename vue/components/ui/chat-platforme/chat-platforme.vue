<template>
    <div class="chat">
        <div class="chat-container">
            <div class="box1"></div>
            <div class="box2"></div>
        </div>
        <div class="chat-input"></div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";


.chat-container
{
    display: flex;
    height: 100px;
}

.box1{
    background-color: lightcoral;
    flex: 1 0;
}
.box2{
    background-color: lightgreen;
    width: 200px;
}

.chat-input{
    background-color: lightblue;
    width: 100%;
    height: 20px;
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
    }
};

export default ChatPlatforme;
</script>
