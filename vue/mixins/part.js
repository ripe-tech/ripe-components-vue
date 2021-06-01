import { OperationalError } from "yonius";

export const partMixin = {
    methods: {
        /**
         * Handles the error in the UI so that the user is
         * properly notified about the problem.
         * Typical handling involves router redirection.
         *
         * @param {Error} error The error object to be used in the
         * handling of the error.
         * @param {String} message The message to be used in for the
         * error handling if not provided the default one extracted
         * from the error is used.
         * @param {Number} code The error code to be used in the handling of
         * the error, used as a override value against the error object.
         * @param {Boolean} log If logging of the error should be performed
         * at the console, exposing the error "in depth" (includes stacktrace).
         */
        handleError(error, message, code, log = true) {
            if (log) console.error(error);
            if (!this.$root.$router) return;
            code = code || error.code;
            const query = { message: message || error.message };
            if (code) query.code = code;
            this.$root.$router.push({
                name: "error",
                query: query
            });
        },
        hasPermission(token) {
            return this.$root.hasPermission(token);
        },
        ensurePermission(token, raiseE = true) {
            if (!this.hasPermission(token)) {
                this.handleError(null, "Not enough permissions", 403);
                if (raiseE) throw new OperationalError("Not enough permissions", 403);
                return false;
            }
            return true;
        },
        async alert(message, options = {}) {
            const result = await this.alertMessage(message, options);
            return result;
        },
        async alertMessage(message, options = {}) {
            options.text = message;
            const result = await this._alert(options);
            return result;
        },
        async alertSimple(message, options = {}) {
            options.text = message;
            if (options.title === undefined) options.title = "Alert";
            if (options.buttonCancel === undefined) options.buttonCancel = false;
            const result = await this._alert(options);
            return result;
        },
        async alertComponent(component, options = {}) {
            options.component = component;
            const result = await this._alert(options);
            return result;
        },
        async notify(message, options = {}) {
            this.notifyMessage(message, options);
        },
        async notifyMessage(message, options = {}) {
            options.text = message;
            this._notify(options);
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
        },
        async _notify(options = {}) {
            this.$bus.$emit("notification", options);
        },
        isMobile() {
            return this.$root.$device && this.$root.$device.isMobile;
        },
        isTablet() {
            return this.$root.$device && this.$root.$device.isTablet;
        },
        isDevice() {
            return this.$root.$device && this.$root.$device.isDevice;
        },
        isDesktop() {
            return this.$root.$device && this.$root.$device.isDesktop;
        },
        isTouch() {
            return this.$root.$device && this.$root.$device.isTouch;
        },
        isMouse() {
            return this.$root.$device && this.$root.$device.isMouse;
        },
        isDesktopWidth() {
            return this.$root.$device && this.$root.$device.isDesktopWidth;
        },
        isTabletWidth() {
            return this.$root.$device && this.$root.$device.isTabletWidth;
        },
        isMobileWidth() {
            return this.$root.$device && this.$root.$device.isMobileWidth;
        }
    }
};
