<template>
    <div class="home-part" v-bind:class="classes" v-bind:style="style" v-if="visible">
        <div class="top">
            <div class="left">
                <router-link class="logo-container" v-bind:to="homeRoute">
                    <image-ripe class="logo" v-bind:src="logo" />
                </router-link>
            </div>
            <div class="right">
                <div class="links">
                    <router-link
                        class="link"
                        v-bind:to="link.to"
                        v-for="link in links"
                        v-bind:key="link.name"
                        v-slot="{ href, navigate }"
                    >
                        <link-ripe
                            v-bind:text="String(link.name)"
                            v-bind:href="href"
                            v-bind:color="linksTopColor"
                            v-bind:hover="'color'"
                            v-bind:size="'big'"
                            v-on:click="navigate"
                        />
                    </router-link>
                    <router-link
                        class="link"
                        v-bind:to="link.to"
                        v-for="link in links"
                        v-bind:key="link.name"
                        v-slot="{ href, navigate }"
                    >
                        <link-ripe
                            v-bind:text="String(link.name)"
                            v-bind:href="href"
                            v-bind:color="linksTopColor"
                            v-bind:hover="'color'"
                            v-bind:size="'big'"
                            v-on:click="navigate"
                        />
                    </router-link>
                </div>
            </div>
        </div>
        <div class="middle">
            <div class="area-left">
                <img class="illustration" v-bind:src="illustration" />
            </div>
            <div class="area-right">
                <div class="message" v-if="messageReplaced" v-html="messageReplaced" />
                <div class="sub-message" v-if="subMessageReplaced" v-html="subMessageReplaced" />
                <button-platforme v-on:click="login" />
            </div>
        </div>
        <div class="bottom">
            <div class="signature">
                A product from
                <link-ripe
                    v-bind:text="'Platforme'"
                    v-bind:color="linksBottomColor"
                    v-bind:hover="'border'"
                    v-bind:href="'https://www.platforme.com'"
                />
            </div>
            <div class="copyright">
                ©2020 all rights reserved
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
@import "css/animations.scss";

.home-part {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.home-part > .top {
    animation: fade-into-drop 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
    display: flex;
    padding: 34px 60px 34px 60px;
}

body.tablet .home-part > .top,
body.mobile .home-part > .top {
    display: block;
    padding: 20px 20px 20px 20px;
}

.home-part > .top > .left,
.home-part > .top > .right {
    display: inline-block;
}

body.tablet .home-part > .top > .left,
body.tablet .home-part > .top > .right,
body.mobile .home-part > .top > .left,
body.mobile .home-part > .top > .right {
    display: block;
}

body.tablet .home-part > .top > .left,
body.mobile .home-part > .top > .left {
    text-align: right;
}

.home-part > .top > .left > .logo-container {
    display: block;
    height: 32px;
}

.home-part > .top > .left > .logo-container > .logo {
    max-height: 100%;
    vertical-align: middle;
}

.home-part > .top > .right {
    flex: 1;
    text-align: right;
}

.home-part > .top > .right > .links {
    align-items: center;
    display: inline-flex;
    justify-content: flex-end;
}

body.tablet .home-part > .top > .right > .links,
body.mobile .home-part > .top > .right > .links {
    display: block;
    margin-top: 10px;
    width: 100%;
}

.home-part > .top > .right > .links > .link {
    display: inline-block;
    margin-left: 54px;
}

body.tablet .home-part > .top > .right > .links > .link,
body.mobile .home-part > .top > .right > .links > .link {
    line-height: 28px;
    margin-left: 16px;
}

.home-part > .top > .right > .links > .link:first-child {
    margin-left: 0px;
}

.home-part > .middle {
    align-items: center;
    display: flex;
    flex: 1;
    flex-wrap: wrap-reverse;
    justify-content: center;
    margin: 0px auto 0px auto;
    max-width: 1280px;
    text-align: left;
    width: 100%;
}

.home-part.home-part-middle-dark > .middle {
    color: $black;
}

.home-part.home-part-middle-light > .middle {
    color: $white;
}

.home-part > .middle > .area-left,
.home-part > .middle > .area-right {
    margin: 16px;
}

.home-part > .middle > .area-left {
    animation: fade-into-rise 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 600px;
}

.home-part > .middle > .area-left > .illustration {
    height: 100%;
    width: 100%;
}

.home-part > .middle > .area-right {
    animation: fade-into-rise 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 400px;
}

.home-part.home-part-middle-dark > .middle > .area-right {
    color: $black;
}

.home-part > .middle > .area-right > .message {
    font-size: 48px;
    font-weight: 600;
    line-height: 60px;
    margin-bottom: 32px;
}

.home-part > .middle > .area-right > .sub-message {
    font-size: 22px;
    font-weight: 300;
    letter-spacing: 1px;
    line-height: 30px;
    margin-bottom: 60px;
}

.home-part > .bottom {
    padding: 34px 60px 34px 60px;
    text-align: left;
}

.home-part.home-part-bottom-dark > .bottom {
    color: $black;
}

.home-part.home-part-bottom-light > .bottom {
    color: $white;
}

.home-part > .bottom > .signature {
    display: inline-block;
    font-size: 18px;
}

.home-part > .bottom > .copyright {
    display: inline-block;
    font-size: 16px;
    margin-left: 4px;
    opacity: 50%;
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
        background: {
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
        },
        subMessage: {
            type: String,
            default: null
        },
        links: {
            type: Array,
            default: () => []
        },
        topColor: {
            type: String,
            default: "dark"
        },
        middleColor: {
            type: String,
            default: "dark"
        },
        bottomColor: {
            type: String,
            default: "dark"
        }
    },
    data: function() {
        return {
            visible: false
        };
    },
    computed: {
        messageReplaced() {
            return this._replaceMessage(this.message);
        },
        subMessageReplaced() {
            return this._replaceMessage(this.subMessage);
        },
        classes() {
            const base = {};
            base[`home-part-top-${this.topColor}`] = true;
            base[`home-part-middle-${this.middleColor}`] = true;
            base[`home-part-bottom-${this.bottomColor}`] = true;
            return base;
        },
        style() {
            const base = {};

            if (this.background) {
                base["background-image"] = `url(${this.background})`;
            }

            return base;
        },
        linksTopColor() {
            return this._linksColor(this.topColor);
        },
        linksBottomColor() {
            return this._linksColor(this.bottomColor);
        }
    },
    methods: {
        async login() {
            try {
                document.location = await this.$ripeIdApi.oauthAuthorize();
            } catch (err) {
                this.handleError(err);
            }
        },
        _linksColor(color) {
            switch (color) {
                case "dark":
                    return "black";
                case "light":
                    return "white";
                default:
                    return null;
            }
        },
        _replaceMessage(message) {
            if (!message) return "";
            return message.replace(/\n/g, "<br/>");
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
