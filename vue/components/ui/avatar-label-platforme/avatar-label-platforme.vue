<template>
    <div class="avatar-label" v-bind:class="[size]">
        <slot name="avatar">
            <avatar-platforme v-bind:size="size" v-bind:imgUrl="imgUrl"></avatar-platforme>
        </slot>
            <span>
                <label-platforme>Option</label-platforme>
                <label-platforme>Subtext</label-platforme>
            </span>
            <label-platforme>Metadata</label-platforme>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

span {
    display: inline-block;
}

span > * {
    display: block;
}

</style>

<script>
export const AvatarLabelPlatforme = {
    name: "avatar-label-platforme",
    props: {
        size: {
            type: String,
            default: "small"
        },
        imgUrl: {
            type: String,
            default: "https://user-images.githubusercontent.com/24736423/69619122-fe5ae380-1032-11ea-8bfb-1966daa280b4.gif"
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

export default AvatarLabelPlatforme;
</script>
