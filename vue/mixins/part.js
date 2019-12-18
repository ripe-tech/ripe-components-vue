const partMixin = {
    methods: {
        /**
         * Handles the error in the UI so that the user is
         * properly notified about the problem.
         * Typical handling involves router redirection.
         *
         * @param {Error} err The error object to be used in the
         * handling of the error.
         * @param {String} message The message to be used in for the
         * error handling if not provided the default one extracted
         * from the error is used.
         */
        handleError(err, message, code) {
            code = code || err.code;
            const query = { message: message || err.message };
            if (code) query.code = code;
            this.$root.$router.push({
                name: "error",
                query: query
            });
        },
        hasPermission(token) {
            return this.$root.hasPermission(token);
        },
        ensurePermission(token) {
            if (!this.hasPermission(token)) {
                this.handleError(null, "Not enough permissions", 403);
                return false;
            }
            return true;
        },
        async alert(message, options = {}) {
            await this.alertMessage(message, options);
        },
        async alertMessage(message, options = {}) {
            options.text = message;
            return this._alert(options);
        },
        async alertComponent(component, options = {}) {
            options.component = component;
            return this._alert(options);
        },
        async _alert(options = {}) {
            const promise = new Promise((resolve, reject) => {
                try {
                    this.$bus.$on("alert:confirm", () => resolve(true));
                    this.$bus.$on("alert:cancel", () => resolve(false));
                } catch (err) {
                    reject(err);
                }
            });
            this.$bus.$emit("alert", options);
            const result = await promise;
            return result;
        }
    }
};

export { partMixin };
