<template>
    <div class="avatar" v-bind:class="[{ notify: notify }, size]">
        <div class="image-container" v-if="hasImg">
            <img class="image" v-bind:src="imgUrl" alt="avatar" />
            <slot name="dot">
                <div class="dot" />
            </slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.avatar {
    display: inline-block;
    font-size: 0px;
    white-space: nowrap;
}

.avatar .image-container {
    display: inline-block;
    font-size: 0px;
    position: relative;
}

.avatar .image-container > .image {
    border-radius: 50% 50% 50% 50%;
}

.avatar .image-container > .dot {
    background: #4b8dd7;
    border: 1px solid #ffffff;
    border-radius: 50% 50% 50% 50%;
    display: none;
    position: absolute;
    right: 0px;
    top: 0px;
}

.avatar.notify .image-container > .dot {
    display: inline-block;
}

.avatar.large .image-container > .image {
    height: 96px;
    width: 96px;
}

.avatar.large .image-container > .dot {
    border-width: 2px;
    height: 19px;
    right: 2px;
    top: 2px;
    width: 19px;
}

.avatar.medium .image-container > .image {
    height: 40px;
    width: 40px;
}

.avatar.medium .image-container > .dot {
    height: 8px;
    right: 1px;
    top: 1px;
    width: 8px;
}

.avatar.small .image-container > .image {
    height: 34px;
    width: 34px;
}

.avatar.small .image-container > .dot {
    height: 7px;
    right: 0px;
    top: 0px;
    width: 7px;
}

.avatar.tiny .image-container .image {
    height: 24px;
    width: 24px;
}

.avatar.tiny .image-container .dot {
    border-width: 0.3px;
    height: 5px;
    right: 1px;
    top: 1px;
    width: 5px;
}
</style>

<script>
export const Avatar = {
    name: "avatar",
    props: {
        size: {
            type: String,
            default: "small"
        },
        imgUrl: {
            type: String,
            default: null
        },
        notify: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        hasImg() {
            return Boolean(this.imgUrl);
        }
    }
};

export default Avatar;
</script>
