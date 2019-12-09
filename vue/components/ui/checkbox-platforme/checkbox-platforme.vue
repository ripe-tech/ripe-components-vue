<template>
    <div class="checkbox">
        <label-platforme class="header" v-bind:text="header" v-if="header" />
        <div class="choices">
            <div
                class="choice"
                v-bind:class="{
                    checked: values[item.value],
                    disabled: disabled || item.disabled,
                    error: error || item.error
                }"
                v-bind:index="index"
                v-bind:tabindex="item.disabled ? '' : '0'"
                v-for="(item, index) in items"
                v-bind:key="index"
                v-on:click="onClick(item)"
                v-on:keydown.space="onSpace(item)"
            >
                <input type="checkbox" class="value" v-bind:id="item.value" />
                <div class="checkbox-square" />
                <label class="label" for="item.value">
                    {{ item.label ? item.label : item.value }}
                </label>
            </div>
        </div>
        <label-platforme class="footer" v-bind:size="'small'" v-bind:text="footer" v-if="footer" />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.checkbox {
    display: inline-block;
}

.checkbox > .header,
.checkbox > .footer {
    color: $pale-grey;
    display: block;
}

.checkbox > .header {
    padding: 0px 0px 4px 0px;
}

.checkbox > .footer {
    padding: 4px 0px 0px 0px;
}

.choice {
    display: block;
    line-height: 13px;
    outline: none;
    padding: 10px 6px 10px 6px;
    user-select: none;
}

.choice:hover,
.choice:hover label {
    cursor: pointer;
}

.choice > .value {
    display: none;
}

.choice > .checkbox-square {
    background-color: #fafbfc;
    border: 2px solid #dfe1e5;
    border-radius: 2px 2px 2px 2px;
    display: inline-block;
    height: 4px;
    padding: 3px 3px 3px 3px;
    vertical-align: middle;
    width: 4px;
}

.choice:not(.disabled):not(.error):active > .checkbox-square {
    background: url("~./assets/check-dark.svg") center / 7px 6px no-repeat #f4f5f7;
    border: 2px solid #c3c9cf;
    padding: 3px 3px 3px 3px;
}

.choice.error > .checkbox-square {
    background-color: #f4f5f7;
    border: 2px solid $dark-red;
}

.choice.disabled > .checkbox-square {
    background: none center / 7px 6px no-repeat #f4f5f7;
    border: 2px solid #f4f5f7;
}

.choice.checked > .checkbox-square {
    background: url("~./assets/check.svg") center / 7px 6px no-repeat $dark;
    border: 2px solid $dark;
    padding: 3px 3px 3px 3px;
}

.choice.error.checked > .checkbox-square {
    background: url("~./assets/check.svg") center / 7px 6px no-repeat $dark;
    border: 2px solid $dark-red;
}

.choice.disabled.checked > .checkbox-square {
    background: url("~./assets/check-gray.svg") center / 7px 6px no-repeat #f4f5f7;
    border: 2px solid #f6f7f9;
    padding: 3px 3px 3px 3px;
}

.choice:focus:not(.disabled) > .checkbox-square {
    border-color: $aqcua-blue;
}

.choice > .label {
    color: $grey;
    display: inline-block;
    font-size: 14px;
    line-height: 14px;
    margin: 0px 0px 0px 4px;
    vertical-align: middle;
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
        values: {
            type: Object,
            default: () => {}
        },
        disabled: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        },
        header: {
            type: String,
            default: null
        },
        footer: {
            type: String,
            default: false
        }
    },
    methods: {
        toggleItem(item) {
            this.values[item.value] ? this.removeItem(item) : this.addItem(item);
        },
        addItem(item) {
            if (this.disabled || item.disabled) return;
            if (this.values[item.value]) return;

            this.$emit("selected:value", item.value);

            const updated = Object.assign({}, this.values);
            updated[item.value] = true;
            this.$emit("update:values", updated);
        },
        removeItem(item) {
            if (this.disabled || item.disabled) return;
            if (!this.values[item.value]) return;

            this.$emit("unselected:value", item.value);

            const updated = Object.assign({}, this.values);
            delete updated[item.value];
            this.$emit("update:values", updated);
        },
        onSpace(item) {
            this.toggleItem(item);
        },
        onClick(item) {
            this.toggleItem(item);
        }
    }
};

export default CheckboxPlatforme;
</script>
