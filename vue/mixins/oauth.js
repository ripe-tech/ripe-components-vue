import Vue from "vue";
import { partMixin } from "./part";

export const oauthMixin = Vue.util.mergeOptions(partMixin, {
    methods: {
        async oauth(next) {
            try {
                const code = this.getQueryParam("code");
                const error = this.getQueryParam("error");
                const errorDescription = this.getQueryParam("error_description");
                if (errorDescription || error) throw new Error(errorDescription || error);
                await this.$ripeIdApi.oauthAccess(code);
                const result = await this.$ripeIdApi.issueToken();
                const account = await this.$ripeIdApi.selfAccount();
                const acl = await this.$ripeIdApi.aclAccount();
                localStorage.setItem("token", result.token);
                localStorage.setItem("account", JSON.stringify(account));
                localStorage.setItem("acl", JSON.stringify(acl.tokens));
                await this.$root.login();
                this.$router.push({ name: next });
            } catch (err) {
                this.handleError(err);
            }
        },
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
