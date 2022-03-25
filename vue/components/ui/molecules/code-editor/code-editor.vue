<template>
    <div class="code-editor">
        <textarea-ripe
            v-bind:value.sync="valueData"
            v-bind:monospaced="true"
            v-bind:resize="true"
        />
        <div class="overlay">
            <div class="lines">
                <div
                    class="line"
                    v-bind:class="lineClasses(line)"
                    v-for="line in linesInfo"
                    v-bind:key="line.number"
                >
                    <div class="line-number">
                        <div class="number">
                            {{ line.number }}
                        </div>
                        <tooltip
                            v-bind:text="'test exemplo e tail'"
                            v-bind:variant="'red'"
                            v-bind:orientation="'top'"
                            v-bind:alignment="'left'"
                            v-bind:width="150"
                            v-bind:visible="true"
                            v-bind:border-radius="'6px'"
                            v-bind:delay="100"
                        >
                            <div class="highlight">
                                <div class="color" />
                                <div class="hover-area" />
                            </div>
                        </tooltip>
                    </div>
                    <span class="line-text">{{ line.line }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

// TODO scroll, adicionar overflow e sincronizar scroll da textarea com o overlay
// TODO remover cor das letras

.code-editor {
    position: relative;
}

.code-editor > textarea,
.code-editor > .overlay {
    border: 1px solid $light-white;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    outline: none;
    padding: 8px 12px 8px 0px;
}

.code-editor > .textarea {
    padding-left: 44px;
}

.code-editor > .overlay {
    font-size: 0px;
    height: 100%;
    left: 0;
    padding-top: 9px;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
}

.lines > .line > .line-text {
    white-space: pre;
}

.code-editor > textarea,
.code-editor > .overlay > .lines > .line > .line-number > .number,
.code-editor > .overlay > .lines > .line > .line-text {
    font-family: "consolas", monospace;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 18px;
}

.code-editor > .overlay > .lines > .line > .line-number,
.code-editor > .overlay > .lines > .line > .line-text {
    display: inline-block;
}

.code-editor > .overlay > .lines > .line > .line-number {
    box-sizing: border-box;
    margin: 0px 4px 0px 0px;
    pointer-events: all;
    position: relative;
    text-align: right;
    width: 40px;
}

.code-editor > .overlay > .lines > .line > .line-number > .number,
.code-editor > .overlay > .lines > .line > .line-number .highlight {
    display: inline-block;
}

.code-editor > .overlay > .lines > .line > .line-number > .number {
    box-sizing: border-box;
    padding: 0px 2px 0px 2px;
}

.code-editor > .overlay > .lines > .line > .line-number .highlight {
    height: 18px;
    position: relative;
    vertical-align: bottom;
    width: 2px;
}

.code-editor > .overlay > .lines > .line > .line-number .highlight > .color {
    height: 100%;
    width: 100%;
}

.code-editor > .overlay > .lines > .line > .line-number .highlight.error > .color {
    background: #ae2929
}

.code-editor > .overlay > .lines > .line > .line-number .highlight > .hover-area {
    height: 100%;
    left: -5px;
    padding: 0px 5px 0px 8px;
    position: absolute;
    top: 0px;
}

</style>

<script>
export const CodeEditor = {
    name: "code-editor",
    props: {
        value: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: "json"
        },
        validate: {
            type: Function,
            default: null
        },
        debounceTime: {
            type: Number,
            default: 250
        }
    },
    data: function() {
        return {
            valueData: this.value,
            errors: [],
            timeout: null
        };
    },
    watch: {
        value(value) {
            this.valueData = value;
        },
        valueData(value) {
            this.checkForErrors();
            this.$emit("value", value);
        }
    },
    computed: {
        _validate() {
            if (this.validate) return this.validate;

            switch (this.type) {
                case "json":
                    return this.validateJson;
                default:
                    throw new Error(`Unsupported type: ${this.type}`);
            }
        },
        lines() {
            return this.valueData ? this.valueData.split("\n") : [];
        },
        linesInfo() {
            return this.lines.map((line, index) => {
                const number = index + 1;
                const error = this.errors.find(e => e.line === number);
                return {
                    line: line,
                    number: number,
                    error: error
                };
            });
        }
    },
    methods: {
        lineClasses(line) {
            const base = {};
            if (line.error) base.error = true;
            return base;
        },
        checkForErrors() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.errors = this._validate(this.valueData);
            }, this.debounceTime);
        },
        validateJson(code) {
            const errors = [];
            try {
                JSON.parse(code);
            } catch (error) {
                if (!(error instanceof SyntaxError)) return;

                const errorMsg = error.message.match(/JSON.parse: ([\s\S]*?) at line/)[1];
                const line = error.message.match(/ at line (\d+)/)[1];
                const column = error.message.match(/ at line [0-9] column (\d+)/)[1];
                errors.push({
                    error: errorMsg,
                    line: parseInt(line),
                    column: parseInt(column)
                });
            }
            return errors;
        }
    }
};

export default CodeEditor;
</script>
