<template>
    <div class="error-part">
        <button-icon
            class="button-icon-back"
            v-bind:icon="'arrow-left'"
            v-bind:size="60"
            v-if="navigation"
            v-on:click="goBack"
        />
        <div class="error-message">
            <image-ripe
                v-bind:src="image"
                v-bind:class="{ clickable: navigation }"
                v-bind:fade="false"
                v-if="image"
                v-on:click="goHome"
            />
            <div class="animation" v-if="animations && hasAnimation">
                <object class="animated-svg" v-bind:class="animatedSvgClasses" type="image/svg+xml" v-bind:data="animatedSvg" />
            </div>

            <span>{{ message }}</span>
            <div>
                <router-link
                    v-bind:to="{
                        name: 'signout'
                    }"
                    v-if="isAuth"
                    v-slot="{ href, navigate }"
                >
                    <link-ripe
                        v-bind:text="loginMessage"
                        v-bind:href="href"
                        v-bind:hover="'border'"
                        v-on:click="navigate"
                    />
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
@import "css/animations.scss";

.error-part {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
}

.error-message {
    animation: fade-into-rise 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
    font-size: 26px;
    text-align: center;
}

.error-message > img {
    display: block;
    margin: 0px auto 24px auto;
    width: 240px;
}

.error-message > img.clickable {
    cursor: pointer;
}

.error-message > .animation {
    position: relative;
    width: 400px;
    height: 200px;
    margin: 160px 0px 80px 0px;
}

.error-message > .animation > .animated-svg {
    position: absolute;
    z-index: 100;
}

.error-message > .animation > .animated-svg.code404 {
    width: 1400px;
    height: 600px;
    left: -472px;
    top: -210px;
}

.error-message > .animation > .animated-svg.code500 {
    width: 700px;
    height: 400px;
    left: 0px;
    top: -130px;
}

.error-message > div {
    margin: 24px auto 0px auto;
}

.button-icon-back {
    left: 20px;
    position: absolute;
    top: 20px;
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
        },
        navigation: {
            type: Boolean,
            default: true
        },
        animations: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        goHome() {
            if (!this.navigation) return;
            this.$router.push({ name: "home" });
        },
        goBack() {
            if (!this.navigation) return;
            this.$router.go(-1);
        }
    },
    computed: {
        hasAnimation() {
            return [404, 500].includes(this.code);
        },
        animatedSvg() {
            return require(`./assets/${this.code}-loop-cropped.svg`);
        },
        animatedSvgClasses() {
            return {
                code404: this.code === 404,
                code500: this.code === 500
            };
        },
        isAuth() {
            return [401, 403, 440, 499].includes(this.code);
        }
    }
};

export default ErrorPart;
</script>
