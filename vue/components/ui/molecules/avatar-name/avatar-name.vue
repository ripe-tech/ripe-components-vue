<template>
    <div class="avatar-name">
        <avatar v-bind="{ ...{ size: 'tiny' }, ...avatarProps }" />
        <div class="name" v-bind:title="name">
            {{ name }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.avatar-name {
    align-items: center;
    display: flex;
}

.avatar-name > .name {
    flex: 1;
    margin-left: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

<script>
export const AvatarName = {
    name: "avatar-name",
    props: {
        avatarProps: {
            type: Object,
            default: () => ({})
        },
        name: {
            type: String,
            default: null
        }
    }
};

export default AvatarName;
</script>
