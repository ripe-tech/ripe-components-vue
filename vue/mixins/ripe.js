import { hasPermission, toTokensM } from "yonius";

export const ripeMixin = {
    methods: {
        toTokensM(tokens) {
            return toTokensM(tokens);
        },
        hasPermission(token, tokensM) {
            return hasPermission(token, tokensM);
        }
    }
};
