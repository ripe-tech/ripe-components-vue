<template>
    <div class="home-color-part" v-bind:class="classes" v-bind:style="style" v-if="visible">
        <div class="top">
            <router-link class="logo-container" v-bind:to="homeRoute">
                <image-ripe class="logo" v-bind:src="logo" />
            </router-link>
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
                        v-bind:size="'large'"
                        v-on:click="navigate"
                    />
                </router-link>
            </div>
        </div>
        <div class="middle">
            <div class="area area-left">
                <img class="illustration" v-bind:src="illustration" />
            </div>
            <div class="area area-right">
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
                {{ copyright }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
@import "css/animations.scss";

.home-color-part {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.home-color-part > .top {
    animation: fade-into-drop 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
    display: flex;
    flex-wrap: wrap;
    padding: 14px 60px 14px 60px;
}

body.tablet .home-color-part > .top,
body.mobile .home-color-part > .top {
    padding: 0px 20px 0px 20px;
}

.home-color-part > .top > .logo-container {
    display: block;
    height: 60px;
}

.home-color-part > .top > .logo-container > .logo {
    max-height: 100%;
    vertical-align: middle;
}

.home-color-part > .top > .links {
    align-items: center;
    display: inline-flex;
    flex: 1;
    flex-wrap: wrap;
    justify-content: flex-end;
    text-align: right;
}

.home-color-part > .top > .links > .link {
    display: inline-block;
    margin-left: 54px;
}

body.tablet .home-color-part > .top > .links > .link,
body.mobile .home-color-part > .top > .links > .link {
    line-height: 28px;
    margin-left: 16px;
}

.home-color-part > .top > .links > .link:first-child {
    margin-left: 0px;
}

.home-color-part > .middle {
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

.home-color-part.home-color-part-middle-dark > .middle {
    color: $black;
}

.home-color-part.home-color-part-middle-light > .middle {
    color: $white;
}

.home-color-part > .middle > .area {
    margin: 16px;
}

.home-color-part > .middle > .area-left {
    animation: fade-into-rise 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 600px;
}

.home-color-part > .middle > .area-left > .illustration {
    height: 100%;
    width: 100%;
}

.home-color-part > .middle > .area-right {
    animation: fade-into-rise 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 400px;
}

.home-color-part.home-color-part-middle-dark > .middle > .area-right {
    color: $black;
}

.home-color-part > .middle > .area-right > .message {
    font-size: 48px;
    font-weight: 600;
    line-height: 60px;
    margin-bottom: 32px;
}

.home-color-part > .middle > .area-right > .sub-message {
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 30px;
    margin-bottom: 60px;
}

.home-color-part > .bottom {
    padding: 34px 60px 34px 60px;
    text-align: left;
}

.home-color-part.home-color-part-bottom-dark > .bottom {
    color: $black;
}

.home-color-part.home-color-part-bottom-light > .bottom {
    color: $white;
}

.home-color-part > .bottom > .signature {
    display: inline-block;
    font-size: 18px;
}

.home-color-part > .bottom > .copyright {
    display: inline-block;
    font-size: 16px;
    margin-left: 4px;
    opacity: 50%;
}
</style>

<script>
export const HomeColorPart = {
    name: "home-color-part",
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
        copyright: {
            type: String,
            default: "© all rights reserved"
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
            base[`home-color-part-top-${this.topColor}`] = true;
            base[`home-color-part-middle-${this.middleColor}`] = true;
            base[`home-color-part-bottom-${this.bottomColor}`] = true;
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

export default HomeColorPart;
</script>
