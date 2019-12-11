<template>
    <div class="avatar" v-bind:class="[size]">
        <div class="image-container" v-bind:class="[{ notify: notify }, size]">
            <img class="image" v-bind:src="imgUrl" alt="avatar" />
            <slot name="notify-dot">
                <div
                    class="dot"
                    v-bind:style="{ 'border-color': notifyBorderColor, background: notifyColor }"
                />
            </slot>
        </div>
        <div class="text left" v-bind:class="[size]" v-if="title || subtitle">
            <label-platforme class="title" v-if="title">
                {{ title }}
            </label-platforme>
            <label-platforme class="subtitle" v-if="subtitle">
                {{ subtitle }}
            </label-platforme>
        </div>
        <div class="text right" v-bind:class="[size]">
            <label-platforme class="content" v-if="content">
                {{ content }}
            </label-platforme>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.avatar {
    display: inline-block;
    font-size: 0px;
}

.image-container {
    display: inline-block;
    font-size: 0px;
    position: relative;
}

.image-container .image {
    border-radius: 50%;
    height: auto;
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

.image-container .dot {
    background: #4b8dd7;
    border: 1px solid #ffffff;
    border-radius: 50%;
    height: 10%;
    position: absolute;
    right: 0px;
    top: 0px;
    width: 10%;
}

.image-container:not(.notify) .dot {
    display: none;
}

.text {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-evenly;
    vertical-align: top;
    flex-direction: column;
    padding: 0px 8px 0px 8px;
}

.text.giant {
    height: 128px;
}

.text.large {
    height: 96px;
}

.text.medium {
    height: 40px;
}

.text.small {
    height: 32px;
}

.text.tiny {
    height: 24px;
}

.text.micro {
    height: 16px;
}

.text.left .title ::v-deep {
    color: $dark;
    font-size: 14px;
    font-weight: 700;
}

.avatar.giant .text.left .title ::v-deep {
    font-size: 80px;
}

.text.left .subtitle ::v-deep {
    color: $dark;
    font-weight: 500;
    letter-spacing: 0.3px;
}

.text.right {
    padding: 0px 0px 0px 0px;
}

.text:empty {
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
    }
};

export default AvatarPlatforme;
</script>
