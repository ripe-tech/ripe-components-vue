<template>
    <container-ripe
        class="container-form"
        v-bind:title="title"
        v-bind:header-buttons="buttons"
        v-on:header-button:click="onHeaderButtonClick"
        v-on:header-button:click:delete="onDeleteClick"
    >
        <form-ripe v-bind="formProps" v-bind:fields="fields" v-bind:values.sync="valuesData">
            <slot v-bind:name="slot" v-for="slot in Object.keys($slots)" v-bind:slot="slot" />
            <template
                v-for="slot in Object.keys($scopedSlots)"
                v-bind:slot="slot"
                slot-scope="scope"
            >
                <slot v-bind:name="slot" v-bind="scope" />
            </template>
        </form-ripe>
    </container-ripe>
</template>

<style lang="scss" scoped>
.container-form {
    animation: fade-into-rise 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
}
</style>

<script>
import { utilsMixin, partMixin } from "../../../../mixins";

export const ContainerForm = {
    name: "container-form",
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
        title: {
            type: String | Array,
            required: true
        },
        headerButtonsBefore: {
            type: Array,
            default: () => []
        },
        headerButtonsAfter: {
            type: Array,
            default: () => []
        },
        onDelete: {
            type: Function,
            default: null
        },
        formProps: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
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
        async delete() {
            if (!this.onDelete) return;
            this.deleting = true;
            try {
                await this.onDelete();
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
                this.deleting = false;
            }
        },
        onValue(field, value) {
            this.$set(this.valuesData, field, value);
        },
        onHeaderButtonClick(event, buttonId) {
            this.$emit("header-button:click", event, buttonId);
            this.$emit(`header-button:click:${buttonId}`, event);
        },
        async onDeleteClick() {
            await this.delete();
        }
    }
};

export default ContainerForm;
</script>
