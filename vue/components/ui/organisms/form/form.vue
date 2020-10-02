<template>
    <container-ripe
        class="form"
        v-bind:title="title"
        v-bind:header-buttons="buttons"
        v-on:header-button:click="onHeaderButtonClick"
        v-on:header-button:click:delete="onDeleteClick"
    >
        <form class="form-form" ref="form" v-on:submit.stop.prevent="onSubmit">
            <tabs v-bind:tabs="tabs">
                <template v-for="(columns, tab) in fields" v-slot:[tab]>
                    <div
                        class="column"
                        v-bind:style="columnStyle(tab)"
                        v-for="(column, index) in columns"
                        v-bind:key="index"
                    >
                        <div class="section" v-for="section in column" v-bind:key="section.title">
                            <h3 class="section-title">{{ section.title }}</h3>
                            <template v-for="field in section.fields">
                                <form-input
                                    class="section-field"
                                    v-bind:header="
                                        field.label !== undefined ? field.label : field.value
                                    "
                                    v-bind="field.formInputProps"
                                    v-bind:key="field.value"
                                >
                                    <template
                                        v-if="field.type === 'text' && field.meta === 'image-url'"
                                    >
                                        <input-ripe
                                            v-bind:type="inputType(field)"
                                            v-bind="field.props"
                                            v-bind:value="values[field.value]"
                                            v-on:update:value="value => onValue(field.value, value)"
                                        />
                                        <image-ripe
                                            class="text-image"
                                            v-bind:src="values[field.value] || field.imageSrc"
                                        />
                                    </template>
                                    <textarea-ripe
                                        v-bind="field.props"
                                        v-bind:value="values[field.value]"
                                        v-else-if="
                                            field.type === 'text' && field.meta === 'longtext'
                                        "
                                        v-on:update:value="value => onValue(field.value, value)"
                                    />
                                    <input-ripe
                                        v-bind:type="inputType(field)"
                                        v-bind="field.props"
                                        v-bind:value="values[field.value]"
                                        v-else-if="field.type === 'text'"
                                        v-on:update:value="value => onValue(field.value, value)"
                                    />
                                    <select-ripe
                                        v-bind="field.props"
                                        v-bind:value="values[field.value]"
                                        v-else-if="field.type === 'enum'"
                                        v-on:update:value="value => onValue(field.value, value)"
                                    >
                                        <template v-slot:selected="{ item }">
                                            <slot
                                                v-bind:name="'select-selected'"
                                                v-bind:item="item"
                                            >
                                                <slot
                                                    v-bind:name="`${field.value}-select-selected`"
                                                    v-bind:item="item"
                                                />
                                            </slot>
                                        </template>
                                        <template v-slot="{ item }">
                                            <slot v-bind:name="'select'" v-bind:item="item">
                                                <slot
                                                    v-bind:name="`${field.value}-select`"
                                                    v-bind:item="item"
                                                />
                                            </slot>
                                        </template>
                                    </select-ripe>
                                    <switcher
                                        v-bind="field.props"
                                        v-bind:checked="values[field.value]"
                                        v-else-if="field.type === 'boolean'"
                                        v-on:update:checked="value => onValue(field.value, value)"
                                    />
                                    <files-uploader
                                        v-bind="field.props"
                                        v-bind:files="values[field.value]"
                                        v-else-if="field.type === 'file'"
                                        v-on:update:files="value => onValue(field.value, value)"
                                    />
                                </form-input>
                            </template>
                        </div>
                    </div>
                </template>
            </tabs>
            <form-buttons
                v-bind:reject="Boolean(onDiscard)"
                v-bind:accept="Boolean(onSave)"
                v-bind:reject-button-props="{
                    text: 'Discard',
                    small: true,
                    ...rejectButtonProps
                }"
                v-bind:accept-button-props="{
                    text: 'Save',
                    icon: 'save',
                    type: 'submit',
                    small: true,
                    loading: saving,
                    minWidth: 100,
                    ...acceptButtonProps
                }"
                v-on:click:reject="onReject"
            />
        </form>
    </container-ripe>
</template>

<style lang="scss" scoped>
.form {
    animation: fade-into-rise 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
}

.form > .form-form {
    padding: 0px 14px 0px 14px;
}

.form > .form-form > .tabs ::v-deep > .header {
    margin: 0px 10px 0px 10px;
}

.form > .form-form > .tabs .column {
    box-sizing: border-box;
    display: inline-block;
    padding: 10px 10px 10px 10px;
    vertical-align: top;
}

body.tablet .form > .form-form > .tabs .column,
body.mobile .form > .form-form > .tabs .column {
    box-sizing: border-box;
    margin: 0px 0px 0px 0px;
    padding: 0px 10px 0px 10px;
    width: 100%;
}

.form > .form-form > .tabs .column > .section > .section-title {
    color: #1d2631;
    font-size: 16px;
    font-weight: 600;
    margin: 24px 0px 24px 0px;
    text-align: left;
}

.form > .form-form > .tabs .column > .section > .section-field {
    margin: 0px 0px 20px 0px;
}

.form > .form-form > .tabs .column > .section > .section-field:last-child {
    margin-bottom: 0px;
}

.form > .form-form > .tabs .column > .section > .section-field .text-image {
    box-sizing: border-box;
    display: block;
    margin: 20px auto 0px auto;
    max-height: 70px;
    max-width: 100%;
    padding: 0px 10px 0px 10px;
}
</style>

<script>
import { partMixin } from "../../../../mixins";

export const Form = {
    name: "form-ripe",
    mixins: [partMixin],
    props: {
        title: {
            type: String | Array,
            required: true
        },
        fields: {
            type: Object,
            required: true
        },
        values: {
            type: Object,
            required: true
        },
        navigation: {
            type: Boolean,
            default: true
        },
        headerButtonsBefore: {
            type: Array,
            default: () => []
        },
        headerButtonsAfter: {
            type: Array,
            default: () => []
        },
        previous: {
            type: String | Object,
            default: null
        },
        next: {
            type: String | Object,
            default: null
        },
        rejectButtonProps: {
            type: Object,
            default: () => ({})
        },
        acceptButtonProps: {
            type: Object,
            default: () => ({})
        },
        onDiscard: {
            type: Function,
            default: null
        },
        onSave: {
            type: Function,
            default: null
        },
        onDelete: {
            type: Function,
            default: null
        },
        saveNotification: {
            type: Boolean,
            default: true
        },
        saveNotificationMessage: {
            type: Function,
            default: values => "Changes saved!"
        },
        saveNotificationProps: {
            type: Object,
            default: () => ({})
        },
        errorNotification: {
            type: Boolean,
            default: true
        },
        errorNotificationMessage: {
            type: Function,
            default: error => error.message || "Something went wrong"
        },
        errorNotificationProps: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
            saving: false,
            deleting: false,
            valuesData: this.values
        };
    },
    computed: {
        buttons() {
            return [
                ...this.headerButtonsBefore,
                this.onDelete && {
                    id: "delete",
                    text: "Delete",
                    icon: "bin",
                    color: "none",
                    loading: this.deleting,
                    size: 32
                },
                ...this.headerButtonsAfter
            ].filter(v => v);
        },
        tabs() {
            return Object.keys(this.fields).map(field => ({
                value: field
            }));
        }
    },
    watch: {
        values(value) {
            this.valuesData = value;
        },
        valuesData(value) {
            this.$emit("update:values", value);
        }
    },
    methods: {
        columnStyle(tabName) {
            const tab = this.fields[tabName];
            const width = `${100 / tab.length}%`;
            const base = {
                width: this.isTabletWidth() || this.isMobileWidth() ? null : width
            };
            return base;
        },
        inputType(field) {
            return field.meta;
        },
        goNext() {
            if (!this.navigation) return;
            if (!this.next) return;
            this.$router.push(this.next);
        },
        goPrevious() {
            if (!this.navigation || !this.$router) return;
            if (this.previous) {
                this.$router.push(this.previous);
            } else {
                this.$router.go(-1);
            }
        },
        async discard() {
            if (!this.onDiscard) return;
            await this.onDiscard(this.values);
        },
        async save() {
            if (!this.onSave) return;
            this.saving = true;
            try {
                await this.onSave(this.values);

                if (this.saveNotification) {
                    this.notify(this.saveNotificationMessage(this.values), {
                        icon: "ok",
                        iconColor: "#45a777",
                        topHeight: 130,
                        timeout: 2000,
                        ...this.saveNotificationProps
                    });
                }

                this.goNext();
            } catch (error) {
                if (this.errorNotification) {
                    this.notify(this.errorNotificationMessage(error), {
                        icon: "error",
                        iconColor: "#ce544d",
                        topHeight: 130,
                        timeout: 2000,
                        ...this.errorNotificationProps
                    });
                }
            } finally {
                this.saving = false;
            }
        },
        async delete() {
            if (!this.onDelete) return;
            this.deleting = true;
            try {
                await this.onDelete();

                this.goPrevious();
            } finally {
                this.deleting = false;
            }
        },
        onValue(field, value) {
            this.$set(this.valuesData, field, value);
        },
        async onReject() {
            await this.discard();
        },
        async onSubmit() {
            await this.save();
        },
        onHeaderButtonClick(event, buttonId) {
            this.$emit("header-button:click", event, buttonId);
        },
        async onDeleteClick() {
            await this.delete();
        }
    }
};

export default Form;
</script>
