<template>
    <div class="selector-container">
        <svg
            class="select_arrow"
            fill="#7b7b7b"
            height="24"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
            <path d="M0-.75h24v24H0z" fill="none" />
        </svg>
        <select class="selector" required>
            <option selected disabled value="">
                {{ label }}
            </option>
            <option
                class="option"
                v-bind:value="item.value"
                v-for="item in items.filter(v => v !== null && v !== undefined)"
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
    background: #f2f2f2 none repeat scroll 0% 0% / auto padding-box border-box;
    border: 0px none rgb(123, 123, 123);
    border-radius: 0px;
    caret-color: rgb(123, 123, 123);
    color: #7b7b7b;
    column-rule-color: rgb(123, 123, 123);
    cursor: pointer;
    font-size: 13px;
    outline: rgb(123, 123, 123) none 0px;
    padding: 9px 12px;
    padding-right: 34px;
    perspective-origin: 100px 19px;
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
        }
    }
};
export default SelectorPlatforme;
</script>
