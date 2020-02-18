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
                        v-bind:icon="'ok'"
                        v-bind:color="'#45a777'"
                        v-bind:stroke-width="2"
                        v-bind:width="24"
                        v-bind:height="24"
                    />
                </template>
                <button-icon v-bind:icon="'close'" v-bind:size="24" v-else />
            </div>
        </div>
        <div class="progress" v-if="progress !== null && !finished">
            <progress-bar
                v-bind:steps="100"
                v-bind:current-step="progress"
                v-bind:color="'#1d2631'"
                v-bind:label="`${progress} %`"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.progress-list-item .information-container .information,
.progress-list-item .information-container .state {
    display: inline-block;
}

.progress-list-item .information-container .information {
    //background-color: lightblue;
}

.progress-list-item .information-container .information .title {
    font-weight: bold;
}

.progress-list-item .information-container .information .description {
    //color: gray;
}

.progress-list-item .information-container .state {
    //background-color: lightcoral;
}

.progress-list-item .progress {
    //background-color: lightgreen;
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
