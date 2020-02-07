<template>
    <textarea
        class="textarea"
        v-bind:style="style"
        v-bind:class="classes"
        v-bind:value="value"
        v-bind:placeholder="placeholder"
        v-bind:disabled="disabled"
        v-bind:id="id"
        ref="textarea"
        v-on:input="onInput($event.target.value)"
        v-on:focus="onFocus"
        v-on:blur="onBlur"
        v-on:keydown="onKeydown"
    />
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.textarea {
    appearance: none;
    background-color: $white;
    border: 1px solid $light-white;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    color: $black;
    display: inline-block;
    font-family: $font-family;
    font-size: 13px;
    font-weight: 500;
    height: 98px;
    letter-spacing: 0.3px;
    line-height: 20px;
    outline: none;
    padding: 8px 12px 8px 12px;
    resize: none;
    transition: background-color 0.2s ease, border-color 0.2s ease;
    width: 100%;
}

.textarea.monospaced {
    font-family: consolas, monospace;
    letter-spacing: 0px;
}

.textarea.dark {
    background-color: $soft-blue;
}

.textarea.border-strong {
    border-width: 2px;
}

.textarea::placeholder {
    color: $medium-grey;
    font-family: $font-family;
}

.textarea:hover {
    border-color: $aqcua-blue;
}

.textarea:focus {
    background-color: $white;
    border-color: $aqcua-blue;
    color: $black;
}

.textarea.dark:focus {
    box-shadow: 0px 1px 8px 0px rgba(32, 33, 36, 0.14);
}

.textarea:disabled {
    opacity: 0.4;
}
</style>

<script>
export const Textarea = {
    name: "textarea-ripe",
    props: {
        variant: {
            type: String,
            default: null
        },
        border: {
            type: String,
            default: "thin"
        },
        id: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        monospaced: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: null
        },
        fontSize: {
            type: Number,
            default: null
        },
        fontWeight: {
            type: Number,
            default: null
        },
        resize: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            heightData: this.height,
            textareaHeight: null
        };
    },
    computed: {
        style() {
            const height = Math.max(this.heightData || 0, this.textareaHeight || 0) || null;
            const base = {
                width: this.width === null ? null : `${this.width}px`,
                height: height === null ? null : `${height}px`,
                "font-size": this.fontSize === null ? null : `${this.fontSize}px`,
                "font-weight": this.fontWeight === null ? null : `${this.fontWeight}`
            };
            return base;
        },
        classes() {
            const base = {
                resize: this.resize,
                monospaced: this.monospaced
            };
            if (this.variant) base[this.variant] = true;
            if (this.border) base[`border-${this.border}`] = true;
            return base;
        }
    },
    watch: {
        height(value) {
            this.heightData = value;
        },
        resize() {
            this.$nextTick(() => {
                this.calculate();
            });
        },
        value() {
            this.$nextTick(() => {
                this.calculate();
            });
        }
    },
    methods: {
        focus() {
            this.$refs.textarea.focus();
        },
        bur() {
            this.$refs.textarea.bur();
        },
        calculate() {
            if (this.resize) {
                const previous = this.$refs.textarea.offsetHeight;
                this.$refs.textarea.style.height = "auto";
                try {
                    const extraHeight =
                        this.$refs.textarea.offsetHeight - this.$refs.textarea.clientHeight;
                    this.textareaHeight = this.$refs.textarea.scrollHeight + extraHeight;
                } finally {
                    this.$refs.textarea.style.height = `${previous}px`;
                }
            } else {
                this.textareaHeight = null;
            }
        },
        onInput(value) {
            this.$emit("update:value", value);
        },
        onFocus() {
            this.$emit("focus");
        },
        onBlur() {
            this.$emit("blur");
        },
        onKeydown(event) {
            this.$emit("keydown", event);
        }
    },
    mounted: function() {
        this.heightData =
            this.heightData === null ? this.$refs.textarea.offsetHeight : this.heightData;
    }
};

export default Textarea;
</script>
