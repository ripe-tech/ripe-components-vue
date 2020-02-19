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
                <button-icon v-bind:icon="'close'" v-bind:size="38" v-else />
            </div>
        </div>
        <div class="progress" v-if="progress !== null && !finished">
            <progress-bar
                v-bind:steps="100"
                v-bind:current-step="progress"
                v-bind:color="'#1d2631'"
                v-bind:label="`${progress}%`"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.progress-list-item {
    padding: 16px 20px 16px 20px;
    border-radius: 6px;
    box-shadow: 0 2px 5px 0 rgba(67, 86, 100, 0.25);
}

.progress-list-item .information-container {
    display: flex;
}

.progress-list-item .information-container .information {
    font-size: 14px;
    letter-spacing: 0.3px;
}

.progress-list-item .information-container .information .title {
    font-weight: bold;
    color: #1d2631;
}

.progress-list-item .information-container .information .description {
    margin: 4px 0px 0px 0px;
    color: #a4adb5;
}

.progress-list-item .information-container .state {
    display: inline-flex;
    align-items: center;
    margin: 0px 0px 0px auto;
}

.progress-list-item .information-container .state .icon.ok {
    margin: 0px 0px 0px 30px;
}

.progress-list-item .progress {
    //background-color: lightgreen;
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
    }
};
export default ProgressListItem;
</script>
