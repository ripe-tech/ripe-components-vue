<template>
    <div class="form-input" v-bind:class="classes">
        <slot name="header">
            <tooltip
                v-bind="{
                    text: tooltipProps.text,
                    orientation: 'top',
                    ...tooltipProps
                }"
                v-if="tooltipText || tooltipProps"
            >
                <label-ripe class="header" v-bind="headerProps" v-if="header" />
            </tooltip>
            <label-ripe class="header" v-bind="headerProps" v-else-if="header" />
        </slot>
        <div class="flex-container">
            <div class="content">
                <slot />
            </div>
            <slot name="footer">
                <label-ripe
                    class="footer"
                    v-bind:style="footerStyle"
                    v-bind:class="footerClasses"
                    v-bind:size="footerSize"
                    v-bind:text="footer"
                    v-bind:for="id"
                    v-if="footer"
                />
            </slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.form-input.form-input-align-left {
    text-align: left;
}

.form-input.form-input-align-center {
    text-align: center;
}

.form-input.form-input-align-right {
    text-align: right;
}

.form-input.form-input-inline {
    display: flex;
}

.form-input.form-input-inline .flex-container {
    flex: 1;
}

.form-input .header,
.form-input .footer {
    display: block;
}

.form-input .header.error,
.form-input .footer.error {
    color: $error;
}

.form-input .header.warning,
.form-input .footer.warning {
    color: $warning;
}

.form-input .header.success,
.form-input .footer.success {
    color: $success;
}

.form-input .header {
    margin-bottom: 6px;
}

.form-input.form-input-inline .header {
    line-height: 34px;
    margin: 0px 4px 0px 0px;
    min-width: 120px;
}

.form-input .content {
    font-size: 0px;
    line-height: 0px;
}

.form-input.form-input-inline .content {
    align-items: center;
    display: flex;
    height: 34px;
    line-height: 34px;
}

.form-input .footer {
    color: $medium-grey;
    margin-top: 6px;
}
</style>

<script>
export const FormInput = {
    name: "form-input",
    props: {
        id: {
            type: String,
            default: null
        },
        variant: {
            type: String,
            default: null
        },
        alignment: {
            type: String,
            default: "left"
        },
        header: {
            type: String,
            default: null
        },
        footer: {
            type: String,
            default: null
        },
        headerVariant: {
            type: String,
            default: null
        },
        headerSize: {
            type: String,
            default: "normal"
        },
        footerVariant: {
            type: String,
            default: null
        },
        footerSize: {
            type: String,
            default: "small"
        },
        headerMinWidth: {
            type: Number,
            default: null
        },
        footerMinWidth: {
            type: Number,
            default: null
        },
        tooltipText: {
            type: String,
            default: null
        },
        tooltipProps: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        headerStyle() {
            const base = { "min-width": `${this.headerMinWidth}px` };
            return base;
        },
        footerStyle() {
            const base = { "min-width": `${this.footerMinWidth}px` };
            return base;
        },
        classes() {
            const base = {};
            if (this.alignment) base[`form-input-align-${this.alignment}`] = true;
            if (this.variant) base[`form-input-${this.variant}`] = true;
            return base;
        },
        headerClasses() {
            const base = {};
            if (this.headerVariant) base[`${this.headerVariant}`] = true;
            return base;
        },
        footerClasses() {
            const base = {};
            if (this.footerVariant) base[`${this.footerVariant}`] = true;
            return base;
        },
        headerProps() {
            return {
                style: this.headerStyle,
                class: this.headerClasses,
                size: this.headerSize,
                text: this.header,
                for: this.id
            };
        }
    }
};

export default FormInput;
</script>
