<template>
    <div class="label-value">
        <div class="label-value-component label">
            <slot name="label">
                <p class="label-text">
                    {{ label }}
                </p>
            </slot>
        </div>
        <div class="label-value-component value">
            <slot name="value">
                <p class="value-text">
                    {{ value }}
                </p>
            </slot>
        </div>
        <div class="label-value-component note">
            <slot name="note">
                <p class="note-text">
                    {{ note }}
                </p>
            </slot>
        </div>
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

.label-value .label-value-component {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.label-value .label-value-component > p {
    margin: 0px 0px 0px 0px;
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
