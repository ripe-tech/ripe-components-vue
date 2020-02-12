<template>
    <div class="switcher" v-bind:style="toggleAnimationStyle" v-on:click="onClick">
        <div class="switcher-button" v-bind:style="toggleAnimation" />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.switcher {
    background-color: #cccccc;
    border: 2px solid #cccccc;
    border-radius: 500px;
    cursor: pointer;
    height: 20px;
    transition-duration: 0.4s;
    transition-property: border-color, background-color;
    width: 40px;
}

.switcher > .switcher-button {
    background-color: #ffffff;
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
    computed: {
        toggleAnimation() {
            const base = {};
            if (this.isToggled) {
                base.marginLeft = "20px";
            }
            return base;
        },
        toggleAnimationStyle() {
            const base = {};
            if (this.isToggled) {
                base.borderColor = "#1d1d1d";
                base.backgroundColor = "#1d1d1d";
            }
            return base;
        }
    },
    data: function() {
        return {
            isToggled: this.toggled
        };
    },
    watch: {
        toggled(value) {
            this.isToggled = value;
        }
    },
    methods: {
        toggle() {
            this.isToggled = !this.isToggled;
        },
        onClick() {
            this.toggle();
            this.$emit("update:toggled", this.isToggled);
        }
    }
};

export default Switcher;
</script>
