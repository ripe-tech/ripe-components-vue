<template>
    <div class="animation-visualizer">
        <h3 v-if="title">{{ title }}</h3>
        <div class="box" v-bind:style="animationStyle">
            Box
        </div>
    </div>
</template>

<style lang="scss">
@import "css/animations.scss";

.box {
    background-color: #ff00ff;
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    text-align: center;
    width: 50px;
}
</style>

<script>
export const AnimationVisualizer = {
    name: "animation-visualizer",
    props: {
        title: {
            type: String,
            default: null
        },
        animationName: {
            type: String,
            required: true
        },
        animationDuration: {
            type: String,
            required: true
        },
        animationTimingFunction: {
            type: String,
            default: null
        },
        animationDelay: {
            type: String,
            default: null
        },
        animationIterationCount: {
            type: String,
            default: "infinite"
        },
        animationDirection: {
            type: String,
            default: null
        },
        animationMode: {
            type: String,
            default: null
        }
    },
    computed: {
        animationStyle() {
            return {
                "animation-name": this.animationName,
                "animation-duration": this.animationDuration,
                "animation-timing-function": this.animationTimingFunction,
                "animation-delay": this.animationDelay,
                "animation-iteration-count": this.animationIterationCount,
                "animation-direction": this.animationDirection,
                "animation-fill-mode": this.animationMode
            };
        }
    }
};

export default AnimationVisualizer;
</script>
