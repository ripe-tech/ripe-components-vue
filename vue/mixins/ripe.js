const ripeMixin = {
    methods: {
        toTokensM(tokens) {
            const tokensM = {};

            if (tokens === undefined) return tokensM;
            if (tokens === null) return tokensM;
            if (!Array.isArray(tokens)) return tokensM;

            for (const token of tokens) {
                let tokensC = tokensM;
                const tokenL = token.split(".");
                const head = tokenL.slice(0, tokenL.length - 1);
                const tail = tokenL[tokenL.length - 1];

                for (const tokenP of head) {
                    let current = tokensC[tokenP] || {};
                    const isDict = typeof current === "object";
                    if (!isDict) current = { _: current };
                    tokensC[tokenP] = current;
                    tokensC = current;
                }

                const leaf = tokensC[tail] || null;
                if (leaf && typeof leaf === "object") leaf._ = true;
                else tokensC[tail] = true;
            }

            return tokensM;
        },
        hasPermission(token, tokensM = null) {
            tokensM = tokensM || this.tokens;
            if (!token) return true;
            if (tokensM === undefined || tokensM === null) return false;

            const tokenL = token.split(".");
            for (const tokenP of tokenL) {
                if (typeof tokensM !== "object") return false;
                if (tokensM["*"]) return true;
                if (tokensM[tokenP] === undefined) return false;
                tokensM = tokensM[tokenP];
            }

            const isDict = typeof tokensM === "object";
            const result = isDict ? tokensM["_"] || false : tokensM;

            return Boolean(result);
        }
    }
};

export { ripeMixin };
