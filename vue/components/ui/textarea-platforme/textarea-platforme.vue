<template>
    <div class="textarea">
        <label-platforme
            class="label-description"
            v-bind:text="descriptionLabel"
            v-bind:for="id"
            v-if="descriptionLabel"
        />
        <textarea
            v-bind:style="textAreaStyle"
            v-bind:value="value"
            v-bind:placeholder="placeholder"
            v-bind:disabled="disabled"
            v-bind:id="id"
            v-on:input="onInput($event.target.value)"
        />
        <label-platforme
            class="label-help"
            v-bind:size="'small'"
            v-bind:text="helpLabel"
            v-bind:for="id"
            v-if="helpLabel"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.textarea .label {
    display: block;
}

.textarea textarea {
    background-color: #f9fafd;
    border: solid 1px $light-white;
    border-radius: 6px;
    color: $grey;
    display: block;
    font-family: $font-family;
    font-size: 14px;
    letter-spacing: 0.3px;
    margin: 1px;
    outline: none;
    padding: 8px 8px 8px 8px;
}

.textarea textarea::placeholder {
    color: $medium-grey;
    font-family: $font-family;
}

.textarea textarea:disabled,
.textarea textarea:disabled:hover {
    background-color: #f6f7f9;
    color: $medium-grey;
}

.textarea textarea:hover {
    background-color: $light-grey;
    border: solid 1px #dfe1e5;
}

.textarea textarea:focus {
    background-color: $white;
    border: solid 2px $aqcua-blue;
    color: $black;
    margin: -1px 0px -1px 0px;
}

.textarea .label-description {
    margin-bottom: 7px;
}

.textarea .label-help {
    color: $medium-grey;
    margin-top: 4px;
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
        descriptionLabel: {
            type: String,
            default: null
        },
        helpLabel: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        initialWidth: {
            type: Number,
            default: 250
        },
        initialHeight: {
            type: Number,
            default: 50
        },
        resize: {
            type: Boolean,
            default: true
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
        }
    }
};

export default TextareaPlatforme;
</script>
