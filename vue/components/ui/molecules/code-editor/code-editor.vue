<template>
    <div class="code-editor">
        <textarea-ripe v-bind:value="value" v-bind:monospaced="true" v-bind:resize="true" />
        <div class="overlay">
            <div class="lines">
                <div class="line" v-for="(line, index) in lines" v-bind:key="index">
                    <div class="number">{{ index + 1 }}</div>
                    <div class="text">{{ line }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

// TODO scroll, adicionar overflow e sincronizar scroll da textarea com o overlay

.code-editor {
    position: relative;
}

.code-editor > textarea,
.code-editor > .overlay {
    padding: 8px 12px 8px 12px;
    border: 1px solid $light-white;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    outline: none;
}

.code-editor > .textarea {
    padding-left: 52px
}

.code-editor > .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    white-space: pre;

    font-size: 0px;
    padding-top: 9px;
    pointer-events: none;

    // debug
    background-color: #ff00ff40;
}

.code-editor > textarea,
.code-editor > .overlay > .lines > .line > .number,
.code-editor > .overlay > .lines > .line > .text {
    font-family: "consolas", monospace;
    letter-spacing: 0px;
    line-height: 18px;
    font-size: 13px;
    font-weight: 500;
}

.code-editor > .overlay > .lines > .line > .number,
.code-editor > .overlay > .lines > .line > .text {
    display: inline-block;
}

.code-editor > .overlay > .lines > .line > .number {
    width: 40px;
    pointer-events: all;
}
</style>

<script>
export const CodeEditor = {
    name: "code-editor",
    props: {
        value: {
            type: String,
            default: null
        }
    },
    computed: {
        lines() {
            console.log("value", this.value);
            return this.value ? this.value.split("\n") : [];
        }
    }
};

export default CodeEditor;
</script>
