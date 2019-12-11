<template>
    <div
        class="rich-textarea"
        v-bind:class="{ disabled: disabled }"
        v-on:click="onClick()"
    >
        <textarea
            class="textarea"
            v-bind:value="value"
            v-bind:placeholder="placeholder"
            v-bind:disabled="disabled"
            v-bind:id="id"
            ref="textarea"
            v-on:input="onInput($event.target.value)"
        />
        <div class="options">
            <button-icon-platforme
                v-bind:disabled="disabled"
                v-bind:icon="option.icon"
                v-for="option in optionsItems"
                v-bind:key="option.icon"
                v-on:click="onOptionsItemClick(option)"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.rich-textarea {
    border: 1px solid $light-white;
    border-radius: 6px 6px 6px 6px;
    padding: 0px 0px 30px 0px;
    position: relative;
    background-color: $white;
    cursor: pointer;
}

.rich-textarea:focus-within {
    border: 2px solid $aqcua-blue;
}

.rich-textarea .textarea {
    border: none;
    box-sizing: border-box;
    color: $grey;
    display: block;
    font-family: $font-family;
    font-size: 14px;
    letter-spacing: 0.3px;
    line-height: 20px;
    outline: none;
    padding: 8px 18px 8px 18px;
    resize: none;
    width: 100%;
}

.rich-textarea:focus-within .textarea {
    color: $black;
    padding: 7px 17px 7px 17px;
}

.rich-textarea.disabled,
.rich-textarea.disabled .textarea {
    background-color: #f6f7f9;
    color: $medium-grey;
    cursor: default;
}

.rich-textarea:focus-within,
.rich-textarea:focus-within .textarea,
.rich-textarea:focus-within .options {
    background-color: $white;
}

.rich-textarea .textarea::placeholder {
    color: $medium-grey;
    font-family: $font-family;
}

.rich-textarea .options {
    position: absolute;
    bottom: 3px;
    left: 10px;
}

.rich-textarea:focus-within .options {
    bottom: 2px;
    left: 9px;
}
</style>

<script>
export const RichTextareaPlatforme = {
    name: "rich-textarea-platforme",
    props: {
        id: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: null
        },
        optionsItems: {
            type: Array,
            default: () => []
        },
        placeholder: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {};
    },
    methods: {
        focusTextarea() {
            this.$refs.textarea.focus();
        },
        emitValueChanged(value) {
            if (this.disabled) return;
            this.$emit("update:value", value);
        },
        emitOptionsItemClick(event) {
            if (this.disabled) return;
            this.$emit(`click:${event}`);
        },
        onInput(value) {
            this.emitValueChanged(value);
        },
        onClick() {
            this.focusTextarea();
        },
        onOptionsItemClick(item) {
            this.emitOptionsItemClick(item.event);
        }
    }
};

export default RichTextareaPlatforme;
</script>
