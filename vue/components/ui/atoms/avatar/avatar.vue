<template>
    <div
        class="avatar"
        v-bind:class="[{ notify: notify, clickable: clickable, active: active }, size]"
        v-if="hasImage"
    >
        <div class="image-container">
            <image-ripe
                v-bind:src="src"
                v-bind:src-error="srcError"
                v-bind:alt="alt"
                v-bind:fade="fade"
                v-on:error="onError"
            />
            <slot name="dot">
                <div class="dot" />
            </slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.avatar {
    border-radius: 50% 50% 50% 50%;
    display: inline-block;
}

.avatar.clickable {
    cursor: pointer;
}

.avatar.clickable:hover {
    background-color: rgba(60, 64, 67, 0.08);
}

.avatar.clickable:active,
.avatar.clickable.active {
    background-color: rgba(60, 64, 67, 0.2);
}

.avatar.very-tiny.clickable {
    height: 18px;
    padding: 2px 2px 2px 2px;
    width: 18px;
}

.avatar.tiny.clickable {
    height: 24px;
    padding: 4px 4px 4px 4px;
    width: 24px;
}

.avatar.small.clickable {
    height: 34px;
    padding: 6px 6px 6px 6px;
    width: 34px;
}

.avatar.medium.clickable {
    height: 40px;
    padding: 8px 8px 8px 8px;
    width: 40px;
}

.avatar.large.clickable {
    height: 54px;
    padding: 8px 8px 8px 8px;
    width: 54px;
}

.avatar.very-large.clickable {
    height: 96px;
    padding: 10px 10px 10px 10px;
    width: 96px;
}

.avatar .image-container {
    font-size: 0px;
    position: relative;
}

.avatar .image-container > .image {
    border-radius: 50% 50% 50% 50%;
}

.avatar.very-tiny .image-container,
.avatar.very-tiny .image-container > .image {
    height: 18px;
    line-height: 18px;
    width: 18px;
}

.avatar.tiny .image-container,
.avatar.tiny .image-container > .image {
    height: 24px;
    line-height: 24px;
    width: 24px;
}

.avatar.small .image-container,
.avatar.small .image-container > .image {
    height: 34px;
    line-height: 34px;
    width: 34px;
}

.avatar.medium .image-container,
.avatar.medium .image-container > .image {
    height: 40px;
    line-height: 40px;
    width: 40px;
}

.avatar.large .image-container,
.avatar.large .image-container > .image {
    height: 56px;
    line-height: 56px;
    width: 56px;
}

.avatar.very-large .image-container,
.avatar.very-large .image-container > .image {
    height: 96px;
    line-height: 96px;
    width: 96px;
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

.avatar.very-tiny .image-container > .dot {
    border-width: 0.3px;
    height: 2px;
    right: 1px;
    top: 1px;
    width: 2px;
}

.avatar.tiny .image-container > .dot {
    border-width: 0.3px;
    height: 5px;
    right: 1px;
    top: 1px;
    width: 5px;
}

.avatar.small .image-container > .dot {
    height: 7px;
    right: 0px;
    top: 0px;
    width: 7px;
}

.avatar.medium .image-container > .dot {
    height: 8px;
    right: 1px;
    top: 1px;
    width: 8px;
}

.avatar.large .image-container > .dot {
    height: 10px;
    right: 2px;
    top: 2px;
    width: 10px;
}

.avatar.very-large .image-container > .dot {
    border-width: 2px;
    height: 19px;
    right: 2px;
    top: 2px;
    width: 19px;
}
</style>

<script>
import fallback from "./assets/avatar.png";

export const Avatar = {
    name: "avatar",
    props: {
        size: {
            type: String,
            default: "small"
        },
        src: {
            type: String,
            default: null
        },
        srcError: {
            type: String,
            default: fallback
        },
        alt: {
            type: String,
            default: "avatar"
        },
        fade: {
            type: Boolean,
            default: false
        },
        notify: {
            type: Boolean,
            default: false
        },
        clickable: {
            type: Boolean,
            default: false
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        hasImage() {
            return Boolean(this.src);
        }
    },
    methods: {
        onError() {
            this.$emit("error:image");
        }
    }
};

export default Avatar;
</script>
