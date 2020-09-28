<template>
    <container-ripe
        class="form"
        v-bind:title="title"
        v-bind:header-buttons="buttons"
        v-on:header-button:click:delete="onDeleteClick"
    >
        <form class="form-form" ref="form" v-on:submit.stop.prevent="onSubmit">
            <tabs v-bind:tabs="tabs">
                <template v-for="(columns, tab) in items" v-slot:[tab]>
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
                                    <input-ripe
                                        v-bind:type="field.type"
                                        v-bind="field.props"
                                        v-bind:value="values[field.value]"
                                        v-if="
                                            ['string', 'number', 'email', 'input'].includes(
                                                field.type
                                            )
                                        "
                                        v-on:update:value="value => onValue(field.value, value)"
                                    />
                                    <select-ripe
                                        v-bind="field.props"
                                        v-bind:value="values[field.value]"
                                        v-else-if="field.type === 'select'"
                                        v-on:update:value="value => onValue(field.value, value)"
                                    >
                                        <template v-slot:selected>
                                            <slot v-bind:name="`select-${field.value}-selected`" />
                                        </template>
                                        <template v-slot="{ item }">
                                            <slot v-bind:name="'select'" v-bind:item="item">
                                                <slot
                                                    v-bind:name="`select-${field.value}`"
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
                                    <textarea-ripe
                                        v-bind="field.props"
                                        v-bind:value="values[field.value]"
                                        v-else-if="field.type === 'textarea'"
                                        v-on:update:value="value => onValue(field.value, value)"
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
                    ...rejectButtonProps
                }"
                v-bind:accept-button-props="{
                    text: 'Save',
                    icon: 'save',
                    type: 'submit',
                    loading: saving,
                    ...acceptButtonProps
                }"
                v-on:click:reject="onReject"
            />
        </form>
    </container-ripe>
</template>

<style lang="scss" scoped>
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
        items: {
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
            default: () => {
                return "Changes saved!";
            }
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
            default: error => {
                return error.message ? error.message : "Something went wrong";
            }
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
                this.onDelete && {
                    id: "delete",
                    text: "Delete",
                    icon: "bin",
                    color: "none",
                    loading: this.deleting,
                    size: 32
                }
            ].filter(v => v);
        },
        tabs() {
            return Object.keys(this.items).map(item => ({
                value: item
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
            const tab = this.items[tabName];
            const width = `${100 / tab.length}%`;
            const base = {
                width: this.isTabletWidth() || this.isMobileWidth() ? null : width
            };
            return base;
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
                    this.notify(this.saveNotificationMessage(), {
                        icon: "ok",
                        iconColor: "#45a777",
                        topHeight: 130,
                        timeout: 2000,
                        ...this.saveNotificationProps
                    });
                }
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
            this.goNext();
        },
        async delete() {
            if (!this.onDelete) return;
            this.deleting = true;
            try {
                await this.onDelete();
            } finally {
                this.deleting = false;
            }
            this.goPrevious();
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
        async onDeleteClick() {
            await this.delete();
        }
    }
};

export default Form;
</script>
