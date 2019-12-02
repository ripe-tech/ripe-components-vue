<template>
    <div class="dropdown-container">
        
        <select class="dropdown-platforme">
            <option v-bind:value="options.id"
                    v-for="options in options"
                    v-bind:key="options.id"
                    >
                {{ options.text }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";



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
        return { };
    }
};

export default DropdownPlatforme;
</script>
