<template>
    <button
        class="button"
        v-bind:class="{ arrow: arrowAnimation, scale: scaleAnimation }"
        v-bind:style="{ backgroundColor: backgroundColor, color: textColor, borderColor: borderColor }"
    >
        {{ text }}
    </button>
</template>

<style scoped>
.button.arrow:hover:not(:disabled)::after {
    right: 0px;
}

.button.arrow::after {
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
    font-weight: 500;
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
