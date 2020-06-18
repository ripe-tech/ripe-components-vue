<template>
    <div
        class="button button-no-style button-platforme"
        v-bind:class="{ loading: loading }"
        v-on:click="click"
    >
        <loader
            loader="ball-scale-multiple"
            class="loader"
            v-bind:loader-style="loaderStyle"
            v-show="loading"
        />
        <span class="button-logo" v-if="logo">
            <img src="~./assets/platforme_id.svg" v-show="!loading" />
        </span>
        <span class="button-text">{{ text }}</span>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.button.button-platforme {
    background-color: #0b57af;
    border-radius: 5px;
    color: $white;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    height: 50px;
    letter-spacing: 1.5px;
    line-height: 50px;
    max-width: 320px;
    text-align: center;
    text-transform: uppercase;
    transition: background-color 0.15s ease-in-out,
        opacity 0.15s ease-in-out,
        transform 0.15s ease-in-out;
}

.button.button-platforme:hover {
    background-color: #0b579a;
    transform: scale(1.025, 1.025);
}

.button.button-platforme > span.button-logo {
    background-color: #143b8c;
    border-radius: 5px 0px 0px 5px;
    float: left;
    height: 50px;
    line-height: 50px;
    text-align: center;
    transition: background-color 0.15s ease-in-out;
    width: 50px;
}

.button.button-platforme.loading > span.button-logo {
    opacity: 0.7;
}

.button.button-platforme:hover > span.button-logo {
    background-color: #143b78;
}

.button.button-platforme > span.button-logo > img {
    height: 26px;
    vertical-align: middle;
}

.button.button-platforme > .loader {
    left: 35px;
    top: 35px;
}

.button.button-platforme > .loader ::v-deep > div {
    height: 40px;
    width: 40px;
}
</style>

<script>
export const ButtonPlatforme = {
    name: "button-platforme",
    props: {
        normalText: {
            type: String,
            default: "Sign in with Platforme ID"
        },
        loadingText: {
            type: String,
            default: "Signing in Platforme ID..."
        },
        logo: {
            type: Boolean,
            default: true
        },
        mode: {
            type: String,
            default: "loading"
        },
        loaderStyle: {
            type: Object,
            default: () => ({ "background-color": "$white" })
        }
    },
    data: function() {
        return {
            loading: false
        };
    },
    computed: {
        text() {
            return this.loading ? this.loadingText : this.normalText;
        }
    },
    methods: {
        click(event) {
            switch (this.mode) {
                case "loading":
                    this.loading = true;
                    break;
            }
            this.$emit("click", event);
        }
    }
};

export default ButtonPlatforme;
</script>
