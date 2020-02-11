<template>
    <icon
        class="checkmark"
        v-bind:icon="icon"
        v-bind:color="'white'"
        v-bind:border-width="4.5"
        v-bind:stroke-linecap="'round'"
        v-bind:fade="false"
        v-bind:class="classes"
        v-bind:style="style"
    />
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.checkmark {
    background-color: #c3c9cf;
    box-sizing: border-box;
}

.checkmark.checked {
    background-color: $dark;
}
</style>

<script>
export const Checkmark = {
    name: "checkmark",
    props: {
        size: {
            type: Number,
            default: 14
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        icon() {
            return this.value ? "ok" : "close";
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
                unchecked: !this.value,
                checked: this.value
            };

            return base;
        }
    }
};

export default Checkmark;
</script>
