<template>
    <div class="header-platforme full-width">
        <global-events v-on:keyup.esc="dropdownVisible = false" />
        <div class="header-container">
            <div class="header-left">
                <svg
                    class="hamburger"
                    focusable="false"
                    viewBox="0 0 24 24"
                    v-on:click="toggleBurger"
                >
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
                <router-link to="/">
                    <img class="header-logo" v-bind:src="logo" />
                </router-link>
                <search-platforme
                    placeholder="Seach RIPE Pulse"
                    v-bind:grow="true"
                    v-bind:value.sync="searchFilter"
                    v-bind:suggestions="searchSuggestions"
                >
                    <template v-slot:suggestion="{ suggestion }">
                        <slot name="suggestion" v-bind:suggestion="suggestion" />
                    </template>
                </search-platforme>
            </div>
            <div
                class="header-account"
                v-if="account"
                ref="headerAccount"
                v-on:click="accountDropdownVisible = !accountDropdownVisible"
            >
                <img v-bind:src="account.avatar_url" />
                <dropdown-platforme
                    v-bind:items="accountDropdownItems"
                    v-bind:visible="accountDropdownVisible"
                />
            </div>
            <div
                class="header-apps"
                ref="headerApps"
                v-on:click="appsDropdownVisible = !appsDropdownVisible"
            >
                <img src="~./assets/apps.svg" />
                <dropdown-platforme
                    v-bind:items="appsDropdownItems"
                    v-bind:visible="appsDropdownVisible"
                >
                    <template slot-scope="{ item: { id, text, image, link } }">
                        <a v-bind:href="link">
                            <img v-bind:src="image" v-bind:alt="text" />
                            <p>{{ text }}</p>
                        </a>
                    </template>
                </dropdown-platforme>
            </div>
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

.header-platforme {
    background-color: #ffffff;
    border-bottom: 1px solid #e4e8f0;
    height: 60px;
    line-height: 60px;
    padding: 0px 0px 0px 0px;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 10;
}

.app.first .header-platforme {
    animation: fade-into-drop 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.header-platforme > .header-container {
    box-sizing: border-box;
    height: 60px;
    line-height: 60px;
    margin: 0px auto 0px auto;
    max-width: 1240px;
    padding: 0px 12px 0px 0px;
    text-align: left;
}

.header-platforme.full-width > .header-container {
    max-width: 100%;
    padding: 0px 12px 0px 12px;
}

.header-platforme > .header-container > .header-left {
    float: left;
    font-size: 0px;
    height: 60px;
    line-height: 60px;
    text-align: left;
}

.header-platforme > .header-container > .header-left > * {
    vertical-align: middle;
}

.header-platforme > .header-container > .header-left > a {
    border: none;
}

.header-platforme > .header-container > .header-left > a > .header-logo {
    height: 30px;
    vertical-align: middle;
}

.header-platforme > .header-container > .header-account,
.header-platforme > .header-container > .header-apps {
    cursor: pointer;
    float: right;
    font-size: 0px;
    height: 60px;
    line-height: 60px;
    padding: 0px 12px 0px 12px;
    text-align: right;
}

.header-platforme > .header-container > .header-account > * {
    vertical-align: middle;
}

.header-platforme > .header-container > .header-account > img {
    border-radius: 38px 38px 38px 38px;
    height: 38px;
    width: 38px;
}

.header-platforme > .header-container > .header-account ::v-deep .dropdown-platforme {
    right: -12px;
    top: -6px;
}

.header-platforme > .header-container > .header-account ::v-deep .dropdown-platforme li:last-child {
    border-top: 1px solid $border-color;
}

.header-platforme > .header-container > .header-apps {
    margin-right: 6px;
}

.header-platforme > .header-container > .header-apps > img {
    vertical-align: middle;
}

.header-platforme > .header-container > .header-apps ::v-deep .dropdown-platforme {
    background-color: #ffffff;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.07);
    box-sizing: border-box;
    cursor: auto;
    font-size: 0px;
    line-height: normal;
    margin-right: -12px;
    margin-top: -6px;
    max-width: 320px;
    padding: 10px;
    position: static;
    text-align: left;
    white-space: pre;
}

.header-platforme > .header-container > .header-apps ::v-deep .dropdown-platforme li {
    display: inline-block;
    font-size: 12px;
    margin: 0px 0px 0px 0px;
    padding: 20px 10px 20px 10px;
    text-align: center;
    width: 80px;
}

.header-platforme > .header-container > .header-apps ::v-deep .dropdown-platforme li a {
    border-bottom: none;
    color: #000000;
}

.header-platforme > .header-container > .header-apps ::v-deep .dropdown-platforme li img {
    height: 40px;
    width: 40px;
}

.header-platforme > .header-container > .header-apps ::v-deep .dropdown-platforme li p {
    margin: 0px;
}
</style>

<script>
export const HeaderPlatforme = {
    props: {
        logo: {
            type: String,
            default: null
        },
        searchSuggestions: {
            type: Array,
            default: () => []
        }
    },
    data: function() {
        return {
            searchFilter: null,
            appsDropdownVisible: false,
            accountDropdownVisible: false
        };
    },
    computed: {
        account() {
            return this.$root.account;
        },
        accountDropdownItems() {
            const items = [{ id: "email", text: this.account.email }];
            const { name, company, position } = this.account.meta;
            name && items.push({ id: "name", text: name });
            company && items.push({ id: "company", text: company });
            position && items.push({ id: "position", text: position });
            items.push({ id: "signout", text: "Sign out", link: "/signout" });
            return items;
        },
        appsDropdownItems() {
            return [
                {
                    id: "core",
                    text: "Core",
                    image: require("./assets/core.svg"),
                    link: "http://sandbox.platforme.com"
                },
                {
                    id: "copper",
                    text: "Copper",
                    image: require("./assets/copper.svg"),
                    link: "http://ripe-copper-test.platforme.com"
                },
                {
                    id: "pulse",
                    text: "Pulse",
                    image: require("./assets/pulse.svg"),
                    link: "http://ripe-pulse-test.platforme.com"
                },
                {
                    id: "retail",
                    text: "Retail",
                    image: require("./assets/retail.svg"),
                    link: "http://ripe-retail-test.platforme.com"
                }
            ];
        }
    },
    watch: {
        searchFilter(value) {
            this.$emit("search-filter", value);
        }
    },
    created() {
        document.addEventListener("click", this.handleOutsideClick);
    },
    destroyed() {
        document.removeEventListener("click", this.handleOutsideClick);
    },
    methods: {
        toggleBurger() {
            this.$bus.$emit("toggle-side");
        },
        handleOutsideClick(event) {
            const appsDropdown = this.$refs.headerApps;
            const accountDropdown = this.$refs.headerAccount;
            if (event.target !== appsDropdown && !appsDropdown.contains(event.target)) {
                this.appsDropdownVisible = false;
            }
            if (event.target !== accountDropdown && !accountDropdown.contains(event.target)) {
                this.accountDropdownVisible = false;
            }
        }
    }
};

export default HeaderPlatforme;
</script>
