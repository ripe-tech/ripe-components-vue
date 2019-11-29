<template>
    <div class="radio-platforme">
        <label-platforme class="title" v-bind:text="labelTitle" v-if="labelTitle" />
        <div class="radio-group">
            <div class="radio-choice" v-for="(iten, index) in itens" v-bind:key="index">
                <label-platforme class="radio-label">
                    <input
                        v-bind:class="{
                            disabled: disabled,
                            error: error
                        }"
                        v-bind:disabled="disabled"
                        type="radio"
                        class="radio"
                        v-bind:value="iten.value"
                        v-bind:id="iten.value + index"
                        v-model="picked"
                    />
                    <div class="circular-button" />
                    <span class="label-text">{{ iten.label ? iten.label : iten.value }}</span>
                </label-platforme>
            </div>
        </div>
        <!-- DELETE ME \/ -->
        <p v-on:click="picked = null">
            Debug clear picked value: {{ picked ? picked : "null" }}
        </p>
        <!-- DELETE ME /\ -->
        <label-platforme
            class="footer"
            v-bind:size="'small'"
            v-bind:text="labelFooter"
            v-if="labelFooter"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.radio-platforme {
    display: inline-block;
}

.title {
    color: $pale-grey;
    display: block;
}

.radio-choice {
    display: block;
    padding: 3.5px 0px 3.5px 0px;
}

.radio-label {
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    line-height: 12px;
}

.radio-label:hover {
    opacity: 0.8;
}

.radio {
    display: none;
}

.radio:checked + .circular-button {
    background-color: #ffffff;
    border-color: $dark;
    border-width: 4px;
    padding: 1px 1px 1px 1px;
}

.radio.disabled + .circular-button {
    background-color: #f4f5f7;
    border: 2px solid #f4f5f7;
}

.radio.disabled:checked + .circular-button {
    background-color: #a6adb4;
    border-color: #f6f7f9;
    border-width: 4px;
    padding: 1px 1px 1px 1px;
}

.radio.error + .circular-button {
    background-color: #f4f5f7;
    border: 2px solid $red;
}

.radio.error:checked + .circular-button {
    border: 4px solid $red;
}

.radio.error:focus + .circular-button {
    border-color: #4c9aff;
}

.radio:active + .circular-button {
    background-color: $dark;
    border-color: #d6dade;
    border-width: 4px;
    padding: 1px 1px 1px 1px;
}

.radio-choice-text {
    display: inline-block;
    font-size: 14px;
    line-height: 13px;
    vertical-align: bottom;
}

.circular-button {
    background-color: #fafbfc;
    border: 2px solid #dfe1e5;
    border-radius: 50%;
    display: inline-block;
    height: 2px;
    margin: 0px 0px 0px 6px;
    padding: 3px 3px 3px 3px;
    vertical-align: bottom;
    width: 2px;
}

.label-text {
    color: $grey;
    margin: 0px 0px 0px 6px;
}

.footer {
    color: $pale-grey;
    display: block;
    padding: 4px 0px 0px 0px;
}
</style>
<script>
export const RadioPlatforme = {
    name: "radio-platforme",
    props: {
        itens: {
            type: Array,
            default: () => []
        },
        checkedValue: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        },
        labelTitle: {
            type: String,
            default: null
        },
        labelFooter: {
            type: String,
            default: false
        }
    },
    data: function() {
        return {
            picked: this.checkedValue
        };
    },
    mounted: function() {
        console.log("default value", this.checkedValue);
    }
};

export default RadioPlatforme;
</script>
