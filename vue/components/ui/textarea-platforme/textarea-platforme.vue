<template>
    <textarea
        class="textarea"
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

.textarea {
    background-color: #f9fafd;
    border: 1px solid $light-white;
    border-radius: 6px;
    box-sizing: border-box;
    color: $grey;
    display: block;
    font-family: $font-family;
    font-size: 14px;
    letter-spacing: 0.3px;
    line-height: 20px;
    outline: none;
    padding: 8px 8px 8px 8px;
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
    background-color: $light-grey;
    border: 1px solid #dfe1e5;
}

.textarea:focus {
    background-color: $white;
    border: 2px solid $aqcua-blue;
    color: $black;
    padding: 7px 7px 7px 7px;
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
        initialWidth: {
            type: Number,
            default: null
        },
        initialHeight: {
            type: Number,
            default: null
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
            const base = {};
            if (this.initialWidth) base.width = `${this.initialWidth}px`;
            if (this.initialHeight) base.height = `${this.initialHeight}px`;

            if (!this.resize) {
                base.resize = "none";
            }

            return base;
        }
    }
};

export default TextareaPlatforme;
</script>
