<template>
    <div class="selector-container">
        <div class="select__arrow"></div>
        <select class="selector">
            <option id="OPTION_1">Option1</option>
            <option id="OPTION_2">Option2</option>
        </select>
    </div>
</template>



<style lang="scss" scoped>
@import "css/variables.scss";

.selector-container{
      position: relative;
     display: inline-block;
}

.selector {
    color: rgb(123, 123, 123);
    cursor: pointer;
    height: 38px;
    text-decoration: none solid rgb(123, 123, 123);
    text-size-adjust: 100%;
    width: 200px;
    column-rule-color: rgb(123, 123, 123);
    perspective-origin: 100px 19px;
    transform-origin: 100px 19px;
    caret-color: rgb(123, 123, 123);
    background: rgb(230, 230, 230) none repeat scroll 0% 0% / auto padding-box border-box;
    border: 0px none rgb(123, 123, 123);
    font: normal normal 400 normal 16px / 18.4px sans-serif;
    outline: rgb(123, 123, 123) none 0px;
    padding: 10px 15px;
    -webkit-appearance: none;
    -moz-appearance: none;
}



.select__arrow {
  position: absolute;
  top: 16px;
  right: 15px;
  width: 0;
  height: 0;
  pointer-events: none;
  border-style: solid;
  border-width: 8px 5px 0 5px;
  border-color: #7b7b7b transparent transparent transparent;
}
.select select:hover ~ .select__arrow,
.select select:focus ~ .select__arrow {
  border-top-color: #000;
}
.select select:disabled ~ .select__arrow {
  border-top-color: #ccc;
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
