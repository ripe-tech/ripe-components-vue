<template>
    <div class="rich-textarea" v-bind:class="classes" v-on:click="onClick">
        <textarea-ripe
            class="textarea"
            v-bind:variant="variant"
            v-bind:value.sync="valueData"
            v-bind:placeholder="placeholder"
            v-bind:disabled="disabled"
            v-bind:resize="resize"
            v-bind:id="id"
            ref="textarea"
        />
        <div class="options">
            <button-icon
                class="button-attachment"
                v-bind:disabled="disabled"
                v-bind:icon="'clip'"
                v-if="attachment"
                v-on:click="onAttachmentClick()"
            />
            <button-icon
                class="button-smile"
                v-bind:disabled="disabled"
                v-bind:icon="'happy-face'"
                v-if="smile"
                v-on:click="onSmileClick()"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.rich-textarea {
    background-color: $white;
    border: 1px solid $light-white;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    display: inline-block;
    font-size: 0px;
    padding: 0px 0px 0px 0px;
    width: 100%;
}

.rich-textarea:focus-within {
    border: 1px solid $aqcua-blue;
}

.rich-textarea .textarea,
.rich-textarea .textarea:focus,
.rich-textarea .textarea:hover,
.rich-textarea .textarea:disabled {
    background-color: transparent;
    border: none;
    border-radius: 6px 6px 0px 0px;
    height: 56px;
    width: 100%;
}

.rich-textarea.disabled {
    opacity: 0.4;
}

.rich-textarea .options {
    background: #fafafa;
    border-radius: 0px 0px 6px 6px;
    border-top: 1px solid #e4e8f0;
    padding: 6px 12px 6px 12px;
}
</style>

<script>
export const RichTextarea = {
    name: "rich-textarea",
    props: {
        id: {
            type: String,
            default: null
        },
        variant: {
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
        resize: {
            type: Boolean,
            default: true
        },
        attachment: {
            type: Boolean,
            default: true
        },
        smile: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            valueData: this.value
        };
    },
    watch: {
        value(value) {
            this.valueData = value;
        },
        valueData(value) {
            this.$emit("update:value", value);
        }
    },
    computed: {
        classes() {
            const base = { disabled: this.disabled };
            if (this.variant) base[this.variant] = true;
            return base;
        }
    },
    methods: {
        focusTextarea() {
            this.$refs.textarea.focus();
        },
        onClick() {
            this.focusTextarea();
        },
        onAttachmentClick() {
            this.$emit("click:attachment");
        },
        onSmileClick() {
            this.$emit("click:smile");
        }
    }
};

export default RichTextarea;
</script>
