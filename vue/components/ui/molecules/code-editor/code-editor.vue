<template>
    <div class="code-editor">
        <textarea-ripe
            v-bind:value.sync="valueData"
            v-bind:disabled="disabled"
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
                    <tooltip
                        v-bind:text="line.error.error"
                        v-bind:variant="'red'"
                        v-bind:orientation="'top'"
                        v-bind:alignment="'left'"
                        v-bind:text-alignment="'left'"
                        v-bind:width="250"
                        v-bind:visible="true"
                        v-bind:border-radius="'6px'"
                        v-bind:delay="100"
                        v-if="line.error"
                    >
                        <span class="number">{{ line.number }}</span>
                    </tooltip>
                    <span class="number" v-else>{{ line.number }}</span>
                    <span class="text">{{ line.line }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

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

.code-editor > textarea,
.code-editor > .overlay > .lines > .line .number,
.code-editor > .overlay > .lines > .line > .text {
    font-family: "consolas", monospace;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 18px;
}

.code-editor > .overlay > .lines > .line .number,
.code-editor > .overlay > .lines > .line > .text {
    display: inline-block;
}

.code-editor > .overlay > .lines > .line .number {
    border-right: 2px solid transparent;
    box-sizing: border-box;
    color: #979797;
    margin: 0px 4px 0px 0px;
    padding: 0px 2px 0px 0px;
    pointer-events: all;
    text-align: right;
    width: 40px;
}

.code-editor > .overlay > .lines > .line.error .number {
    border-right: 2px solid #ae2929;
}

.code-editor > .overlay > .lines > .line > .text {
    color: transparent;
    white-space: pre;
}
</style>

<script>
import { normalize } from "ripe-commons";

export const CodeEditor = {
    name: "code-editor",
    props: {
        value: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
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

            // gets content inside JSON brackets
            code = code.trim();
            const contentMatch = code.match(/{([^}]+)}/);

            if (!contentMatch) return errors;

            const content = contentMatch[1];
            const contentLines = content.split("\n");

            // gets line number of last not empty line
            let lastNotEmptyLineIdx = null;
            for (let i = contentLines.length - 1; i >= 0; i--) {
                const line = contentLines[i].trim();
                if (line.length !== 0) {
                    lastNotEmptyLineIdx = i;
                    break;
                }
            }

            // as not every browser handles JSON.parse() SyntaxError the same way, we
            // can't have a consistent way to obtain the line number of the error. This
            // approach tries to validate with JSON.parse() line by line instead of doing
            // a full parse thus allowing to pinpoint the error location.
            for (let i = 0; i < contentLines.length; i++) {
                let line = contentLines[i].trim();

                // skips verification of empty lines
                if (line.length === 0) continue;

                try {
                    if (i < lastNotEmptyLineIdx) {
                        if (!line.endsWith(",")) {
                            throw new SyntaxError("Missing comma at end of line");
                        }

                        // remove last "," from line if isn't the last line with content
                        line = line.replace(/,$/, "");
                    }

                    JSON.parse(`{${line}}`);
                } catch (error) {
                    let errorMsg = error.message;
                    errorMsg = errorMsg.replace(/^JSON.parse: /, "");
                    errorMsg = errorMsg.replace(/ at line (\d+) column (\d+)/, "");
                    errorMsg = errorMsg.replace(/^JSON Parse error: /, "");
                    errors.push({
                        error: normalize(errorMsg, { capitalize: true }),
                        line: i + 1,
                        column: null
                    });
                    return errors;
                }
            }

            return errors;
        }
    }
};

export default CodeEditor;
</script>
