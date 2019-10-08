<template>
    <div class="generic-field-container">
        <img class="icon" v-bind:src="iconSrc" v-if="iconSrc" v-show="iconVisible" />
        <input
            class="generic-field-platforme"
            v-bind:class="[iconVisible ? '' : 'icon-invisible']"
            v-bind:type="type"
            v-bind:value="value"
            v-bind:placeholder="placeholder"
            v-bind:required="required"
            v-bind:autofocus="autofocus"
            v-bind:style="'width: ' + width + 'px; ' + 'height: ' + height + 'px;'"
            ref="input"
            v-on:input="$emit('update:value', $event.target.value)"
            v-on:focus="focused = true"
            v-on:blur="focused = false"
            v-on:keydown.esc="blur()"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.generic-field-container {
    align-items: center;
    display: inline-flex;
}

.generic-field-platforme {
    background-color: #f2f2f2;
    border: 1px solid transparent;
    box-sizing: border-box;
    font-size: 13px;
    line-height: 34px;
    padding-left: 33px;
    padding-right: 12px;
    transition: width 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.icon {
    display: inline-block;
    margin-left: 8px;
    position: absolute;
    width: 20px;
}

.generic-field-platforme:hover {
    border-color: #dddddd;
}

.generic-field-platforme:focus {
    background-color: #ffffff;
    border-color: #dddddd;
    box-shadow: 0px 1px 8px 0px rgba(32, 33, 36, 0.14);
}

.generic-field-platforme.icon-invisible {
    padding-left: 12px;
}

.generic-field-platforme.grow:focus {
    width: 340px;
}
</style>

<script>
export const GenericFieldPlatforme = {
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
        required: {
            type: Boolean,
            default: true
        },
        iconVisible: {
            type: Boolean,
            default: false
        },
        iconSrc: {
            type: String,
            default: null
        }
    },
    watch: {
        focused(isFocused) {
            if (isFocused) {
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

export default GenericFieldPlatforme;
</script>
