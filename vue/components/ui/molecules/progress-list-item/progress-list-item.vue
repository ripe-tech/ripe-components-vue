<template>
    <div class="progress-list-item">
        <div class="information-container">
            <div class="information">
                <div class="title" v-bind:title="title">
                    {{ title }}
                </div>
                <div class="description">
                    {{ description }}
                </div>
            </div>
            <div class="state">
                <transition name="slide" mode="out-in">
                    <template v-if="finished">
                        <div class="state-completed">
                            <button-icon
                                v-bind:icon="actionIcon"
                                v-bind:text="actionText"
                                v-bind:size="24"
                                v-on:click="onActionButtonClick"
                            />
                            <icon
                                class="ok"
                                v-bind:icon="'ok'"
                                v-bind:color="'#45a777'"
                                v-bind:stroke-width="2"
                                v-bind:width="24"
                                v-bind:height="24"
                            />
                        </div>
                    </template>
                    <button-icon
                        class="close"
                        v-bind:icon="'close'"
                        v-bind:size="38"
                        v-else
                        v-on:click="onCloseButtonClick"
                    />
                </transition>
            </div>
        </div>
        <transition name="slide-transition" mode="out-in">
            <progress-bar
                v-bind:steps="100"
                v-bind:current-step="progress"
                v-bind:color="'#1d2631'"
                v-bind:label="`${progress}%`"
                v-bind:label-alignment="'left'"
                v-bind:fill-transition-time="0.5"
                v-bind:fill-transition-mode="'ease'"
                v-if="progress !== null && !finished"
            />
        </transition>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
@import "css/animations.scss";

.progress-list-item {
    background-color: $white;
    border-radius: 6px;
    box-shadow: 0 2px 5px 0 rgba(67, 86, 100, 0.25);
    overflow: hidden;
    padding: 16px 20px 16px 20px;
    user-select: none;
}

.progress-list-item > .information-container {
    display: flex;
}

.progress-list-item > .information-container > .information {
    font-size: 14px;
    letter-spacing: 0.3px;
    max-width: 50%;
}

.progress-list-item > .information-container > .information > .title {
    color: $dark-blue;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.progress-list-item > .information-container > .information > .description {
    color: #a4adb5;
    font-size: 12px;
    font-weight: 600;
    margin: 6px 0px 0px 0px;
    word-wrap: break-word;
}

.progress-list-item > .information-container > .state {
    align-items: center;
    display: inline-flex;
    margin: 0px 0px 0px auto;
}

.progress-list-item > .information-container > .state .state-completed {
    animation: open-left-fade 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.progress-list-item > .information-container > .state .state-completed.slide-leave-active {
    animation: close-right-fade 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.progress-list-item > .information-container .state .state-completed .icon.ok {
    animation: zoom-extra 0.45s 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin: 0px 0px 0px 30px;
    vertical-align: middle;
}

.progress-list-item > .progress-bar-container {
    margin: 17px 0px 0px 0px;
}

.progress-list-item > .progress-bar-container.slide-transition-enter-active {
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
        opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s;
}

.progress-list-item > .progress-bar-container.slide-transition-leave-active {
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s,
        opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s;
}

.progress-list-item > .progress-bar-container.slide-transition-enter,
.progress-list-item > .progress-bar-container.slide-transition-leave-to {
    margin: -29px 0px 0px 0px;
    opacity: 0;
}

.progress-list-item > .progress-bar-container.slide-transition-enter-to {
    margin: 17px 0px 0px 0px;
}
</style>

<script>
export const ProgressListItem = {
    name: "progress-list-item",
    props: {
        title: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        finished: {
            type: Boolean,
            default: false
        },
        progress: {
            type: Number,
            default: null
        },
        actionText: {
            type: String,
            default: null
        },
        actionIcon: {
            type: String,
            default: null
        }
    },
    methods: {
        onActionButtonClick(event) {
            this.$emit("click:action", event);
        },
        onCloseButtonClick(event) {
            this.$emit("click:close", event);
        }
    }
};

export default ProgressListItem;
</script>
