<template>
    <div class="switcher" v-bind:style="toggleAnimationStyle" v-on:click="onClick">
        <div class="switcher-button" v-bind:style="toggleAnimation" />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.switcher {
    background-color: $upper-grey;
    border: 2px solid $upper-grey;
    border-radius: 500px;
    cursor: pointer;
    height: 20px;
    transition-duration: 0.4s;
    transition-property: border-color, background-color;
    width: 40px;
}

.switcher > .switcher-button {
    background-color: $white;
    border-radius: 10px;
    height: 20px;
    transition-duration: 0.2s;
    transition-property: margin;
    width: 20px;
}
</style>

<script>
export const Switcher = {
    name: "switcher",
    props: {
        toggled: {
            type: Boolean
        }
    },
    data: function() {
        return {
            toggledData: this.toggled
        };
    },
    computed: {
        toggleAnimation() {
            const base = {};
            if (this.toggledData) {
                base.marginLeft = "20px";
            }
            return base;
        },
        toggleAnimationStyle() {
            const base = {};
            if (this.toggledData) {
                base.borderColor = "#1d1d1d";
                base.backgroundColor = "#1d1d1d";
            }
            return base;
        }
    },
    watch: {
        toggled(value) {
            this.toggledData = value;
        },
        toggledData(value) {
            this.$emit("update:toggled", value);
        }
    },
    methods: {
        toggle() {
            this.toggledData = !this.toggledData;
        },
        onClick() {
            this.toggle();
        }
    }
};

export default Switcher;
</script>
