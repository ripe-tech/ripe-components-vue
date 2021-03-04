<template>
    <div class="padded" v-bind:style="style">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.padded {
    padding: 0px 16px 0px 16px;
}

body.mobile .padded {
    padding: 0px 0px 0px 0px;
}
</style>

<script>
export const Padded = {
    name: "padded",
    props: {
        paddingVertical: {
            type: Number,
            default: null
        },
        paddingHorizontal: {
            type: Number,
            default: null
        }
    },
    computed: {
        style() {
            const base = {};
            if (this.paddingVertical !== null) {
                base["padding-top"] = `${this.paddingVertical}px`;
                base["padding-bottom"] = `${this.paddingVertical}px`;
            }
            if (this.paddingHorizontal !== null) {
                base["padding-left"] = `${this.paddingHorizontal}px`;
                base["padding-right"] = `${this.paddingHorizontal}px`;
            }
            return base;
        }
    }
};

export default Padded;
</script>
