<template>
    <div class="form-input" v-bind:class="classes">
        <slot name="header">
            <label-ripe
                class="header"
                v-bind:style="headerStyle"
                v-bind:class="headerClasses"
                v-bind:text="header"
                v-bind:for="id"
                v-if="header"
            />
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
                    v-bind:size="'small'"
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
        footerVariant: {
            type: String,
            default: null
        },
        headerMinWidth: {
            type: Number,
            default: null
        },
        footerMinWidth: {
            type: Number,
            default: null
        }
    },
    computed: {
        headerStyle() {
            return { "min-width": `${this.headerMinWidth}px` };
        },
        footerStyle() {
            return { "min-width": `${this.footerMinWidth}px` };
        },
        classes() {
            const base = {};
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
        }
    }
};

export default FormInput;
</script>
