<template>
    <div class="rich-textarea">
        <textarea
            class="textarea"
            v-bind:id="id"
            v-bind:style="textAreaStyle"
            v-bind:value="value"
            v-bind:placeholder="placeholder"
            v-bind:disabled="disabled"
            v-on:input="onInput($event.target.value)"
        />
        <div class="options">
            <button-icon-platforme
                v-for="option in optionsItems"
                v-bind:key="option.icon"
                v-bind:icon="option.icon"
                v-on:click="onOptionsItemClick(option)"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";


.rich-textarea{
    position: relative;
}

.rich-textarea .textarea{
    resize: none;
}

.rich-textarea .options {
    font-size: 0px; //It fixes white spaces between divs
    position: absolute;
    bottom: 0px;
    padding: 0px 9px 0px 9px;
}

.rich-textarea .optionExample {
    background: url("~./assets/clip.svg") center;
    background-size: 22px 22px;
    display: inline-block;
    height: 22px;
    margin: 4px 4px 4px 4px;
    width: 22px;
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
        textAreaStyle() {
            const base = {};
            if (this.initialWidth) base.width = `${this.initialWidth}px`;
            if (this.initialHeight) base.height = `${this.initialHeight}px`;

            return base;
        }
    }
};

export default RichTextareaPlatforme;
</script>
