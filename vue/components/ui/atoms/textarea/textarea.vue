<template>
    <textarea
        class="textarea"
        v-bind:style="style"
        v-bind:value="value"
        v-bind:placeholder="placeholder"
        v-bind:disabled="disabled"
        v-bind:class="{ resize: resize }"
        v-bind:id="id"
        ref="textarea"
        v-on:input="onInput($event.target.value)"
    />
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.textarea {
    background-color: #f9fafd;
    border: 1px solid $light-white;
    border-radius: 6px;
    box-sizing: border-box;
    color: $grey;
    display: inline-block;
    font-family: $font-family;
    font-size: 14px;
    height: 98px;
    letter-spacing: 0.3px;
    line-height: 20px;
    outline: none;
    padding: 8px 8px 8px 8px;
    resize: none;
    width: 100%;
}

.textarea::placeholder {
    color: $medium-grey;
    font-family: $font-family;
}

.textarea:disabled,
.textarea:disabled:hover {
    background-color: #f6f7f9;
    color: $medium-grey;
}

.textarea:hover {
    background-color: $lighter-grey;
    border: 1px solid #dfe1e5;
}

.textarea:focus {
    background-color: $white;
    border-color: $aqcua-blue;
    color: $black;
}
</style>

<script>
export const Textarea = {
    name: "textarea-ripe",
    props: {
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
        width: {
            type: Number,
            default: null
        },
        height: {
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
                height: height === null ? null : `${height}px`
            };
            return base;
        }
    },
    watch: {
        height(value) {
            this.heightData = value;
        },
        resize() {
            this.calculate();
        },
        value() {
            this.calculate();
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
        }
    },
    mounted: function() {
        this.heightData =
            this.heightData === null ? this.$refs.textarea.offsetHeight : this.heightData;
    }
};

export default Textarea;
</script>
