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
    margin: 24px 10px 24px 10px;
    text-align: right;
}

.forms-buttons > .button-reject {
    margin: 0px 6px 0px 0px;
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
