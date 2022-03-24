<template>
    <div class="code-editor">
        <textarea-ripe v-bind:value="value" v-bind:monospaced="true" v-bind:resize="true" />
        <div class="overlay">
            <div class="lines">
                <div class="line" v-for="(line, index) in lines" v-bind:key="index">{{ line }}</div>
                <!-- <div class="line" v-for="(line, index) in lines" v-bind:key="index"><pre>{{ line }}</pre></div> -->
                <!-- <div class="line" v-for="(line, index) in lines" v-bind:key="index"> -->
                    <!-- <div class="number">{{ index }}</div> -->
                   <!--  <pre><div class="text">{{ line }}</div></pre> -->
                <!-- </div> -->
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

    font-family: "consolas", monospace;
    letter-spacing: 0px;
    line-height: 18px;
    font-size: 13px;
    font-weight: 500;
    outline: none;
}

.code-editor > .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    white-space: pre;

    padding-top: 9px;

    // need to adjust
    // padding: 8px 12px 8px 12px;

    // debug
    background-color: #ff00ff40;

    // display: none;
    // margin: 0px 0px 0px 0px;
    // width: 100%;
    // height: 100%;
    // pointer-events: none;
}

/*
.lines-number > .line {
    font-size: 13px;
    height: 13px;
    line-height: 13px;
}

.lines-number > .line > .number {
    display: none;
    // margin: 0px -20px 0px 0px;
}
*/
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
