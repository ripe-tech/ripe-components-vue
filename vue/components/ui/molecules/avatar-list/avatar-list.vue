<template>
    <div class="avatar-list">
        <div
            class="avatar-container"
            v-bind:class="classes"
            v-bind:style="{ 'z-index': index }"
            v-for="(avatar, index) in avatarList"
            v-bind:key="index"
        >
            <div v-if="index == maxElems">
                {{ remainingElements }}
            </div>
            <avatar v-bind="{ size: size, ...avatar }" v-else-if="index < maxElems" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.avatar-list {
    display: flex;
}

.avatar-list > .avatar-container > * {
    border: 2px solid #ffffff;
}

.avatar-list > .avatar-container:not(:first-child) {
    transition: margin 0.3s;
}

.avatar-list > .avatar-container:not(:first-child).very-tiny {
    margin-left: -10px;
}

.avatar-list > .avatar-container:not(:first-child).tiny {
    margin-left: -12px;
}

.avatar-list > .avatar-container:not(:first-child).small {
    margin-left: -16px;
}

.avatar-list > .avatar-container:not(:first-child).medium {
    margin-left: -18px;
}

.avatar-list > .avatar-container:not(:first-child).large {
    margin-left: -26px;
}

.avatar-list > .avatar-container:not(:first-child).very-large {
    margin-left: -50px;
}

.avatar-list:hover > .avatar-container.expandable:not(:first-child).very-tiny {
    margin-left: 2px;
}

.avatar-list:hover > .avatar-container.expandable:not(:first-child).tiny {
    margin-left: 2px;
}

.avatar-list:hover > .avatar-container.expandable:not(:first-child).small {
    margin-left: 4px;
}

.avatar-list:hover > .avatar-container.expandable:not(:first-child).medium {
    margin-left: 6px;
}

.avatar-list:hover > .avatar-container.expandable:not(:first-child).large {
    margin-left: 8px;
}

.avatar-list:hover > .avatar-container.expandable:not(:first-child).very-large {
    margin-left: 10px;
}

.avatar-list > .avatar-container > div {
    align-content: center;
    background: #e1e1e1;
    border-radius: 50%;
    color: #545454;
    display: flex;
    justify-content: center;
}

.avatar-list > .avatar-container.very-tiny > div {
    font-size: 8px;
    height: 18px;
    line-height: 18px;
    width: 18px;
}

.avatar-list > .avatar-container.tiny > div {
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    width: 24px;
}

.avatar-list > .avatar-container.small > div {
    font-size: 16px;
    height: 34px;
    line-height: 34px;
    width: 34px;
}

.avatar-list > .avatar-container.medium > div {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    width: 40px;
}

.avatar-list > .avatar-container.large > div {
    font-size: 24px;
    height: 56px;
    line-height: 56px;
    width: 56px;
}

.avatar-list > .avatar-container.very-large > div {
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
        avatarList: {
            type: Array,
            default: () => []
        },
        expandable: {
            type: Boolean,
            default: false
        },
        maxElems: {
            type: Number,
            default: 3
        },
        size: {
            type: String,
            default: "medium"
        }
    },
    computed: {
        classes() {
            const base = {};
            if (this.expandable) base.expandable = true;
            base[`${this.size}`] = true;
            return base;
        },
        remainingElements() {
            return `+ ${this.avatarList.length - this.maxElems}`;
        }
    }
};

export default AvatarList;
</script>
