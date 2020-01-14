<template>
    <div class="dot" v-bind:class="classes" v-bind:style="style">
        <img class="icon" v-bind:src="iconPath" />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.dot {
    align-items: center;
    background-color: #c3c9cf;
    display: flex;
    height: 20px;
    justify-content: center;
    width: 20px;
}

.dot.disabled {
    background-color: #c3c9cf;
}

.dot.enabled {
    background-color: $dark;
}

.dot .icon {
    height: 80%;
    width: 80%;
}
</style>

<script>
export const Dot = {
    name: "dot",
    props: {
        size: {
            type: String,
            default: () => null
        },
        value: {
            type: Boolean,
            default: () => false
        }
    },
    computed: {
        iconPath() {
            return this.value ? require("./assets/ok.svg") : require("./assets/close.svg");
        },
        style() {
            return {
                height: `${this.size}px`,
                width: `${this.size}px`,
                padding: `${parseInt(this.size / 4.5)}px`,
                "border-radius": `${this.size}px`
            };
        },
        classes() {
            const base = {
                disabled: !this.value,
                enabled: this.value
            };

            return base;
        }
    }
};

export default Dot;
</script>
