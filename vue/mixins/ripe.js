import { hasPermission, toTokensM } from "yonius";

export const ripeMixin = {
    methods: {
        toTokensM(tokens) {
            return toTokensM(tokens);
        },
        hasPermission(token, tokensM) {
            tokensM = tokensM || this.tokens || {};
            return hasPermission(token, tokensM);
        }
    }
};
