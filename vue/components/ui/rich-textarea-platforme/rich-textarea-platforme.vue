<template>
    <div class="rich-textarea"
        v-bind:style="richTextAreaStyle"
        >
        <textarea
            class="textarea"
            ref="textarea"
            v-bind:value="value"
            v-bind:style="textAreaStyle"
            v-bind:placeholder="placeholder"
            v-bind:disabled="disabled"
            v-bind:id="id"
            v-on:input="onInput($event.target.value)"
        />
        <div class="options" v-on:click="onOptionsClick()">
            <button-icon-platforme
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
    position: relative;
    padding: 0px 0px 30px 0px;
    background-color: #f9fafd;
    border: 1px solid $light-white;
    border-radius: 6px;
}

.rich-textarea .textarea {
    width:100%;
    background-color: #f9fafd;
    box-sizing: border-box;
    display: block;
    outline: none;
    border: none;
    padding: 8px 8px 8px 8px;
    resize: none;
    color: $grey;
    font-family: $font-family;
    font-size: 14px;
    letter-spacing: 0.3px;
    line-height: 20px;
}

.rich-textarea .textarea::placeholder {
    color: $medium-grey;
    font-family: $font-family;
}

.rich-textarea .options {
    margin: 0px 9px 0px 9px;
    opacity: 0.3;
}


.rich-textarea:hover,
.rich-textarea:hover .textarea,
.rich-textarea:hover .options{
    background-color: $light-grey;
}

.rich-textarea:hover{
    border: 1px solid #dfe1e5;
}

.rich-textarea:focus-within,
.rich-textarea:focus-within .textarea,
.rich-textarea:focus-within .options
{
    background-color: $white;
}

.rich-textarea:focus-within
{
    border: 2px solid $aqcua-blue;
    margin: 0px 0px -2px 0px;
}

.rich-textarea:focus-within .textarea
{
    color: $black;
    padding: 7px 7px 7px 7px;
}

.rich-textarea:focus-within .options
{
    margin: -1px 9px 0px 8px;
    opacity: 1;
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
        },
        initialWidth: {
            type: Number,
            default: null
        },
        initialHeight: {
            type: Number,
            default: null
        }
    },
    data: function() {
        return { };
    },
    methods: {
        emitValueChanged(value) {
            this.$emit("update:value", value);
        },
        onInput(value) {
            this.emitValueChanged(value);
        },
        onOptionsClick()
        {
            this.$refs.textarea.focus();
        },
        onOptionsItemClick(item) {
            this.$emit(`click:${item.event}`);
        }
    },
    computed: {
        richTextAreaStyle() {
            const base = {};
            if (this.initialWidth) base.width = `${this.initialWidth}px`;
            if (this.initialHeight) base.height = `${this.initialHeight}px`;

            return base;
        },
        textAreaStyle() {
            const base = {};
            if (this.initialHeight) base.height = `${this.initialHeight}px`;

            return base;
        }
    }
};

export default RichTextareaPlatforme;
</script>
