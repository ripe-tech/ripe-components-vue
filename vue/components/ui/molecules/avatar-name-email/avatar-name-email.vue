<template>
    <div class="avatar-name-email">
        <avatar-name v-bind:avatar-props="avatarProps" v-bind:name="name" />
        <div class="email" v-bind:title="email">
            {{ email }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.avatar-name-email > .avatar-name,
.avatar-name-email > .email {
    display: inline-flex;
    vertical-align: middle;
}

.avatar-name-email > .email {
    color: #6b778c;
    font-size: 12px;
    margin: 0px 0px 0px 5px;
}
</style>

<script>
export const AvatarNameEmail = {
    name: "avatar-name-email",
    props: {
        avatarProps: {
            type: Object,
            default: () => ({})
        },
        name: {
            type: String,
            default: null
        },
        email: {
            type: String,
            default: null
        }
    }
};

export default AvatarNameEmail;
</script>
