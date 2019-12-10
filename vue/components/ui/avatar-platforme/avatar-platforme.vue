<template>
    <div class="avatar" v-bind:class="[{ notify: notify }, size]">
        <img class="image" v-bind:src="imgUrl" alt="avatar" />
        <div class="dot" v-bind:style="{ background: String(notifyColor) }" />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.avatar {
    display: inline-block;
    position: relative;
}

.avatar .image {
    border-radius: 50%;
    height: auto;
}

.avatar.giant .image {
    height: 128px;
    width: 128px;
}

.avatar.giant .dot {
    height: 17px;
    right: 9px;
    top: 8px;
    width: 17px;
}

.avatar.large .image {
    height: 96px;
    width: 96px;
}

.avatar.large .dot {
    height: 12px;
    right: 6px;
    top: 7px;
    width: 12px;
}

.avatar.medium .image {
    height: 40px;
    width: 40px;
}

.avatar.medium .dot {
    border-width: 0.9px;
    height: 6px;
    right: 3px;
    top: 1px;
    width: 6px;
}

.avatar.small .image {
    height: 32px;
    width: 32px;
}

.avatar.small .dot {
    border-width: 0.9px;
    height: 4px;
    right: 3px;
    top: 1px;
    width: 4px;
}

.avatar.tiny .image {
    height: 24px;
    width: 24px;
}

.avatar.tiny .dot {
    border-width: 0.3px;
    height: 3px;
    right: 2px;
    top: 1px;
    width: 3px;
}

.avatar.micro .image {
    height: 16px;
    width: 16px;
}

.avatar.micro .dot {
    border-width: 0.1px;
    height: 2px;
    right: 1px;
    top: 0px;
    width: 2px;
}

.avatar .dot {
    background: #4b8dd7;
    border: 1px solid #ffffff;
    border-radius: 50%;
    height: 10%;
    position: absolute;
    right: 0px;
    top: 0px;
    width: 10%;
}

.avatar:not(.notify) .dot {
    display: none;
}
</style>

<script>
export const AvatarPlatforme = {
    name: "avatar-platforme",
    props: {
        size: {
            type: String,
            default: "small"
        },
        imgUrl: {
            type: String,
            default: ""
        },
        notify: {
            type: Boolean,
            default: false
        },
        notifyColor: {
            type: String,
            default: null
        }
    }
};

export default AvatarPlatforme;
</script>
