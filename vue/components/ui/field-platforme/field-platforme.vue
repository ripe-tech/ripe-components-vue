<template>
    <div class="field-container">
        <img class="icon" v-bind:src="iconSrc" v-if="iconSrc" v-show="iconVisible" />
        <input
            class="field-platforme"
            v-bind:class="[{ iconVisible: iconVisible, disabled: disabled }]"
            v-bind:style="{ width: width + 'px', height: height + 'px' }"
            v-bind:type="type"
            v-bind:value="value"
            v-bind:disabled="disabled"
            v-bind:placeholder="placeholder"
            v-bind:required="required"
            v-bind:autofocus="autofocus"
            ref="input"
            v-on:keydown.esc="blur()"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.field-container {
    align-items: center;
    display: inline-flex;
}

.icon {
    display: inline-block;
    margin-left: 8px;
    position: absolute;
    width: 20px;
}

.field-platforme {
    background-color: #f2f2f2;
    border: 1px solid transparent;
    box-sizing: border-box;
    font-size: 13px;
    line-height: 34px;
    padding-left: 12px;
    padding-right: 12px;
    transition: width 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.field-platforme:hover {
    border-color: #dddddd;
}

.field-platforme:focus {
    background-color: #ffffff;
    border-color: #dddddd;
    box-shadow: 0px 1px 8px 0px rgba(32, 33, 36, 0.14);
}

.field-platforme.iconVisible {
    padding-left: 33px;
}

.field-platforme.disabled:hover {
    background-color: #dadada;
    border-color: #ff9b9b;
    cursor: not-allowed;
}
</style>

<script>
export const FieldPlatforme = {
    props: {
        value: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "text"
        },
        placeholder: {
            type: String,
            default: "Name"
        },
        width: {
            type: String,
            default: "304"
        },
        height: {
            type: String,
            default: "34"
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: true
        },
        iconSrc: {
            type: String,
            default: null
        }
    },
    computed: {
        iconVisible: function() {
            return this.iconSrc !== "" && this.iconSrc !== null;
        }
    },
    methods: {
        blur() {
            this.$refs.input.blur();
        }
    }
};

export default FieldPlatforme;
</script>
