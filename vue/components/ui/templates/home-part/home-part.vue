<template>
    <div class="home-part" v-if="visible">
        <div class="top">
            <router-link v-bind:to="homeRoute">
                <img v-bind:src="logo" />
            </router-link>
        </div>
        <div class="middle">
            <div class="area area-left">
                <img class="illustration" v-bind:src="illustration" />
            </div>
            <div class="area area-right">
                <div class="punch" v-html="messageReplaced" />
                <button-platforme v-on:click="login" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.home-part {
    text-align: center;
    user-select: none;
}

.home-part > .top {
    animation: fade-into-drop 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
    border-bottom: 1px solid #e4e8f0;
    height: 100px;
    line-height: 100px;
}

.home-part > .top > * {
    border: none;
}

.home-part > .top > * > img {
    display: inline-block;
    max-height: 76px;
    vertical-align: middle;
}

.home-part > .middle {
    margin: 0px auto 0px auto;
    max-width: 1280px;
    padding: 96px 0px 96px 0px;
}

.home-part > .middle > .area {
    display: inline-block;
    vertical-align: top;
}

.home-part > .middle > .area-left {
    animation: fade-into-rise 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin-right: 64px;
}

.home-part > .middle > .area-left > .illustration {
    max-height: 400px;
    max-width: 400px;
}

.home-part > .middle > .area-right {
    animation: fade-into-rise 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
    box-sizing: border-box;
    height: 340px;
    padding: 96px 0px 96px 0px;
}

.home-part > .middle > .area-right > .punch {
    font-size: 26px;
    font-weight: 600;
    line-height: 34px;
    margin-bottom: 32px;
    max-width: 380px;
    text-align: left;
}
</style>

<script>
export const HomePart = {
    name: "home-part",
    props: {
        logo: {
            type: String | Object,
            default: null
        },
        illustration: {
            type: String | Object,
            default: null
        },
        homeRoute: {
            type: String | Object,
            default: null
        },
        nextRoute: {
            type: String | Object,
            default: null
        },
        message: {
            type: String,
            default: null
        }
    },
    data: function() {
        return {
            visible: false
        };
    },
    computed: {
        messageReplaced() {
            if (!this.message) return "";
            return this.message.replace(/\n/g, "<br/>");
        }
    },
    methods: {
        login: async function() {
            try {
                document.location = await this.$ripeIdApi.oauthAuthorize();
            } catch (err) {
                this.handleError(err);
            }
        }
    },
    created: function() {
        if (this.$root && this.$root.authenticated && this.nextRoute) {
            this.$router.push(this.nextRoute);
        } else {
            this.visible = true;
        }
    }
};

export default HomePart;
</script>
