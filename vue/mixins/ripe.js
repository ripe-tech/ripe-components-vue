import { hasPermission, toTokensM } from "yonius";

export const ripeMixin = {
    methods: {
        async justificationByCode({
            context = null,
            code = null,
            codeFull = null,
            other = "other;"
        } = {}) {
            // if the other code is used we return with
            // the ad-hoc message
            if (codeFull.includes(other)) {
                const index = codeFull.indexOf(other);
                return {
                    context: "other",
                    code_full: codeFull,
                    text: codeFull.slice(index + other.length)
                };
            }

            // if a full code is provided we extract
            // the context and code from it
            if (codeFull != null) [context, code] = codeFull.split(":");

            // if no context was provided or derived
            // we can't get the justification and return
            if (context === null) return null;

            // fetches the justification context and
            // filters for the code full match
            const justifications = await this.$ripeApi.getJustificationsByContextP(context);
            if (!justifications || justifications.length === 0) return null;

            const justification = justifications.find(j => j.code_full === codeFull);
            return justification !== undefined ? justification : null;
        },
        toTokensM(tokens) {
            return toTokensM(tokens);
        },
        hasPermission(token, tokensM) {
            tokensM = tokensM || this.tokens || {};
            return hasPermission(token, tokensM);
        }
    }
};
