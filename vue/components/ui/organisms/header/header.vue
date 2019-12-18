<template>
    <div class="header-ripe full-width" v-bind:class="{ 'no-side': !sideMenu }">
        <global-events v-on:keydown.esc="dropdownVisible = false" />
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
                <router-link to="/">
                    <img class="header-logo" v-bind:src="logo" />
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
                v-bind:class="{ active: accountDropdownVisible }"
                v-if="account"
                ref="headerAccount"
                v-on:click.stop="hideAccount"
            >
                <img v-bind:src="account.avatar_url" />
                <dropdown
                    v-bind:items="accountDropdownItems"
                    v-bind:visible.sync="accountDropdownVisible"
                >
                    <template v-slot:announcement="{ item }">
                        <div class="dropdown-item-announcement" v-on:click="onAnnoucementsClick">
                            <span class="announcement-dropdown-text">{{ item.text }}</span>
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
                v-on:click.stop="hideApps"
            >
                <img src="~./assets/apps.svg" />
                <dropdown
                    v-bind:items="appsDropdownItems"
                    v-bind:visible.sync="appsDropdownVisible"
                >
                    <template v-slot="{ item: { id, text, image, link, cls } }">
                        <a v-bind:href="link" v-bind:class="[cls]">
                            <img v-bind:src="image" v-bind:alt="text" />
                            <p>{{ text }}</p>
                        </a>
                    </template>
                </dropdown>
            </div>
            <announcement-modal
                v-bind:visible="announcementModalVisible"
                v-bind:notify-color="notifyColor"
                v-bind:title="announcements.title"
                v-bind:description="announcements.description"
                v-bind:show-notify="announcements.show_notify"
                v-bind:new-delta="announcements.new_delta"
                v-bind:dot-clickable="announcements.user_read"
                v-bind:reaction="announcements.reaction"
                v-bind:announcements="announcements.items"
                v-on:click:announcement="onUpdateAnnouncement"
                v-on:update:notify="onUpdateNotify"
                v-on:update:reaction="onUpdateReaction"
                v-on:update:visible="onUpdateAnnouncementVisible"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

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

.header-ripe {
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

.app.first .header-ripe {
    animation: fade-into-drop 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.header-ripe > .header-container {
    box-sizing: border-box;
    height: 60px;
    line-height: 60px;
    margin: 0px auto 0px auto;
    max-width: 1240px;
    padding: 0px 12px 0px 0px;
    text-align: left;
}

.header-ripe.full-width > .header-container {
    max-width: 100%;
    padding: 0px 12px 0px 12px;
}

.header-ripe > .header-container > .header-left {
    float: left;
    font-size: 0px;
    height: 60px;
    line-height: 60px;
    text-align: left;
}

.header-ripe.no-side > .header-container > .header-left {
    padding-left: 12px;
}

.header-ripe > .header-container > .header-left > * {
    vertical-align: middle;
}

.header-ripe > .header-container > .header-left > a {
    border: none;
}

.header-ripe > .header-container > .header-left > a > .header-logo {
    height: 30px;
    vertical-align: middle;
}

.header-ripe > .header-container > .header-account,
.header-ripe > .header-container > .header-apps {
    cursor: pointer;
    float: right;
    font-size: 0px;
    height: 60px;
    line-height: 60px;
    padding: 0px 12px 0px 6px;
    text-align: right;
}

.header-ripe > .header-container > .header-account > * {
    vertical-align: middle;
}

.header-ripe > .header-container > .header-account > img {
    border-radius: 34px 34px 34px 34px;
    height: 34px;
    padding: 6px 6px 6px 6px;
    width: 34px;
}

.header-ripe > .header-container > .header-account > img:hover {
    background-color: rgba(60, 64, 67, 0.08);
}

.header-ripe > .header-container > .header-account > img:active,
.header-ripe > .header-container > .header-account.active > img {
    background-color: rgba(60, 64, 67, 0.2);
}

.header-ripe > .header-container > .header-account ::v-deep .dropdown {
    color: $lower-color;
    font-size: 13px;
    left: auto;
    margin-left: -130px;
    margin-top: -4px;
    min-width: 180px;
    text-align: left;
}

.header-ripe > .header-container > .header-account ::v-deep .dropdown > .dropdown-item > * {
    box-sizing: border-box;
    display: inline-block;
    padding: 8px 14px 8px 14px;
    width: 100%;
}

.header-ripe > .header-container > .header-account ::v-deep .dropdown > .dropdown-item > a {
    color: $lower-color;
}

.header-ripe > .header-container > .header-account ::v-deep .dropdown > .dropdown-item:hover > a,
.header-ripe > .header-container > .header-account ::v-deep .dropdown > .dropdown-item.selected > a {
    color: $higher-color;
}

.header-ripe > .header-container > .header-apps {
    margin-right: 6px;
    padding: 0px 0px 0px 0px;
}

.header-ripe > .header-container > .header-apps > img {
    border-radius: 24px 24px 24px 24px;
    height: 22px;
    padding: 12px 12px 12px 12px;
    vertical-align: middle;
}

.header-ripe > .header-container > .header-apps > img:hover {
    background-color: rgba(60, 64, 67, 0.08);
}

.header-ripe > .header-container > .header-apps > img:active,
.header-ripe > .header-container > .header-apps.active > img {
    background-color: rgba(60, 64, 67, 0.2);
}

.header-ripe > .header-container > .header-apps ::v-deep .dropdown {
    background-color: $white;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.07);
    box-sizing: border-box;
    cursor: auto;
    font-size: 0px;
    line-height: normal;
    margin-right: -6px;
    margin-top: -4px;
    max-width: 320px;
    padding: 10px;
    position: absolute;
    right: 0px;
    text-align: left;
    white-space: pre;
}

.header-ripe > .header-container > .header-apps ::v-deep .dropdown li {
    border-radius: 8px 8px 8px 8px;
    display: inline-block;
    font-size: 12px;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    text-align: center;
}

.header-ripe > .header-container > .header-apps ::v-deep .dropdown li a {
    border-bottom: none;
    color: #000000;
    display: inline-block;
    padding: 16px 6px 16px 6px;
    text-decoration: none;
    width: 100px;
}

.header-ripe > .header-container > .header-apps ::v-deep .dropdown li img {
    height: 40px;
    width: 40px;
}

.header-ripe > .header-container > .header-apps ::v-deep .dropdown li p {
    font-weight: 600;
    margin: 6px 0px 0px 0px;
}

.header-ripe .dropdown-item-announcement .announcement-dropdown-text {
    width: auto;
}

.header-ripe .dropdown-item-announcement .dot {
    background-color: #4b8dd7;
    border: 1px solid #ffffff;
    border-radius: 50%;
    float: right;
    height: 8px;
    margin: 3px 3px 0px 0px;
    padding: 0px 0px 0px 0px;
    width: 8px;
}

.header-ripe .announcements-container {
    position: absolute;
    right: 0px;
    top: 60px;
}
</style>

<script>
export const Header = {
    name: "header-ripe",
    props: {
        sideMenu: {
            type: Boolean,
            default: true
        },
        search: {
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
        notifyColor: {
            type: String,
            default: "#3c80cd"
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
            announcementModalVisible: false
        };
    },
    computed: {
        account() {
            return this.platformeAccount || this.$root.account;
        },
        accountDropdownItems() {
            const items = [];
            const { name, email } = this.account.meta;
            items.push({ id: "name", text: name || email || this.account.email });
            items.push({ id: "buckets", text: "Buckets" });
            items.push({ id: "announcement", text: "What's new?" });
            items.push({ id: "settings", text: "Account settings", separator: true });
            items.push({ id: "signout", text: "Sign out", link: "/signout" });
            return items;
        },
        appsDropdownItems() {
            const items = [];
            for (const value of ["copper", "pulse"]) {
                if (!this.apps[value]) continue;
                const app = this.apps[value];
                items.push({
                    id: app.id || value,
                    text: app.text || value.charAt(0).toUpperCase() + value.slice(1),
                    cls: value,
                    image: app.image || require(`./assets/apps/${value}.svg`),
                    link: app.link || `https://${value}.platforme.com"`
                });
            }
            return items;
        },
        announcementsToRead() {
            return this.announcements.items.length === 0
                ? false
                : this.announcements.items[0].timestamp > Date.now() - this.announcements.new_delta;
        }
    },
    watch: {
        searchFilter(value) {
            this.$emit("search-filter", value);
        }
    },
    methods: {
        setAnnouncementVisibility(visibility) {
            this.announcementModalVisible = visibility;
        },
        toggleBurger() {
            this.$bus.$emit("toggle-side");
        },
        hideAccount() {
            const status = this.accountDropdownVisible;
            document.body.click();
            this.accountDropdownVisible = !status;
        },
        hideApps() {
            const status = this.appsDropdownVisible;
            document.body.click();
            this.appsDropdownVisible = !status;
        },
        onAnnoucementsClick() {
            this.setAnnouncementVisibility(true);
        },
        onUpdateAnnouncement(index) {
            this.$emit("click:announcement", index);
        },
        onUpdateNotify(value) {
            this.$emit("update:notify", value);
        },
        onUpdateReaction(index) {
            this.$emit("update:reaction", index);
        },
        onUpdateAnnouncementVisible(visibility) {
            this.setAnnouncementVisibility(visibility);
        }
    }
};

export default Header;
</script>
