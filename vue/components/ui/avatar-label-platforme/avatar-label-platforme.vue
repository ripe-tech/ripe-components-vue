<template>
    <div class="avatar-container" v-bind:class="[size]">
        <div class="avatar" v-bind:class="[{ notify: notify }, size]">
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

.avatar-container {
    display: inline-block;
    font-size: 0px;
}


.avatar {
    display: inline-block;
    font-size: 0px;
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

.text .title ::v-deep {
    color: $dark;
    font-size: 14px;
    font-weight: 700;
}

.text .subtitle ::v-deep {
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
export const AvatarLabelPlatforme = {
    name: "avatar-container-platforme",
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
            default:
                "https://user-images.githubusercontent.com/24736423/69619122-fe5ae380-1032-11ea-8bfb-1966daa280b4.gif"
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

export default AvatarLabelPlatforme;
</script>
