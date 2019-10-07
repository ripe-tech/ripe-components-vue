<template>
    <button
        class="button button-content"
        v-bind:class="{
            arrow: arrowAnimation,
            scale: scaleAnimation
        }"
        v-bind:style="{
            'background-color': backgroundColor,
            'color': textColor,
            'border-color': borderColor
        }"
    >
        {{ text }}
    </button>
</template>

<style scoped>
.button-content.arrow:hover:not(:disabled)::after {
    right: 0px;
}

.button-content.arrow::after {
    background-image: url("~./assets/right-arrow.svg");
    background-repeat: no-repeat;
    content: "";
    display: inline-block;
    height: 32px;
    overflow: hidden;
    position: absolute;
    right: -32px;
    top: 50%;
    transform: translateY(-50%);
    transform-origin: 50% 50%;
    transition: 0.2s;
    width: 32px;
}

.button {
    border: 2px solid;
    border-radius: 999px;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: 300;
    line-height: inherit;
    outline: none;
    overflow: hidden;
    padding: 8px 30px 8px 30px;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    transition: 0.2s;
    vertical-align: middle;
    white-space: nowrap;
    width: auto;
}

.button.scale:hover {
    transform: scale(1.1);
}

button {
    appearance: button;
    border-image: initial;
    border-style: solid;
    margin: 0px 0px 0px 0px;
    padding: 1px 7px 2px;
}

.button-content {
    font-weight: 500;
}
</style>

<script>
export const GenericButtonPlatforme = {
    name: "generic-button-platforme",
    props: {
        text: {
            type: String,
            default: "Click"
        },
        backgroundColor: {
            type: String,
            default: "#0957AF"
        },
        textColor: {
            type: String,
            default: "#ffffff"
        },
        borderColor: {
            type: String,
            default: "#40c4ff"
        },
        scaleAnimation: {
            type: Boolean,
            default: "False"
        },
        arrowAnimation: {
            type: Boolean,
            default: "False"
        }
    }
};

export default GenericButtonPlatforme;
</script>
