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
    padding: 16px 20px 16px 20px;
}

.progress-list-item .information-container {
    display: flex;
}

.progress-list-item .information-container .information {
    font-size: 14px;
    letter-spacing: 0.3px;
    max-width: 50%;
}

.progress-list-item .information-container .information .title {
    color: $dark-blue;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.progress-list-item .information-container .information .description {
    color: #a4adb5;
    margin: 4px 0px 0px 0px;
    word-wrap: break-word;
}

.progress-list-item .information-container .state {
    align-items: center;
    display: inline-flex;
    margin: 0px 0px 0px auto;
}

.progress-list-item .information-container .state .state-completed {
    animation: slide-left 0.2s;
}

.progress-list-item .information-container .state .state-completed.slide-leave-active {
    animation: slide-right 0.2s;
}

.progress-list-item .information-container .state .state-completed .icon.ok {
    animation: zoom5 0.4s 0.2s;
    margin: 0px 0px 0px 30px;
    vertical-align: middle;
}

.progress-list-item .progress-bar-container {
    margin: 17px 0px 0px 0px;
}

.progress-list-item .progress-bar-container.slide-transition-enter-active,
.progress-list-item .progress-bar-container.slide-transition-leave-active {
    transition: 0.3s ease-in-out, opacity 0.2s ease-in-out;
}

.progress-list-item .progress-bar-container.slide-transition-enter,
.progress-list-item .progress-bar-container.slide-transition-leave-to {
    margin: -29px 0px 0px 0px;
    opacity: 0;
}

.progress-list-item .progress-bar-container.slide-transition-enter-to {
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
