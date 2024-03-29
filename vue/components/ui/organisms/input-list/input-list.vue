<template>
    <div class="input-list">
        <div class="list-header" v-if="header">
            <div
                v-bind:class="`label ${field.value}`"
                v-for="field in fieldLabels"
                v-bind:key="field.value"
            >
                {{ field.label === undefined ? field.value : field.label }}
            </div>
            <button-icon
                class="button-add-row"
                v-bind:icon="'plus'"
                v-if="buttonAddRow === 'top'"
                v-on:click="onAddClick"
            />
        </div>
        <div class="list-content">
            <div class="list-row" v-for="(row, index) in valuesData" v-bind:key="row.value">
                <div
                    v-bind:class="`field ${field.value}`"
                    v-for="field in fields"
                    v-bind:key="field.value"
                >
                    <input-ripe
                        v-bind:type="field.meta"
                        v-bind:value.sync="valuesData[index][field.value]"
                        v-bind="field.props"
                        v-if="field.type === 'text'"
                    />
                    <select-ripe
                        v-bind="field.props"
                        v-bind:value.sync="valuesData[index][field.value]"
                        v-else-if="field.type === 'enum'"
                    />
                    <switcher
                        v-bind="field.props"
                        v-bind:checked.sync="valuesData[index][field.value]"
                        v-else-if="field.type === 'boolean'"
                    />
                    <input-image
                        v-bind="field.props"
                        v-bind:images="valuesData[index][field.value] || []"
                        v-else-if="field.type === 'image'"
                        v-on:update:images="onValue($event, field, index)"
                    />
                    <input-color
                        v-bind="field.props"
                        v-bind:value.sync="valuesData[index][field.value]"
                        v-else-if="field.type === 'color'"
                    />
                </div>
                <div class="field action-buttons">
                    <button-icon
                        class="button-remove"
                        v-bind:icon="'minus'"
                        v-on:click="onRemoveClick(index)"
                    />
                </div>
            </div>
        </div>
        <div class="list-footer">
            <button-icon
                class="button-add-row"
                v-bind:icon="'plus'"
                v-if="buttonAddRow === 'bottom'"
                v-on:click="onAddClick"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.input-list {
    display: block;
    position: relative;
}

.input-list .list-header {
    align-items: center;
    display: flex;
    font-size: 12px;
    height: 40px;
    padding-right: 5px;
}

.input-list .list-header .label {
    color: #606873;
    display: inline-block;
    flex: 1;
    font-weight: bold;
    overflow: hidden;
    padding: 0px 5px 0px 5px;
    text-overflow: ellipsis;
    text-transform: capitalize;
    white-space: nowrap;
    width: 100%;
}

.input-list .list-header .label.action-buttons {
    flex-grow: 0;
    min-width: 30px;
}

.input-list .list-content {
    border-top: 1px solid #e4e8f0;
    display: block;
    padding: 0px 0px 5px 0px;
}

.input-list .list-content .list-row {
    border-bottom: 1px solid #e4e8f0;
    display: flex;
    padding: 5px 0px 5px 0px;
}

.input-list .list-content .list-row:hover {
    background-color: #f8f8f8;
}

.input-list .list-content .list-row .field {
    align-items: center;
    display: inline-flex;
    flex: 1;
    padding: 0px 5px 0px 5px;
    text-transform: capitalize;
    width: 100%;
}

.input-list .list-content .list-row .field.action-buttons {
    flex-grow: 0;
}

.input-list .list-content .list-row .field .select {
    width: 100%;
}

.input-list .list-footer {
    padding-right: 5px;
    text-align: right;
}
</style>

<script>
export const InputList = {
    name: "input-list",
    props: {
        fields: {
            type: Array,
            required: true
        },
        values: {
            type: Array,
            default: () => []
        },
        buttonAddRow: {
            type: String,
            default: "top"
        },
        header: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            valuesData: this.values
        };
    },
    computed: {
        fieldLabels() {
            return [...this.fields, { value: "action-buttons", label: null }];
        }
    },
    watch: {
        values: {
            handler: function(value, previousValue) {
                this.valuesData = value;
            },
            deep: true
        },
        valuesData: {
            handler: function(value, previousValue) {
                this.$emit("update:values", value);
            },
            deep: true
        }
    },
    methods: {
        onAddClick() {
            this.valuesData.push({});
        },
        onRemoveClick(index) {
            this.$delete(this.valuesData, index);
        },
        onValue(value, field, index) {
            const newValue = {
                ...this.valuesData[index],
                [field.value]: value
            };
            this.$set(this.valuesData, index, newValue);
        }
    }
};

export default InputList;
</script>
