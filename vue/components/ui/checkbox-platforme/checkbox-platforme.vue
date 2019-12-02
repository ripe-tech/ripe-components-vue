<template>
    <div class="checkbox-platforme">
        <label-platforme class="title" v-bind:text="labelTitle" v-if="labelTitle" />
        <div class="checkbox-group">
            <div
                class="checkbox-choice"
                v-bind:class="{
                    checked: picked.includes(item.value),
                    disabled: disabled,
                    error: error
                }"
                v-for="(item, index) in items"
                v-bind:key="index"
                v-on:click="onClick(item)"
            >
                <input
                    v-bind:class="{
                        disabled: disabled,
                        error: error
                    }"
                    type="checkbox"
                    v-bind:disabled="disabled"
                    class="checkbox"
                    v-bind:value="item.value"
                    v-bind:id="item.value + index"
                    v-model="picked"
                />
                <div class="checkbox-square" />
                <label-platforme class="label-text" v-bind:for="item.value">
                    {{ item.label ? item.label : item.value }}
                </label-platforme>
            </div>
        </div>
        <!-- DELETE ME \/ -->
        <p v-on:click="picked = []">
            Debug clear chcked values: {{ picked ? picked : "null" }}
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

.checkbox-platforme {
    display: inline-block;
}

.title {
    color: $pale-grey;
    display: block;
}

.checkbox-choice {
    display: block;
    padding: 3.5px 0px 3.5px 0px;
}

.checkbox-label {
    display: inline-block;
    font-size: 14px;
    line-height: 12px;
}

.checkbox-choice.disabled:hover,
.checkbox-choice.disabled:hover ::v-deep label {
    cursor: not-allowed;
}

.checkbox-choice:hover {
    cursor: pointer;
    opacity: 0.8;
}

.checkbox {
    display: none;
}

.checkbox-choice.checked > .checkbox-square {
    background: url("~./assets/check.svg") center / 7px 6px no-repeat $dark;
    border: 2px solid $dark;
    padding: 3px 3px 3px 3px;
}

.checkbox-choice.disabled > .checkbox-square {
    background: none center / 7px 6px no-repeat #f4f5f7;
    border: 2px solid #f4f5f7;
}

.checkbox-choice.disabled.checked > .checkbox-square {
    background: url("~./assets/check-gray.svg") center / 7px 6px no-repeat #f4f5f7;
    border: 2px solid #f6f7f9;
    padding: 3px 3px 3px 3px;
}

.checkbox-choice.error > .checkbox-square {
    background-color: #f4f5f7;
    border: 2px solid $red;
}

.checkbox-choice.error.checked > .checkbox-square {
    background: url("~./assets/check.svg") center / 7px 6px no-repeat $dark;
    border: 2px solid $red;
}

.checkbox-choice:active:not(.disabled) > .checkbox-square {
    background: url("~./assets/check-dark.svg") center / 7px 6px no-repeat #f4f5f7;
    border: 2px solid #d6dade;
    padding: 3px 3px 3px 3px;
}

.checkbox-choice-text {
    display: inline-block;
    font-size: 14px;
    line-height: 13px;
    vertical-align: bottom;
}

.checkbox-square {
    background-color: #fafbfc;
    border: 2px solid #dfe1e5;
    border-radius: 2px 2px 2px 2px;
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
export const CheckboxPlatforme = {
    name: "checkbox-platforme",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        initialChoices: {
            type: Array,
            default: () => []
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
            picked: this.initialChoices
        };
    },
    methods: {
        onClick(item) {
            if (this.disabled || item.disabled) {
                return;
            }
            this.picked.includes(item.value)
                ? this.removeItem(item.value)
                : this.picked.push(item.value);
        },
        removeItem(item) {
            this.picked = this.picked.filter(arrItem => {
                return item !== arrItem;
            });
        }
    }
};

export default CheckboxPlatforme;
</script>
