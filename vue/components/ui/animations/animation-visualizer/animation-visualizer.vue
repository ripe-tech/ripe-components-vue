<template>
    <div class="animation-visualizer">
        <h3 v-if="title">{{ title }}</h3>
        <div class="box" v-bind:style="animationStyle" v-if="renderComponent">
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
            default: null
        },
        animationDuration: {
            type: String,
            default: null
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
            default: null
        },
        animationDirection: {
            type: String,
            default: null
        },
        animationMode: {
            type: String,
            default: null
        },
        animationPlayState: {
            type: String,
            default: null
        }
    },
    data: function() {
        return {
            renderComponent: true
        };
    },
    computed: {
        animationStyle() {
            const base = {
                "animation-name": this.animationName,
                "animation-duration": this.animationDuration,
                "animation-delay": this.animationDelay,
                "animation-timing-function": this.animationTimingFunction,
                "animation-iteration-count": this.animationIterationCount,
                "animation-direction": this.animationDirection,
                "animation-fill-mode": this.animationMode,
                "animation-play-state": this.animationPlayState
            };
            return base;
        },
        animationsProperties() {
            return [
                this.animationName,
                this.animationDuration,
                this.animationTimingFunction,
                this.animationDelay,
                this.animationIterationCount,
                this.animationDirection,
                this.animationMode,
                this.animationPlayState
            ].join();
        }
    },
    watch: {
        animationsProperties(value) {
            this.renderComponent = false;
            this.$nextTick().then(() => {
                this.renderComponent = true;
            });
        }
    }
};

export default AnimationVisualizer;
</script>
