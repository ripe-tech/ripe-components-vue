<template>
    <div class="selector-container" v-bind:style="{ width: width, height: height }">
        <img class="select_arrow" src="~./assets/arrow.svg" />
        <select
            class="selector"
            v-bind:style="{ width: width, height: height }"
            v-bind:required="required"
        >
            <option selected disabled value="">
                {{ label }}
            </option>
            <option
                class="option"
                v-bind:value="item.value"
                v-for="item in items"
                v-bind:id="item.id"
                v-bind:key="item.id"
            >
                {{ item.text }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.selector-container {
    display: inline-block;
    position: relative;
}

.select_arrow {
    pointer-events: none;
    position: absolute;
    right: 10px;
    top: 7px;
}

.selector {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: #f2f2f2;
    border: 0px none #7b7b7b;
    border-radius: 0px;
    caret-color: #7b7b7b;
    color: #7b7b7b;
    column-rule-color: #7b7b7b;
    cursor: pointer;
    font-size: 13px;
    outline: #7b7b7b none 0px;
    padding: 9px 12px;
    padding-right: 34px;
    perspective-origin: 100px 19px;
    text-align-last: center;
    transform-origin: 100px 19px;
}
</style>

<script>
export const SelectorPlatforme = {
    name: "selector-platforme",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        label: {
            type: String,
            default: "Select one"
        },
        width: {
            type: String,
            default: ""
        },
        height: {
            type: String,
            default: ""
        },
        required: {
            type: Boolean,
            default: false
        }
    }
};
export default SelectorPlatforme;
</script>
