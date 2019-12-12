<template>
    <div class="avatar" v-bind:class="[size, { hasText: hasText }]">
        <div class="image-container" v-bind:class="[{ notify: notify }, size]" v-if="hasImg">
            <img class="image" v-bind:src="imgUrl" alt="avatar" />
            <slot name="dot">
                <div class="dot" v-bind:style="dotStyle" />
            </slot>
        </div>
        <div class="text text-left" v-if="title || subtitle">
            <div class="title" v-if="title">
                {{ title }}
            </div>
            <div class="subtitle" v-if="subtitle">
                {{ subtitle }}
            </div>
        </div>
        <div class="text text-right" v-if="content">
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
    overflow: hidden;
    white-space: nowrap;
}

.image-container {
    display: inline-block;
    font-size: 0px;
    position: relative;
}

.image-container .image {
    border-radius: 50%;
}

.image-container .dot {
    background: #4b8dd7;
    border: 1px solid #ffffff;
    border-radius: 50%;
    position: absolute;
    right: 0px;
    top: 0px;
}

.image-container:not(.notify) .dot {
    display: none;
}

.image-container.giant .image {
    height: 128px;
    width: 128px;
}

.image-container.giant .dot {
    height: 17px;
    right: 9px;
    top: 8px;
    width: 17px;
}

.image-container.large .image {
    height: 96px;
    width: 96px;
}

.image-container.large .dot {
    height: 12px;
    right: 6px;
    top: 7px;
    width: 12px;
}

.image-container.medium .image {
    height: 40px;
    width: 40px;
}

.image-container.medium .dot {
    border-width: 0.9px;
    height: 6px;
    right: 3px;
    top: 1px;
    width: 6px;
}

.image-container.small .image {
    height: 32px;
    width: 32px;
}

.image-container.small .dot {
    border-width: 0.9px;
    height: 4px;
    right: 3px;
    top: 1px;
    width: 4px;
}

.image-container.tiny .image {
    height: 24px;
    width: 24px;
}

.image-container.tiny .dot {
    border-width: 0.3px;
    height: 3px;
    right: 2px;
    top: 1px;
    width: 3px;
}

.image-container.micro .image {
    height: 16px;
    width: 16px;
}

.image-container.micro .dot {
    border-width: 0.1px;
    height: 2px;
    right: 1px;
    top: 0px;
    width: 2px;
}

.text {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-evenly;
    vertical-align: top;
}

.text.text-left {
    padding: 0px 8px 0px 8px;
}

.text.text-right {
    padding: 0px 8px 0px 0px;
}

.text ::v-deep .label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.avatar.giant .text {
    font-size: 60px;
    height: 128px;
    line-height: 60px;
}

.avatar.large .text {
    font-size: 38px;
    height: 96px;
    line-height: 38px;
}

.avatar.medium .text {
    font-size: 18px;
    height: 40px;
    line-height: 18px;
}

.avatar.small .text {
    font-size: 14px;
    height: 32px;
    line-height: 14px;
}

.avatar.tiny .text {
    font-size: 10px;
    height: 24px;
    line-height: 10px;
}

.avatar.micro .text {
    font-size: 7px;
    height: 16px;
    line-height: 7px;
}

.text .title {
    color: $dark;
    font-weight: 700;
    letter-spacing: 0.2px;
}

.avatar .text-left .subtitle ::v-deep {
    color: $dark;
    font-weight: 500;
    letter-spacing: 0.3px;
}

.avatar.hasText:hover {
    background-color: $lighter-grey;
}

.avatar.hasText:hover .subtitle {
    color: $grey;
}

.avatar.hasText:active {
    background-color: $light-grey;
}

.avatar.hasText:focus {
    background-color: $dark;
}

.avatar.hasText:focus .title {
    color: $white;
}

.avatar.hasText:focus .subtitle {
    color: #a4adb5;
}

.avatar.hasText:focus .content {
    color: $white;
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
        },
        notifyColor: {
            type: String,
            default: null
        },
        notifyBorderColor: {
            type: String,
            default: null
        }
    },
    computed: {
        dotStyle() {
            return {
                "border-color": this.notifyBorderColor,
                "background-color": this.notifyColor
            };
        },
        hasImg() {
            return Boolean(this.imgUrl);
        },
        hasText() {
            return Boolean(this.title || this.subtitle || this.content);
        }
    }
};

export default AvatarPlatforme;
</script>
