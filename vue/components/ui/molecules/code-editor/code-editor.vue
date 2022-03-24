<template>
    <div class="code-editor">
        <textarea-ripe v-bind:value="value" v-bind:monospaced="true" v-bind:resize="true" />
        <div class="overlay">
            <div class="lines-number">
                <div class="line" v-for="(line, index) in lines" v-bind:key="index">
                    <div class="number">{{ index }}</div>
                    <pre><div class="text">{{ line }}</div></pre>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.code-editor {
    position: relative;
    font-size: 13px;
    font-weight: 500;
    font-family: "consolas", monospace;
    letter-spacing: 0px;
    line-height: 18px;
}

.code-editor .overlay {
    top: 0;
    left: 0;
    margin: 0px 0px 0px 0px;
    position: absolute;
    background-color: #ff00ff40;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.lines-number > .line {
    font-size: 13px;
    height: 13px;
    line-height: 13px;
}

.lines-number > .line > .number {
    display: none;
    // margin: 0px -20px 0px 0px;
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
