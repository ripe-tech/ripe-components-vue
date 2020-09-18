<template>
    <div class="forms-buttons">
        <button-color
            class="button-reject"
            v-bind="{
                color: 'white',
                alignment: 'left',
                minWidth: 0,
                ...rejectButtonProps
            }"
            v-if="reject"
            v-on:click="onRejectButtonClick"
        />
        <button-color
            class="button-accept"
            v-bind="{
                icon: 'save',
                color: 'green',
                alignment: 'left',
                minWidth: 0,
                ...acceptButtonProps
            }"
            v-if="accept"
            v-on:click="onAcceptButtonClick"
        />
    </div>
</template>

<style lang="scss" scoped>
.forms-buttons {
    border-top: 1px solid #e4e8f0;
    box-sizing: border-box;
    margin: 56px 0px 0px 0px;
    padding: 28px 28px 28px 28px;
    text-align: right;
    width: 100%;
}

.forms-buttons > .button-reject {
    margin: 0px 8px 0px 0px;
}
</style>

<script>
export const FormButtons = {
    name: "form-buttons",
    props: {
        rejectButtonProps: {
            type: Object,
            default: () => ({})
        },
        reject: {
            type: Boolean,
            default: true
        },
        acceptButtonProps: {
            type: Object,
            default: () => ({})
        },
        accept: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onRejectButtonClick() {
            this.$emit("click:reject");
        },
        onAcceptButtonClick() {
            this.$emit("click:accept");
        }
    }
};

export default FormButtons;
</script>
