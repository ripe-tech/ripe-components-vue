<template>
    <page>
        <details-ripe
            v-bind="detailProps"
            v-bind:name="name"
            v-bind:title="composedBreadcrumbs"
            v-bind:values="fields"
            v-bind:options-items="optionsItems"
            v-bind:get-items="getItems"
            v-bind:item="item ? item : {}"
            v-bind:loaded="personLoaded"
            v-bind:invalid="invalidRequest"
            v-bind:invalid-message="`Our apologies, it looks like a ${itemName} '${name}' doesn't exist`"
            v-on:click:stats="onStatsButtonClick"
            v-on:click:refresh="onRefreshButtonClick"
            v-on:click:edit="onEditButtonClick"
            v-on:click:delete="onDeleteButtonClick"
        >
            <template v-slot:value-name>
                <avatar-name
                    v-bind:avatar-props="{
                        src: `https://id.platforme.com/admin/accounts/${person.platformeId}/avatar`
                    }"
                    v-bind:name="person.name"
                />
            </template>
        </details-ripe>
        <slot v-bind:item="item" />
    </page>
</template>

<style lang="scss" scoped></style>

<script>
export const ItemShow = {
    name: "item-show",
    props: {
        fields: {
            type: Array,
            required: true
        },
        breadcrumbs: {
            type: String | Array,
            default: () => []
        },
        edit: {
            type: Boolean,
            default: true
        },
        editRoute: {
            type: Object | String,
            default: null
        },
        list: {
            type: Boolean,
            default: true
        },
        listRoute: {
            type: Object | String,
            default: null
        },
        itemName: {
            type: String,
            required: true
        },
        getItems: {
            type: Function,
            required: true
        },
        getItem: {
            type: Function,
            required: true
        },
        deleteItem: {
            type: Function,
            default: null
        },
        getItemName: {
            type: Function,
            default: item => item.name
        },
        websiteName: {
            type: String,
            default: null
        },
        detailsProps: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
            item: null,
            invalidRequest: false
        };
    },
    computed: {
        personLoaded() {
            return this.item && !this.invalidRequest;
        },
        name() {
            return this.item ? this.getItemName(this.item) : `Invalid ${this.itemName}`;
        },
        _listRoute() {
            return this.listRoute || { name: `${this.itemName}-list` };
        },
        _editRoute() {
            return this.editRoute || { name: `${this.itemName}-edit` };
        },
        optionsItems() {
            return [
                this.edit ? { label: "Edit", value: "edit", event: "edit" } : null,
                this.deleteItem ? { label: "Delete", value: "delete", event: "delete" } : null
            ].filter(v => v);
        },
        composedBreadcrumbs() {
            return [
                ...this.breadcrumbs,
                this.list ? this._listRoute : null,
                { text: this.name }
            ].filter(v => v);
        }
    },
    created: async function() {
        document.title = `${this.name}${this.websiteName ? `- ${this.websiteName}` : ""}`;
        await this.loadItem();
    },
    methods: {
        toList() {
            this.$router.push(this._listRoute);
        },
        toEdit() {
            this.$router.push(this._editRoute);
        },
        async delete() {
            const confirmed = await this.alert(
                `Are you sure you really want to <strong>delete ${this.itemName} ${this.name}</strong>?<br/>Please bare in mind that this action <strong>is not reversible</strong>!`,
                { title: `Delete ${this.itemName} ${this.name}` }
            );

            if (confirmed) {
                await this.deleteItem();
                this.toList();
            }
        },
        async loadItem() {
            try {
                this.invalidRequest = false;
                this.item = await this.getItem();
            } catch (error) {
                this.invalidRequest = true;
            }
        },
        onStatsButtonClick() {
            this.toList();
        },
        async onRefreshButtonClick() {
            await this.loadItem();
        },
        onEditButtonClick() {
            this.toEdit();
        },
        async onDeleteButtonClick() {
            await this.delete();
        }
    }
};

export default ItemShow;
</script>
