<template>
    <div class="progress-bar">
        <div class="fill" v-bind:style="fillStyle" />
    </div>
</template>

<style scoped>
.progress-bar {
    background-color: #d5d6ee;
    height: 4px;
}

.fill {
    background-color: #4071f2;
    height: 100%;
    width: 1%;
}
</style>

<script>
export const ProgressBarPlatforme = {
    props: {
        color: {
            type: String,
            default: null
        },
        steps: {
            type: Number,
            default: 3
        },
        currentStep: {
            type: Number,
            default: 1
        }
    },
    computed: {
        fillStyle: function() {
            return {
                "background-color": this.color || "#4071f2",
                width: `${(this.currentStep / this.steps) * 100}%`
            };
        }
    }
};

export default ProgressBarPlatforme;
</script>
