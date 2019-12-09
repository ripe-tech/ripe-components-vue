<template>
    <div class="chat">
        <p> {{ helloText }} </p>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";


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
