<template>
        <div class="rich-textarea">
            <textarea-platforme
                v-bind:placeholder="'Say something here...'"
                v-bind:resize="false"
                v-on:update:value="value => onTextareaValue(value)"
            />
            <div class="options">
                <div class="optionExample" />
                <div class="optionExample" />
                <div class="optionExample" />
                <div class="optionExample" />
                <div class="optionExample" />
            </div>
        </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";



.rich-textarea .options {
    font-size: 0px; //It fixes white spaces between divs
    //background-color: lightseagreen;
    margin-top: -31px;
    padding: 0px 9px 0px 9px;
}

.rich-textarea .optionExample {
    background: url("~./assets/clip.svg") center;
    background-size: 22px 22px;
    display: inline-block;
    height: 22px;
    margin: 4px 4px 4px 4px;
    width: 22px;
}

</style>

<script>
export const RichTextareaPlatforme = {
    name: "rich-textarea-platforme",
    props: {
        hello: {
            type: String,
            default: null
        }
    }
};

export default RichTextareaPlatforme;
</script>
