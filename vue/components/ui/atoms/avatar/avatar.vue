<template>
    <div class="avatar" v-bind:class="[{ notify: notify }, size]">
        <div class="image-container" v-if="hasImg">
            <img class="image" v-bind:src="imgUrl" alt="avatar" />
            <slot name="dot">
                <div class="dot" />
            </slot>
        </div>
        <div class="text-left" v-if="title || subtitle">
            <div class="title" v-if="title">
                {{ title }}
            </div>
            <div class="subtitle" v-if="subtitle">
                {{ subtitle }}
            </div>
        </div>
        <div class="text-right" v-if="content">
            <div class="content" v-if="content">
                {{ content }}
            </div>
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

.avatar .text-left,
.avatar .text-right {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-evenly;
    vertical-align: top;
}

.avatar .text-left {
    padding: 0px 8px 0px 8px;
}

.avatar .text-right {
    padding: 0px 8px 0px 0px;
}

.avatar .text-left .title {
    color: $dark;
    font-weight: 700;
    letter-spacing: 0.5px;
}

.avatar .text-left .subtitle {
    color: $dark;
    font-weight: 500;
    letter-spacing: 0.5px;
}

.avatar.large .text-left,
.avatar.large .text-right {
    font-size: 38px;
    height: 96px;
}

.avatar.medium .text-left,
.avatar.medium .text-right {
    font-size: 18px;
    height: 40px;
}

.avatar.medium .text-left {
    padding: 0px 7px 0px 7px;
}

.avatar.medium .text-right {
    padding: 0px 7px 0px 0px;
}

.avatar.small .text-left,
.avatar.small .text-right {
    font-size: 14px;
    height: 34px;
}

.avatar.small .text-left {
    padding: 0px 6px 0px 6px;
}

.avatar.small .text-right {
    padding: 0px 6px 0px 0px;
}

.avatar.tiny .text-left,
.avatar.tiny .text-right {
    font-size: 10px;
    height: 24px;
}

.avatar.tiny .text-left {
    padding: 0px 4px 0px 4px;
}

.avatar.tiny .text-right {
    padding: 0px 4px 0px 0px;
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
        title: {
            type: String,
            default: null
        },
        subtitle: {
            type: String,
            default: null
        },
        content: {
            type: String,
            default: null
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
        },
        hasText() {
            return Boolean(this.title || this.subtitle || this.content);
        }
    }
};

export default Avatar;
</script>
