<template>
    <div class="rich-textarea"
        v-bind:style="richTextAreaStyle"
        >
        <textarea
            class="textarea"
            v-bind:value="value"
            v-bind:style="textAreaStyle"
            v-bind:placeholder="placeholder"
            v-bind:disabled="disabled"
            v-bind:id="id"
            v-on:input="onInput($event.target.value)"
        />
        <div class="options">
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

.rich-textarea:hover,
.rich-textarea:hover .textarea{
    background-color: #f6f7f9;
    color: $medium-grey;
}



/*
.rich-textarea .textarea:disabled,
.rich-textarea .textarea:disabled:hover {
    background-color: #f6f7f9;
    color: $medium-grey;
}

.rich-textarea .textarea:hover {
    background-color: $light-grey;
    border: 1px solid #dfe1e5;
}

.rich-textarea .textarea:focus {
    background-color: $white;
    border: 2px solid $aqcua-blue;
    color: $black;
    padding: 7px 7px 7px 7px;
}

.rich-textarea .options {
    bottom: 0px;
    font-size: 0px; //It fixes white spaces between divs
    padding: 0px 9px 0px 9px;
    position: absolute;
}

.rich-textarea .optionExample {
    background-size: 22px 22px;
    display: inline-block;
    height: 22px;
    margin: 4px 4px 4px 4px;
    width: 22px;
}
*/

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
