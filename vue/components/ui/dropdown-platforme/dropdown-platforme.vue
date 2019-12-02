<template>
    <div class="dropdown-container">
        <div class="options-container">
            <div class="option">
                Option1 example
            </div>
            <div class="option">
                Option2 example
            </div>
        </div>

        <select class="dropdown-platforme">
            <option v-bind:value="options.id" v-for="options in options" v-bind:key="options.id">
                {{ options.text }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.dropdown-container .options-container {
    margin: 8px 0px 0px 0px;
}

.dropdown-container .options-container .option {
    color: $dark;
    font-family: $font-family;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    line-height: 32px;
    height: 32px;
    border: 1px solid gray;
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
