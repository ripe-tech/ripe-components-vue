<template>
    <div class="header-ripe">
        <global-events v-on:keydown.esc="dropdownVisible = false" />
        <div class="header-bar full-width" v-bind:class="{ 'no-side': !sideMenu }">
            <div class="header-container">
                <div class="header-left">
                    <svg
                        class="hamburger"
                        focusable="false"
                        viewBox="0 0 24 24"
                        v-if="sideMenu"
                        v-on:click="toggleBurger"
                    >
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                    </svg>
                    <router-link class="header-logo-container" to="/">
                        <image-ripe
                            class="header-logo"
                            v-bind:src="logo"
                            v-bind:width="logoWidth"
                            v-bind:height="logoHeight"
                            v-bind:fade="false"
                        />
                    </router-link>
                    <search
                        v-bind:placeholder="searchPlaceholder"
                        v-bind:grow="true"
                        v-bind:value.sync="searchFilter"
                        v-bind:suggestions="searchSuggestions"
                        v-if="search"
                    >
                        <template v-slot:suggestion="{ suggestion }">
                            <slot name="suggestion" v-bind:suggestion="suggestion" />
                        </template>
                    </search>
                </div>
                <div
                    class="header-account"
                    v-if="account"
                    ref="headerAccount"
                    v-on:click="onAccountClick"
                >
                    <avatar
                        v-bind:src="account.avatar_url"
                        v-bind:clickable="true"
                        v-bind:active="accountDropdownVisible"
                        v-bind:notify="announcementsToRead"
                    />
                    <dropdown
                        v-bind:items="accountDropdownItems"
                        v-bind:visible.sync="accountDropdownVisible"
                        v-bind:global-hide="true"
                        v-bind:owners="$refs.headerAccount"
                    >
                        <template v-slot:announcements="{ item }">
                            <div
                                class="dropdown-item-announcements"
                                v-on:click.stop="onAnnouncementsClick"
                            >
                                <span class="announcements-dropdown-text">{{ item.label }}</span>
                                <div class="dot" v-if="announcementsToRead" />
                            </div>
                        </template>
                    </dropdown>
                </div>
                <div
                    class="header-apps"
                    v-bind:class="{ active: appsDropdownVisible }"
                    v-if="headerApps && appsDropdownItems.length > 0"
                    ref="headerApps"
                    v-on:click="onAppsClick"
                >
                    <img src="~./assets/apps.svg" />
                    <dropdown
                        v-bind:items="appsDropdownItems"
                        v-bind:visible.sync="appsDropdownVisible"
                        v-bind:global-hide="true"
                        v-bind:owners="$refs.headerApps"
                    >
                        <template v-slot="{ item: { label, image, link, cls } }">
                            <a v-bind:href="link" v-bind:class="[cls]">
                                <img v-bind:src="image" v-bind:alt="label" />
                                <p>{{ label }}</p>
                            </a>
                        </template>
                    </dropdown>
                </div>
            </div>
        </div>
        <div class="header-globals">
            <template v-if="announcements && announcements.items">
                <bubble
                    v-bind:visible.sync="announcementsModalVisible"
                    v-if="isMobileWidth()"
                    v-slot="{ hide }"
                >
                    <announcements
                        v-bind:title="announcements.title"
                        v-bind:description="announcements.description"
                        v-bind:new-threshold="announcements.new_threshold"
                        v-bind:show-subscribe="announcements.show_subscribe"
                        v-bind:show-links="announcements.show_links"
                        v-bind:show-reactions="announcements.show_reactions"
                        v-bind:announcements="announcements.items"
                        v-on:click:close="hide"
                    />
                </bubble>
                <side
                    v-bind:visible.sync="announcementsModalVisible"
                    v-bind:width="370"
                    v-bind:position="'right'"
                    v-else
                    v-slot="{ hide }"
                >
                    <announcements
                        v-bind:title="announcements.title"
                        v-bind:description="announcements.description"
                        v-bind:new-threshold="announcements.new_threshold"
                        v-bind:show-subscribe="announcements.show_subscribe"
                        v-bind:show-links="announcements.show_links"
                        v-bind:show-reactions="announcements.show_reactions"
                        v-bind:announcements="announcements.items"
                        v-on:click:close="hide"
                    />
                </side>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
@import "css/animations.scss";

.hamburger {
    border-radius: 34px 34px 34px 34px;
    cursor: pointer;
    height: 24px;
    margin-right: 16px;
    padding: 12px 12px 12px 12px;
    transition: background-color 0.15s ease;
    width: 24px;
}

.hamburger:hover {
    background-color: rgba(60, 64, 67, 0.08);
    outline: none;
}

.hamburger:active {
    background-color: rgba(60, 64, 67, 0.2);
}

.header-ripe > .header-bar {
    background-color: $white;
    border-bottom: 1px solid #e4e8f0;
    height: 60px;
    line-height: 60px;
    padding: 0px 0px 0px 0px;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 30;
}

.app.first .header-ripe > .header-bar {
    animation: fade-into-drop 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.header-ripe > .header-bar > .header-container {
    box-sizing: border-box;
    height: 60px;
    line-height: 60px;
    margin: 0px auto 0px auto;
    max-width: 1240px;
    padding: 0px 12px 0px 0px;
    text-align: left;
}

.header-ripe > .header-bar.full-width > .header-container {
    max-width: 100%;
    padding: 0px 12px 0px 12px;
}

.header-ripe > .header-bar > .header-container > .header-left {
    float: left;
    font-size: 0px;
    height: 60px;
    line-height: 60px;
    text-align: left;
}

.header-ripe > .header-bar.no-side > .header-container > .header-left {
    padding-left: 12px;
}

.header-ripe > .header-bar > .header-container > .header-left > * {
    vertical-align: middle;
}

.header-ripe > .header-bar > .header-container > .header-left > .header-logo-container {
    border: none;
    display: inline;
    margin-right: 16px;
}

.header-ripe > .header-bar > .header-container > .header-left > .header-logo-container:last-child {
    margin-right: 0px;
}

.header-ripe > .header-bar > .header-container > .header-left > .header-logo-container > .header-logo {
    height: 30px;
    vertical-align: middle;
}

.header-ripe > .header-bar > .header-container > .header-account,
.header-ripe > .header-bar > .header-container > .header-apps {
    cursor: pointer;
    float: right;
    font-size: 0px;
    height: 60px;
    line-height: 60px;
    padding: 0px 12px 0px 6px;
    text-align: right;
}

.header-ripe > .header-bar > .header-container > .header-account > * {
    vertical-align: middle;
}

.header-ripe > .header-bar > .header-container > .header-account > .dropdown-container ::v-deep .dropdown {
    color: $lower-color;
    font-size: 13px;
    left: auto;
    margin-left: -130px;
    margin-top: -4px;
    min-width: 180px;
    position: absolute;
    right: 0px;
    text-align: left;
}

.header-ripe > .header-bar > .header-container > .header-account > .dropdown-container ::v-deep .dropdown > .dropdown-item > * {
    box-sizing: border-box;
    display: inline-block;
    padding: 8px 14px 8px 14px;
    width: 100%;
}

.header-ripe > .header-bar > .header-container > .header-account > .dropdown-container ::v-deep .dropdown > .dropdown-item > a {
    color: $lower-color;
}

.header-ripe > .header-bar > .header-container > .header-account > .dropdown-container ::v-deep .dropdown > .dropdown-item:hover > a,
.header-ripe > .header-bar > .header-container > .header-account > .dropdown-container ::v-deep .dropdown > .dropdown-item.selected > a {
    color: $higher-color;
}

.header-ripe > .header-bar > .header-container > .header-apps {
    margin-right: 6px;
    padding: 0px 0px 0px 0px;
}

.header-ripe > .header-bar > .header-container > .header-apps > img {
    border-radius: 24px 24px 24px 24px;
    height: 22px;
    padding: 12px 12px 12px 12px;
    vertical-align: middle;
}

.header-ripe > .header-bar > .header-container > .header-apps > img:hover {
    background-color: rgba(60, 64, 67, 0.08);
}

.header-ripe > .header-bar > .header-container > .header-apps > img:active,
.header-ripe > .header-bar > .header-container > .header-apps.active > img {
    background-color: rgba(60, 64, 67, 0.2);
}

.header-ripe > .header-bar > .header-container > .header-apps > .dropdown-container {
    margin-left: -6px;
}

.header-ripe > .header-bar > .header-container > .header-apps > .dropdown-container ::v-deep .dropdown {
    background-color: $white;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.07);
    box-sizing: border-box;
    cursor: auto;
    font-size: 0px;
    line-height: normal;
    margin-right: -6px;
    margin-top: -4px;
    max-width: 358px;
    padding: 10px;
    position: absolute;
    right: 0px;
    text-align: left;
    width: max-content;
}

body.mobile .header-ripe > .header-bar > .header-container > .header-apps > .dropdown-container ::v-deep .dropdown {
    border-radius: 0px 0px 0px 0px;
    left: 0px;
    min-width: 100%;
    position: fixed;
    text-align: center;
}

.header-ripe > .header-bar > .header-container > .header-apps > .dropdown-container ::v-deep .dropdown li {
    border-radius: 8px 8px 8px 8px;
    display: inline-block;
    font-size: 12px;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    text-align: center;
}

.header-ripe > .header-bar > .header-container > .header-apps > .dropdown-container ::v-deep .dropdown li a {
    border-bottom: none;
    color: $blacker;
    display: inline-block;
    padding: 16px 6px 16px 6px;
    text-decoration: none;
    width: 100px;
}

.header-ripe > .header-bar > .header-container > .header-apps > .dropdown-container ::v-deep .dropdown li img {
    height: 40px;
    width: 40px;
}

.header-ripe > .header-bar > .header-container > .header-apps > .dropdown-container ::v-deep .dropdown li p {
    font-weight: 600;
    margin: 6px 0px 0px 0px;
}

.header-ripe > .header-bar .dropdown-item-announcements .announcements-dropdown-text {
    width: auto;
}

.header-ripe > .header-bar .dropdown-item-announcements .dot {
    background-color: #4b8dd7;
    border: 1px solid #ffffff;
    border-radius: 50% 50% 50% 50%;
    float: right;
    height: 8px;
    margin: 3px 3px 0px 0px;
    padding: 0px 0px 0px 0px;
    width: 8px;
}

.header-ripe > .header-globals > .bubble {
    left: unset;
    right: 8px;
    top: 56px;
    width: 370px;
}

body.mobile .header-ripe > .header-globals > .bubble {
    right: 0px;
    top: 0px;
    width: 100%;
}
</style>

<script>
import { partMixin } from "../../../../mixins";

export const Header = {
    name: "header-ripe",
    mixins: [partMixin],
    props: {
        sideMenu: {
            type: Boolean,
            default: true
        },
        search: {
            type: Boolean,
            default: true
        },
        settings: {
            type: Boolean,
            default: true
        },
        signout: {
            type: Boolean,
            default: true
        },
        headerApps: {
            type: Boolean,
            default: true
        },
        logo: {
            type: String,
            default: null
        },
        logoWidth: {
            type: Number,
            default: null
        },
        logoHeight: {
            type: Number,
            default: null
        },
        searchPlaceholder: {
            type: String,
            default: "Search RIPE"
        },
        searchSuggestions: {
            type: Array,
            default: () => []
        },
        platformeAccount: {
            type: Object,
            default: () => null
        },
        apps: {
            type: Object,
            default: () => ({})
        },
        announcements: {
            type: Object,
            default: null
        }
    },
    data: function() {
        return {
            searchFilter: null,
            appsDropdownVisible: false,
            accountDropdownVisible: false,
            announcementsModalVisible: false
        };
    },
    computed: {
        account() {
            return this.platformeAccount || this.$root.account;
        },
        accountDropdownItems() {
            const items = [];
            const { name, email } = this.account.meta;
            items.push({ value: "name", label: name || email || this.account.email });
            if (this.announcements) items.push({ value: "announcements", label: "What's new?" });
            if (this.settings) {
                items.push({
                    value: "settings",
                    label: "Account settings",
                    separator: true
                });
            }
            if (this.signout) {
                items.push({
                    value: "signout",
                    label: "Sign out",
                    link: "/signout",
                    separator: !this.settings
                });
            }
            return items;
        },
        appsDropdownItems() {
            const items = [];
            for (const value of Object.keys(this.apps)) {
                if (!this.apps[value]) continue;
                const app = this.apps[value];
                items.push({
                    value: app.id || value,
                    label: app.text || value.charAt(0).toUpperCase() + value.slice(1),
                    cls: value,
                    image: app.image || require(`./assets/apps/${value}.svg`),
                    link: app.link || `https://${value}.platforme.com"`
                });
            }
            return items;
        },
        announcementsToRead() {
            if (!this.announcements) return false;
            if (!this.announcements.items) return false;
            const reference =
                this.announcements.items.length > 0 ? this.announcements.items[0].timestamp : 0;
            return reference * 1000 > Date.now() - this.announcements.new_threshold * 1000;
        }
    },
    watch: {
        searchFilter(value) {
            this.$emit("search-filter", value);
        }
    },
    methods: {
        toggleBurger() {
            this.$bus.$emit("toggle-side");
        },
        toggleAccount() {
            this.accountDropdownVisible = !this.accountDropdownVisible;
        },
        toggleApps() {
            this.appsDropdownVisible = !this.appsDropdownVisible;
        },
        showAnnouncements() {
            this.announcementsModalVisible = true;
        },
        onAccountClick() {
            this.toggleAccount();
        },
        onAppsClick() {
            this.toggleApps();
        },
        onAnnouncementsClick() {
            this.showAnnouncements();
            this.toggleAccount();
        }
    }
};

export default Header;
</script>
