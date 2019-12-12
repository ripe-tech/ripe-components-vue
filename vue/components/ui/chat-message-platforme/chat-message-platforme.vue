<template>
    <h1>{{ hello }}</h1>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
</style>

<script>
export const ChatMessagePlatforme = {
    name: "chat-message-platforme",
    props: {
        hello: {
            type: String,
            default: null
        }
    }
};
export default ChatMessagePlatforme;
</script> 