<template>
    <div class="error-platforme">
        <div class="error-message">
            <img v-bind:src="image" v-if="image" />
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

.error-platforme {
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
</style>

<script>
export const ErrorPlatforme = {
    name: "error-platforme",
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
    computed: {
        isAuth() {
            return [401, 403, 440, 499].includes(this.code);
        }
    }
};

export default ErrorPlatforme;
</script>
