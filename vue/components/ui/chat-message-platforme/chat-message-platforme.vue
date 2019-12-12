<template>
    <div class="chat-message">
        <img class="user-image" v-bind:src="userImgPath" />
        <div class="message-container">
            <div class="user-information">
                <span class="username">{{ username }}</span>
                <span class="date">{{ date }}</span>
            </div>
            <div class="message-content">
                <span class="message">{{ message }}</span>
                <div class="links">
                    <link-platforme 
                        v-for="attachment in attachments" v-bind:key="attachment.name"
                        v-bind:text="attachment.name"
                        v-bind:href="attachment.plath"
                        v-bind:disabled="false"
                        v-bind:size="'small'"
                        v-bind:color="'blue'"
                    />
                </div>
                <div class="reactions">
                    <div class="reactionExample" />
                    <div class="reactionExample" />
                    <div class="reactionExample" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.chat-message {
    display: flex;
}
.chat-message .user-image {
    border: solid 1px #e3e8f1;
    border-radius: 50%;
    box-shadow: 0 2px 5px 0 rgba(67, 86, 100, 0.25);
    height: 24px;
    margin: 0px 8px 0px 0px;
    width: 24px;
}
.chat-message .message-container {
    display: inline-block;
}

.chat-message .message-container .user-information {
    margin: 4px 0px 0px 0px;
}

.chat-message .message-container .user-information .username {
    color: #0d0d0d;
    font-weight: bold;
    letter-spacing: 0.7px;
}
.chat-message .message-container .user-information .date {
    color: #a4adb5;
    letter-spacing: 0.3px;
}

.chat-message .message-container .message-content .message {
    color: #0d0d0d;
    letter-spacing: 0.3px;
}
.chat-message .message-container .message-content .links {
    margin-top: 6px;
}
.chat-message .message-container .message-content .links .link {
    display: block;
}
.chat-message .message-container .message-content .reactions {
    margin: 10px 0px 0px 0px;
    font-size: 0px; //It fixes white spaces between divs
}
.chat-message .message-container .message-content .reactions .reactionExample {
    //TODO remove this example
    background-color: #f2b738;
    display: inline-block;
    height: 24px;
    width: 37px;
}
</style>

<script>
export const ChatMessagePlatforme = {
    name: "chat-message-platforme",
    props: {
        userImgPath: { //TODO remove, this will be replaced by avatar
            type: String,
            default: "http://i.pravatar.cc"
        },
        username: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true  
        },
        attachments: {
            type: Array,
            default: () => []
        }
    }
};
export default ChatMessagePlatforme;
</script> 