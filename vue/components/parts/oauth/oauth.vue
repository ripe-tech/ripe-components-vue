<template>
    <div class="oauth">
        <div class="oauth-container">
            <loader-platforme loader="ball-scale-multiple" class="loader-header" />
            <h2>Redirecting from Platforme ID ...</h2>
        </div>
    </div>
</template>

<style scoped>
.oauth {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
}

.oauth-container {
    animation: fade-in 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin: 0px auto 0px auto;
    text-align: center;
}

.ball-scale-multiple {
    display: inline-block;
    margin-bottom: 32px;
}
</style>

<script>
import Vue from "vue";

import { partMixin } from "../../../mixins";

export const OAuth = Vue.component("oauth", {
    mixins: [partMixin],
        props: {
        next: {
            type: String,
            default: "landing"
        }
    },
    async created() {
        try {
            debugger;
            const code = this.getQueryParam("code");
            console.info(code);
            console.info(this.$ripeIdApi);
            await this.$ripeIdApi.oauthAccess(code);
            console.info("access");
            const result = await this.$ripeIdApi.issueToken();
            const account = await this.$ripeIdApi.selfAccount();
            const acl = await this.$ripeIdApi.aclAccount();
            localStorage.setItem("token", result.token);
            localStorage.setItem("account", JSON.stringify(account));
            localStorage.setItem("acl", JSON.stringify(acl.tokens));
            await this.$root.login();
            this.$router.push({ name: this.next });
        } catch (err) {
            this.handleError(err);
        }
    },
    methods: {
        getQueryParam(name) {
            const query = window.location.search.substring(1);
            const vars = query.split("&");
            for (const item of vars) {
                const pair = item.split("=");
                if (decodeURIComponent(pair[0]) === name) {
                    return decodeURIComponent(pair[1]);
                }
            }
            return null;
        }
    }
});

export default OAuth;
</script>
