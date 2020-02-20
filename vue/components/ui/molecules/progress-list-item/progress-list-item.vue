<template>
    <div class="progress-list-item">
        <div class="information-container">
            <div class="information">
                <div class="title">
                    {{ title }}
                </div>
                <div class="description">
                    {{ description }}
                </div>
            </div>
            <div class="state">
                <template v-if="finished">
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
                </template>
                <button-icon
                    v-bind:icon="'close'"
                    v-bind:size="38"
                    v-else
                    v-on:click="onCloseButtonClick"
                />
            </div>
        </div>
        <progress-bar
            v-bind:steps="100"
            v-bind:current-step="progress"
            v-bind:color="'#1d2631'"
            v-bind:label="`${progress}%`"
            v-bind:label-alignment="'left'"
            v-if="progress !== null && !finished"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

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
}

.progress-list-item .information-container .information .title {
    color: $dark-blue;
    font-weight: bold;
}

.progress-list-item .information-container .information .description {
    color: #a4adb5;
    margin: 4px 0px 0px 0px;
}

.progress-list-item .information-container .state {
    align-items: center;
    display: inline-flex;
    margin: 0px 0px 0px auto;
}

.progress-list-item .information-container .state .icon.ok {
    margin: 0px 0px 0px 30px;
}

.progress-list-item .progress-bar-container {
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
