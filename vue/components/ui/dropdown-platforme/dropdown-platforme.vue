<template>
    <div class="dropdown-container">
        <div class="dropdown-platforme">
            <div class="dropdown">
                <div class="options-container" v-for="option in options" v-bind:key="option.id">
                    <slot name="options" v-bind:option="option">
                        <div class="option">{{ option.text }}</div>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.dropdown-container .dropdown {
    margin: 8px 0px 0px 0px;
    width: 300px; //TODO set this as a prop
    border-radius: 6px;
    box-shadow: 0 6px 24px 0 rgba(67, 86, 100, 0.15);
    border: solid 1px $dropdown-border-color;
    background-color: $dropdown-background-color;
}

.dropdown-container .options-container ::v-deep .option {
    color: $dark;
    font-family: $font-family;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    line-height: 32px;
    height: 32px;
    padding: 0px 0px 0px 16px;
}
</style>

<script>
export const DropdownPlatforme = {
    name: "dropdown-platforme",
    props: {
        options: {
            type: Array,
            default: () => []
        }
    },
    data: function() {
        return {};
    }
};

export default DropdownPlatforme;
</script>
