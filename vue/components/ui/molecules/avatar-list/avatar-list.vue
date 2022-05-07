<template>
    <div class="avatar-list" v-bind:class="classes">
        <div
            class="avatar-container"
            v-bind:style="containerStyle(index)"
            v-for="(avatar, index) in filteredAvatars"
            v-bind:key="index"
        >
            <div class="remaining-elements" v-if="index == maxElements">
                {{ remainingElements }}
            </div>
            <avatar v-bind="{ size: size, ...avatar }" v-else />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.avatar-list {
    display: flex;
}

.avatar-list.expandable {
    cursor: pointer;
}

.avatar-list > .avatar-container:not(:first-child) {
    transition: margin 0.3s;
}

.avatar-list.very-tiny > .avatar-container:not(:first-child) {
    margin-left: -10px;
}

.avatar-list.tiny > .avatar-container:not(:first-child) {
    margin-left: -12px;
}

.avatar-list.small > .avatar-container:not(:first-child) {
    margin-left: -16px;
}

.avatar-list.medium > .avatar-container:not(:first-child) {
    margin-left: -18px;
}

.avatar-list.large > .avatar-container:not(:first-child) {
    margin-left: -26px;
}

.avatar-list.very-large > .avatar-container:not(:first-child) {
    margin-left: -50px;
}

.avatar-list.expandable.very-tiny:hover > .avatar-container:not(:first-child) {
    margin-left: 2px;
}

.avatar-list.expandable.tiny:hover > .avatar-container:not(:first-child) {
    margin-left: 2px;
}

.avatar-list.expandable.small:hover > .avatar-container:not(:first-child) {
    margin-left: 4px;
}

.avatar-list.expandable.medium:hover > .avatar-container:not(:first-child) {
    margin-left: 6px;
}

.avatar-list.expandable.large:hover > .avatar-container:not(:first-child) {
    margin-left: 8px;
}

.avatar-list.expandable.very-large:hover > .avatar-container:not(:first-child) {
    margin-left: 10px;
}

.avatar-list > .avatar-container > .remaining-elements,
.avatar-list > .avatar-container > .avatar {
    border: 2px solid #ffffff;
}

.avatar-list > .avatar-container > .remaining-elements {
    align-content: center;
    background: #e1e1e1;
    border-radius: 50%;
    color: #545454;
    display: flex;
    justify-content: center;
}

.avatar-list.very-tiny > .avatar-container > .remaining-elements {
    font-size: 8px;
    height: 18px;
    line-height: 18px;
    width: 18px;
}

.avatar-list.tiny > .avatar-container > .remaining-elements {
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    width: 24px;
}

.avatar-list.small > .avatar-container > .remaining-elements {
    font-size: 16px;
    height: 34px;
    line-height: 34px;
    width: 34px;
}

.avatar-list.medium > .avatar-container > .remaining-elements {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    width: 40px;
}

.avatar-list.large > .avatar-container > .remaining-elements {
    font-size: 24px;
    height: 56px;
    line-height: 56px;
    width: 56px;
}

.avatar-list.very-large > .avatar-container > .remaining-elements {
    font-size: 40px;
    height: 96px;
    line-height: 96px;
    width: 96px;
}
</style>

<script>
export const AvatarList = {
    name: "avatar-list",
    props: {
        avatars: {
            type: Array,
            default: () => []
        },
        expandable: {
            type: Boolean,
            default: false
        },
        maxElements: {
            type: Number,
            default: 3
        },
        size: {
            type: String,
            default: "medium"
        }
    },
    computed: {
        filteredAvatars() {
            return this.avatars.filter((value, index) => index <= this.maxElements);
        },
        remainingElements() {
            return `+ ${this.avatars.length - this.maxElements}`;
        },
        classes() {
            const base = {};
            if (this.expandable) base.expandable = true;
            base[`${this.size}`] = true;
            return base;
        }
    },
    methods: {
        containerStyle(index) {
            return { "z-index": index };
        }
    }
};

export default AvatarList;
</script>
