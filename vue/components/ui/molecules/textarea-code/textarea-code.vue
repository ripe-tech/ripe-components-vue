<template>
    <div class="textarea-code">
        <textarea-ripe v-bind:textarea-props="textareaProps" />
        <div class="overlay">
            <div class="lines-number">
                <div class="num">1</div>
                <div class="num">2</div>
                <div class="num">3</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.textarea-code {
    position: relative;
    font-size: 13px;
    font-weight: 500;
}

.textarea-code .overlay {
    top: 0;
    left: 0;
    margin: 0px 0px 0px 0px;
    position: absolute;
    background-color: #ff00ff40;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
</style>

<script>
export const TextareaCode = {
    name: "textarea-code",
    props: {
        textareaProps: {
            type: Object,
            default: () => ({})
        }
    }
};

export default TextareaCode;
</script>
