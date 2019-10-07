<template>
    <input
        class="generic-field-platforme"
        v-bind:type="type"
        v-bind:value="value"
        v-bind:placeholder="placeholder"
        v-bind:required="required"
        v-bind:autofocus="autofocus"
        ref="input"
        v-on:input="$emit('update:value', $event.target.value)"
        v-on:focus="focused = true"
        v-on:blur="focused = false"
        v-on:keydown.esc="blur()"
    />
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.generic-field-platforme {
    display: inline-block;
    height: 34px;
    line-height: 34px;
}

.generic-field-platforme {
    background-color: #f2f2f2;
    border: 1px solid transparent;
    box-sizing: border-box;
    font-size: 13px;
    height: 34px;
    line-height: 34px;
    margin-left: 24px;
    padding-left: 12px;
    padding-right: 12px;
    transition: width 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
    width: 304px;
}

.generic-field-platforme:hover {
    border-color: #dddddd;
}

.generic-field-platforme:focus {
    background-color: #ffffff;
    border-color: #dddddd;
    box-shadow: 0px 1px 8px 0px rgba(32, 33, 36, 0.14);
}

.generic-field-platforme.grow:focus {
    width: 340px;
}
</style>

<script>
export const genericFieldPlatforme = {
    props: {
        value: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: "text"
        },
        placeholder: {
            type: String,
            default: "Name"
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            focused: false,
            suggestionsVisible: false
        };
    },
    watch: {
        focused(value) {
            if (value) {
                this.suggestionsVisible = true;
            } else {
                setTimeout(() => {
                    this.suggestionsVisible = false;
                }, 100);
            }
        }
    },
    mounted: function() {
        this.autofocus && this.$refs.input.focus();
    },
    methods: {
        blur() {
            this.$refs.input.blur();
        }
    }
};

export default genericFieldPlatforme;
</script>
