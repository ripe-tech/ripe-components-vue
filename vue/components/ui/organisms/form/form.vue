<template>
    <form class="form" ref="form" v-on:submit.stop.prevent="onSubmit">
        <tabs v-bind:tabs="tabs">
            <template v-for="(columns, tab) in fields" v-slot:[tab]>
                <div
                    class="column"
                    v-bind:classes="columnClasses(index)"
                    v-bind:style="columnStyle(tab)"
                    v-for="(column, index) in columns"
                    v-bind:key="index"
                >
                    <div
                        class="section"
                        v-bind:classes="sectionClasses(section)"
                        v-for="section in column"
                        v-bind:key="section.title"
                    >
                        <h3 class="section-title">{{ section.title }}</h3>
                        <template v-for="field in section.fields">
                            <form-input
                                class="section-field"
                                v-bind:classes="formInputClasses(field)"
                                v-bind:header="
                                    field.label !== undefined ? field.label : field.value
                                "
                                v-bind="field.formInputProps"
                                v-bind:key="field.value"
                            >
                                <slot
                                    v-bind:name="field.value"
                                    v-bind:field="field"
                                    v-bind:values="values"
                                    v-bind:on-value="onValue"
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
                                            v-if="values[field.value] || field.imageSrc"
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
                                                v-bind:name="`${field.value}-select-selected`"
                                                v-bind:item="item"
                                            >
                                                <slot
                                                    v-bind:name="'select-selected'"
                                                    v-bind:item="item"
                                                />
                                            </slot>
                                        </template>
                                        <template v-slot="{ item }">
                                            <slot
                                                v-bind:name="`${field.value}-select`"
                                                v-bind:item="item"
                                            >
                                                <slot v-bind:name="'select'" v-bind:item="item" />
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
                                </slot>
                            </form-input>
                        </template>
                    </div>
                </div>
            </template>
        </tabs>
        <div class="buttons" v-if="onSave || onDiscard">
            <button-color
                class="button-reject"
                v-bind="{
                    text: 'Discard',
                    small: true,
                    minWidth: 83,
                    color: 'white',
                    ...rejectButtonProps
                }"
                v-if="onDiscard"
                v-on:click="onReject"
            />
            <button-color
                class="button-accept"
                v-bind="{
                    text: 'Save',
                    type: 'submit',
                    small: true,
                    loading: saving,
                    minWidth: 83,
                    icon: 'save',
                    color: 'green',
                    ...acceptButtonProps
                }"
                v-if="onSave"
                v-on:click="onSubmit"
            />
        </div>
    </form>
</template>

<style lang="scss" scoped>
.form {
    padding: 0px 14px 0px 14px;
}

.form > .tabs ::v-deep > .header {
    margin: 0px 10px 0px 10px;
}

.form > .tabs .column {
    box-sizing: border-box;
    display: inline-block;
    padding: 10px 10px 10px 10px;
    vertical-align: top;
}

body.tablet .form > .tabs .column,
body.mobile .form > .tabs .column {
    box-sizing: border-box;
    margin: 0px 0px 0px 0px;
    padding: 0px 10px 0px 10px;
    width: 100%;
}

.form > .tabs .column > .section > .section-title {
    color: #1d2631;
    font-size: 16px;
    font-weight: 600;
    margin: 24px 0px 24px 0px;
    text-align: left;
}

.form > .tabs .column > .section > .section-field {
    margin: 0px 0px 20px 0px;
}

.form > .tabs .column > .section > .section-field:last-child {
    margin-bottom: 0px;
}

.form > .tabs .column > .section > .section-field .text-image {
    box-sizing: border-box;
    display: block;
    margin: 20px auto 0px auto;
    max-height: 70px;
    max-width: 100%;
    padding: 0px 10px 0px 10px;
}

.form > .buttons {
    margin: 24px 10px 24px 10px;
    text-align: right;
}

.form > .buttons > .button-reject {
    margin: 0px 6px 0px 0px;
}
</style>

<script>
import { utilsMixin, partMixin } from "../../../../mixins";

export const Form = {
    name: "form-ripe",
    mixins: [utilsMixin, partMixin],
    props: {
        fields: {
            type: Object,
            required: true
        },
        values: {
            type: Object,
            required: true
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
        saveNotification: {
            type: Boolean,
            default: true
        },
        saveMessage: {
            type: Function,
            default: values => "Changes saved!"
        },
        saveNotificationProps: {
            type: Object,
            default: () => ({})
        },
        error: {
            type: Boolean,
            default: true
        },
        errorMessage: {
            type: Function,
            default: error => error.message || "Something went wrong"
        },
        errorMessageProps: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
            saving: false,
            valuesData: this.values
        };
    },
    computed: {
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
        columnClasses(index) {
            return `column-${index}`;
        },
        columnStyle(tabName) {
            const tab = this.fields[tabName];
            const width = `${100 / tab.length}%`;
            const base = {
                width: this.isTabletWidth() || this.isMobileWidth() ? null : width
            };
            return base;
        },
        sectionClasses(section) {
            const base = {};
            if (section.title) base[`section-${this.buildSlug(section.title)}`] = true;
            return base;
        },
        formInputClasses(field) {
            const base = {};
            base[`field-${field.value}`] = true;
            base[`field-${field.type}`] = true;
            base[`field-${field.meta}`] = Boolean(field.meta);
            return base;
        },
        inputType(field) {
            return field.meta;
        },
        async discard() {
            if (!this.onDiscard) return;
            try {
                await this.onDiscard(this.values);
            } catch (error) {
                if (this.error) {
                    this.notify(this.errorMessage(error), {
                        icon: "error",
                        iconColor: "#ce544d",
                        topHeight: 130,
                        timeout: 2000,
                        ...this.errorMessageProps
                    });
                }
            }
        },
        async save() {
            if (!this.onSave) return;
            this.saving = true;
            try {
                await this.onSave(this.values);

                if (this.saveNotification) {
                    this.notify(this.saveMessage(this.values), {
                        icon: "ok",
                        iconColor: "#45a777",
                        topHeight: 130,
                        timeout: 2000,
                        ...this.saveNotificationProps
                    });
                }
            } catch (error) {
                if (this.error) {
                    this.notify(this.errorMessage(error), {
                        icon: "error",
                        iconColor: "#ce544d",
                        topHeight: 130,
                        timeout: 2000,
                        ...this.errorMessageProps
                    });
                }
            } finally {
                this.saving = false;
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
        }
    }
};

export default Form;
</script>
