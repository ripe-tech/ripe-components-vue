<template>
    <div class="label-value">
        <slot name="label">
            <p class="label">
                {{ label }}
            </p>
        </slot>
        <slot name="value">
            <p class="value">
                {{ value }}
            </p>
        </slot>
        <slot name="note">
            <p class="note" v-if="note">
                {{ note }}
            </p>
        </slot>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.label-value {
    display: inline-block;
    font-weight: 600;
    max-width: 100%;
    overflow: hidden;
    text-align: left;
    text-transform: uppercase;
}

.label-value .label,
.label-value .value,
.label-value .note {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.label-value .label {
    color: $label-color;
    font-size: 12px;
    margin: 0px 0px 6px 0px;
}

.label-value .value {
    font-size: 14px;
    line-height: 18px;
    margin: 0px 0px 0px 0px;
    word-break: break-all;
    word-break: break-word;
}

.label-value .value.small {
    font-size: 12px;
}

.label-value .note {
    color: $label-color;
    font-size: 11px;
    line-height: 16px;
    margin-bottom: 0px;
    margin-top: 2px;
}
</style>

<script>
export const LabelValuePlatforme = {
    name: "label-value-platforme",
    props: {
        label: {
            type: String,
            mandatory: true
        },
        value: {
            type: String,
            mandatory: true
        },
        note: {
            type: String,
            default: null
        }
    }
};

export default LabelValuePlatforme;
</script>
