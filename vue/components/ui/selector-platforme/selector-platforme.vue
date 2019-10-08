<template>
    <div class="selector-container">

        <svg class="select__arrow" fill="#7b7b7b" height="24" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path>
<path d="M0-.75h24v24H0z" fill="none"></path>
</svg>
        <select class="selector" required>
            <option selected disabled value="">Select one</option>
            <option
                class="option"
                v-for="item in items.filter(v => v !== null && v !== undefined)"
                v-bind:key="item.id"
                v-bind:id="item.id"
                v-bind:value="item.value"
            >
            {{item.text}}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.selector-container{
    position: relative;
    display: inline-block;
    //width: 100%;
    margin-left: 24px;
}

.selector {
    color: #7b7b7b;
    //width: 100%;
    cursor: pointer;
    column-rule-color: rgb(123, 123, 123);
    perspective-origin: 100px 19px;
    transform-origin: 100px 19px;
    caret-color: rgb(123, 123, 123);
    background: #f2f2f2 none repeat scroll 0% 0% / auto padding-box border-box;
    border: 0px none rgb(123, 123, 123);
    outline: rgb(123, 123, 123) none 0px;
    border-radius: 0px;
    font-size: 13px;
    padding: 9px 12px;
    padding-right: 34px;
    -webkit-appearance: none;
    -moz-appearance: none;
}

.select__arrow {
  position: absolute;
  top: 7px;
  right: 10px;
  pointer-events: none;
}
</style>

<script>
export const selectorPlatforme = {
    name: "dropdown-platforme",
    props: {
        items: {
            type: Array,
            default: () => []
        }
    }
};
export default selectorPlatforme;
</script>
