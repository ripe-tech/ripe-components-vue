<template>
    <div class="dropdown-platforme">
        <div class="dropdown-button" v-on:click="onToggleDropdown">
            {{ placeholder }}
        </div>
        <div class="dropdown" v-show="visible">
            <div class="options-container" v-for="option in options" v-bind:key="option.id">
                <slot name="options" v-bind:option="option">
                    <div class="option" v-on:mousedown="onSelectOption(option)">
                        {{ option.text }}
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

//TODO, hover, disable, focus, etc

.dropdown-platforme .dropdown-button,
.dropdown-platforme .dropdown {
    cursor: pointer;
    font-family: $font-family;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: $dark;
}

.dropdown-button {
    background: url("~./assets/chevron-down.svg") no-repeat;
    background-color: #f9fafd;
    background-position: right 12px center;
    background-size: 14px 14px;
    border: solid 1px #e4e8f0;
    border-radius: 6px;
    height: 40px;
    line-height: 40px;
    padding: 0px 8px;
    width: 300px; //TODO set this as a prop
}

.dropdown-platforme .dropdown {
    background-color: $dropdown-background-color;
    border: solid 1px $dropdown-border-color;
    border-radius: 6px;
    box-shadow: 0 6px 24px 0 rgba(67, 86, 100, 0.15);
    margin: 8px 0px 0px 0px;
    position: absolute;
    width: 316px; //TODO set this as a prop
}

.dropdown-platforme .dropdown .options-container ::v-deep .option {
    height: 32px;
    line-height: 32px;
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
        },
        placeholder: {
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            visible: false
        };
    },
    methods: {
        onSelectOption(option){
            this.selectOption(option);
        },
        selectOption(option){
            this.$emit("update:option", option);
            this.toggleDropdown();
        },
        onToggleDropdown() {
            this.toggleDropdown();
        },
        toggleDropdown() {
            this.visible = !this.visible;
        }
    }
};

export default DropdownPlatforme;
</script>
