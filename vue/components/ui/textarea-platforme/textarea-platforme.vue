<template>
    <textarea
        class="textarea"
        v-bind:class="{ flaghover, flagfocus }"
        v-bind:style="textAreaStyle"
        v-bind:value="value"
        v-bind:placeholder="placeholder"
        v-bind:disabled="disabled"
        v-bind:id="id"
        v-on:input="onInput($event.target.value)"
    />
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.textarea,
.textarea:hover,
.textarea:focus {
    background-color: #f9fafd;
    border: 1px solid $light-white;
    border-radius: 6px;
    box-sizing: border-box;
    color: $grey;
    display: block;
    font-family: $font-family;
    font-size: 12px;
    letter-spacing: 0.3px;
    line-height: 20px;
    outline: none;
    padding: 8px 8px 8px 8px;
    transition: 0.125s ease-in-out;
}

.flaghover:hover {
    background-color: $lighter-grey;
    border: 1px solid #dfe1e5;
    transition: 0.125s ease-in-out;
}

.flagfocus:focus {
    background-color: $white;
    border: 2px solid $aqcua-blue;
    color: $black;
    padding: 7px 7px 7px 7px;
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
</style>

<script>
export const TextareaPlatforme = {
    name: "textarea-platforme",
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
        hover: {
            type: Boolean,
            default: false
        },
        focus: {
            type: Boolean,
            default: false
        },
        initialWidth: {
            type: Number,
            default: 280
        },
        initialHeight: {
            type: Number,
            default: 98
        },
        resize: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        emitValueChanged(value) {
            this.$emit("update:value", value);
        },
        onInput(value) {
            this.emitValueChanged(value);
        }
    },
    computed: {
        textAreaStyle() {
            const base = {
                width: `${this.initialWidth}px`,
                height: `${this.initialHeight}px`
            };

            if (!this.resize) {
                base.resize = "none";
            }

            return base;
        },
        flaghover() {
            return this.hover;
        },
        flagfocus() {
            return this.focus;
        }
    }
};

export default TextareaPlatforme;
</script>
