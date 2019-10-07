<template>
    <button class="btn btn-content" v-bind:style="buttonStyleColor">
        {{ buttonText }}
    </button>
</template>

<style scoped>
.btn-content:hover:not(:disabled)::after {
    right: 4px;
}

.btn-content::after {
    background-image: url(https://d3moonnr9fkxfg.cloudfront.net/royal-canin.sprite--brand3--xs.svg?v=8-7-8);
    background-position: 45.45% 85.71%;
    background-repeat: no-repeat;
    content: "";
    display: inline-block;
    height: 32px;
    overflow: hidden;
    position: absolute;
    right: -32px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    width: 32px;
}

.btn {
    border: 2px solid transparent;
    border-radius: 999px;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: 300;
    line-height: inherit;
    outline: none;
    overflow: hidden;
    padding: 6px 27px;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    vertical-align: middle;
    white-space: nowrap;
    width: auto;
}

body {
    font-family: "RC TYPE", Roboto, Avenir, Helvetica, Arial, sans-serif;
}

button {
    align-items: flex-start;
    -webkit-appearance: button;
    appearance: button;
    border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
    border-image: initial;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    display: inline-block;
    font: 400 11px system-ui;
    letter-spacing: normal;
    margin: 0em;
    padding: 1px 7px 2px;
    text-align: center;
    text-indent: 0px;
    text-rendering: auto;
    text-shadow: none;
    text-transform: none;
    word-spacing: normal;
    -webkit-writing-mode: horizontal-tb !important;
    writing-mode: horizontal-tb !important;
}

.btn-content {
    font-weight: 500;
}
</style>

<script>
export const GenericButtonPlatforme = {
    name: "generic-button-platforme",
    data() {
        return {
            buttonStyleColor:
                "background-color: " +
                this.backgroundColor +
                "; " +
                "color: " +
                this.textColor +
                "; " +
                "border-color: " +
                this.borderColor
        };
    },
    props: {
        buttonText: {
            type: String,
            default: "Click"
        },
        backgroundColor: {
            type: String,
            default: "#40c4ff"
        },
        textColor: {
            type: String,
            default: "#ffffff"
        },
        borderColor: {
            type: String,
            default: "#40c4ff"
        }
    }
};

export default GenericButtonPlatforme;
</script>
