<template>
    <div class="error-part">
        <button-icon
            class="button-icon-back"
            v-bind:icon="'arrow-left'"
            v-bind:size="60"
            v-if="navigation"
            v-on:click="goBack"
        />
        <button-icon
            class="button-icon-home"
            v-bind:icon="homeIcon"
            v-bind:size="60"
            v-if="navigation && homeIcon"
            v-on:click="goHome"
        />
        <div class="error-message">
            <image-ripe
                v-bind:src="image"
                v-bind:class="{ clickable: navigation }"
                v-bind:fade="false"
                v-if="image"
                v-on:click="goHome"
            />
            <div
                class="animation"
                v-bind:class="animationClasses"
                v-if="animations && hasAnimation"
            >
                <object class="animated-svg" type="image/svg+xml" v-bind:data="animatedSvg" />
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
    height: 300px;
    margin: 30px 0px 30px 0px;
    position: relative;
    width: 500px;
}

.error-message > .animation.error-404 {
    height: 400px;
    margin-bottom: -100px;
    width: 900px;
}

.error-message > .animation > .animated-svg {
    height: 100%;
    left: 0px;
    position: absolute;
    top: 0px;
    width: 100%;
}

.error-message > .animation.error-404 > .animated-svg {
    top: -54px;
}

.error-message > div {
    margin: 24px auto 0px auto;
}

.button-icon-back {
    left: 20px;
    position: absolute;
    top: 20px;
}

.button-icon-home {
    position: absolute;
    right: 20px;
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
        homeIcon: {
            type: String,
            default: null
        },
        homeLocation: {
            type: String,
            default: "/"
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
            this.$router.push(this.homeLocation);
        },
        goBack() {
            if (!this.navigation) return;
            this.$router.go(-1);
        }
    },
    computed: {
        isAuth() {
            return [401, 403, 440, 499].includes(this.code);
        },
        hasAnimation() {
            return [404, 500].includes(this.code);
        },
        animatedSvg() {
            return require(`./assets/${this.code}.svg`);
        },
        animationClasses() {
            const base = {};
            base[`error-${this.code}`] = true;
            return base;
        }
    }
};

export default ErrorPart;
</script>
