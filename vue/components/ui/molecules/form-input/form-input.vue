<template>
    <div class="form-input" v-bind:class="classes">
        <label-ripe
            class="header"
            v-bind:style="headerStyle"
            v-bind:text="header"
            v-bind:for="id"
            v-if="header"
        />
        <div class="content">
            <slot />
            <label-ripe
                class="footer"
                v-bind:size="'small'"
                v-bind:text="footer"
                v-bind:for="id"
                v-if="footer"
            />
            <div class="text-container">
                <div class="text" v-if="error">
                    <span class="icon icon-error" />
                    <label-ripe
                        class="label-information"
                        v-bind:text="error"
                        v-bind:color="'error'"
                    />
                </div>
                <div class="text" v-if="warning">
                    <span class="icon icon-warning" />
                    <label-ripe class="label-information" v-bind:text="warning" />
                </div>
                <div class="text" v-if="success">
                    <span class="icon icon-success" />
                    <label-ripe
                        class="label-information"
                        v-bind:text="success"
                        v-bind:color="'success'"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.form-input.form-input-inline {
    display: flex;
}

.form-input.form-input-inline .header {
    line-height: 34px;
    margin: 0px 4px 0px 0px;
}

.form-input .header,
.form-input .footer {
    display: block;
}

.form-input .header {
    margin-bottom: 6px;
    min-width: 120px;
}

.form-input .footer {
    color: $medium-grey;
    margin-top: 6px;
}

.form-input .content {
    font-size: 0px;
    line-height: 0px;
}

.form-input.form-input-inline .content {
    flex: 1;
}

.form-input .content .text-container .text .label-information {
    margin: 0px 0px 0px 4px;
    vertical-align: middle;
}

.form-input .icon {
    background-position: center;
    background-repeat: no-repeat;
    display: inline-block;
    height: 15px;
    vertical-align: middle;
    width: 15px;
}

.form-input .icon-success {
    background-image: url("~./assets/check-filled.svg");
}

.form-input .icon-warning {
    background-image: url("~./assets/warning.svg");
}

.form-input .icon-error {
    background-image: url("~./assets/error.svg");
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
        header: {
            type: String,
            default: null
        },
        footer: {
            type: String,
            default: null
        },
        error: {
            type: String,
            default: null
        },
        warning: {
            type: String,
            default: null
        },
        success: {
            type: String,
            default: null
        },
        variant: {
            type: String,
            default: null
        },
        headerMinWidth: {
            type: Number,
            default: null
        }
    },
    computed: {
        headerStyle() {
            return { "min-width": `${this.headerMinWidth}px` };
        },
        classes() {
            const base = {};

            switch (this.variant) {
                case "inline":
                    base["form-input-inline"] = true;
                    break;

                default:
                    break;
            }

            return base;
        }
    }
};

export default FormInput;
</script>
