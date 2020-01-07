<template>
    <div class="error-part">
        <button-icon
            class="back-image"
            v-bind:icon="'arrow-left'"
            v-bind:size="'60'"
            v-on:click="goBack()"
        />
        <div class="error-message">
            <img v-bind:src="image" v-if="image" v-on:click="goHome()" />
            <span>{{ message }}</span>
            <div>
                <router-link
                    v-bind:to="{
                        name: 'signout'
                    }"
                    v-if="isAuth"
                >
                    {{ loginMessage }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.error-part {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
}

.error-message {
    animation: fade-into-rise 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
    font-size: 26px;
}

.error-message > img {
    display: block;
    margin: 0px auto 24px auto;
    width: 160px;
}

.error-message > div {
    margin: 24px auto 0px auto;
}

.back-image {
    left: 2%;
    position: absolute;
    top: 2%;
}
</style>

<script>
export const ErrorPart = {
    name: "error-part",
    props: {
        message: {
            type: String,
            default: "There was an unexpected error"
        },
        code: {
            type: Number,
            default: null
        },
        loginMessage: {
            type: String,
            default: "Try to login again"
        },
        image: {
            type: String,
            default: null
        }
    },
    methods: {
        goHome() {
            this.$router.push({ name: "home" });
        },
        goBack() {
            this.$router.go(-1);
        }
    },
    computed: {
        isAuth() {
            return [401, 403, 440, 499].includes(this.code);
        }
    }
};

export default ErrorPart;
</script>
