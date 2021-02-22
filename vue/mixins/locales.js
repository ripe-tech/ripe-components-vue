export const localeMixin = {
    methods: {
        /**
         * Set the currently chosen locale.
         *
         * @param {String} locale  The ISO-15897 standard locale definition string to be set.
         */
        setLocale(locale) {
            this.$store.commit("SET_LOCALE", locale);
        },
        /**
         * Gets the currently chosen locale.
         *
         * @returns {String} The chosen locale. If it's not set, it will return the fallback
         * locale instead.
         */
        getLocale() {
            return (
                this.$store.state.localePlugin.locale ||
                this.$store.state.localePlugin.localeFallback
            );
        },
        /**
         * Sets the fallback locale.
         *
         * @param {String} locale  The ISO-15897 standard locale definition string to be set.
         */
        setLocaleFallback(locale) {
            this.$store.commit("SET_LOCALE_FALLBACK", locale);
        },
        /**
         * Gets the fallback locale.
         *
         * @returns {String} The fallback locale.
         */
        getLocaleFallback() {
            return this.$store.state.localePlugin.localeFallback;
        },
        /**
         * Set the locales information.
         *
         * @param {Object} locales  The locales information object. Example:
         * { en_us: { "ripe_twitch.value_a.value_b": "Value Example" } }.
         */
        setLocales(locales = {}) {
            this.$store.commit("SET_LOCALES", locales);
        },
        /**
         * Gets the object with all the locales.
         *
         * @returns {Object} The object with all the locales.
         */
        getLocales() {
            return this.$store.state.localePlugin.locales;
        },
        /**
         * Appends new locales information to the specified locale. If the locale isn't
         * specified, it will use the already chosen locale.
         *
         * @param {Object} locales  The locales information object. Example:
         * { en_us: { "ripe_twitch.value_a.value_b": "Value Example" } }.
         * @param {String} locale  The ISO-15897 standard locale definition string to be set.
         */
        addLocales(locales = {}, locale = null) {
            locale = locale || this.getLocale();

            const localeObj = this.getLocales()[locale] || {};
            const updatedLocaleObj = { ...localeObj, ...locales };
            this.setLocales({
                ...this.getLocales(),
                ...{ [locale]: updatedLocaleObj }
            });
        },
        /**
         * Should be called when first opening the extension. It setups the locales plugin by
         * registering a new module in the store named "localePlugin" and sets the given locale,
         * local locales, and fallback locale.
         *
         * @param {Object} store  Vuex store that is going to be used to register the needed
         * localePlugin module.
         * @param {Object} localLocales  The local locales information object that should be loaded
         * and added throught this field. Example:
         * {
         *     en_us: { "ripe_twitch.value_a.value_b": "Value Example" },
         *     pt_pt: { "ripe_twitch.value_a.value_b": "Valor Exemplo"}
         * }.
         * @param {String} locale  The ISO-15897 standard locale definition string to be set as the
         * chosen locale.
         * @param {String} localeFallback  The ISO-15897 standard locale definition string to be set as the
         * fallback locale.
         */
        setupLocalePlugin(store, localLocales, locale, localeFallback) {
            localLocales = localLocales || {};
            locale = locale || Object.keys(localLocales)[0];
            localeFallback = localeFallback || "en_us";

            // Setup localePlugin store
            store.registerModule("localePlugin", {
                state: {
                    locale: locale || null,
                    localeFallback: localeFallback,
                    locales: localLocales
                },
                mutations: {
                    SET_LOCALE(state, value) {
                        state.locale = value;
                    },
                    SET_LOCALE_FALLBACK(state, value) {
                        state.localeFallback = value;
                    },
                    SET_LOCALES(state, value) {
                        state.locales = value;
                    }
                }
            });
        },
        /**
         * Destroy traces of the locale plugin by unregistering the "localePlugin" module from the store.
         */
        destroyLocalePlugin() {
            this.$store.unregisterModule("localePlugin");
        },
        /**
         * Checks if a value is localized in the provided locale. If the locale
         * isn't specified, it will use the already chosen locale.
         *
         * @param {String} value  The value that is going to be checked.
         * @param {String} locale  The ISO-15897 standard locale definition string to be used for the check.
         * @returns {Boolean} Returns true if the value is localized, false otherwise.
         */
        isValueLocalized(value, locale = null) {
            locale = locale || this.getLocale();
            const locales = this.getLocales();

            return Boolean(locales[locale] && locales[locale][value]);
        },
        /**
         * Localizes a value to the specified locale. If the locale isn't specified, it will use
         * the already chosen locale.
         *
         * @param {String} value  The value that is going to be localized.
         * @param {String} defaultValue  The value to be returned if the value can't be localized.
         * @param {String} locale  The ISO-15897 standard locale definition string to be used in the
         * localization process.
         * @returns {String} Localized value. If the "value" can't be localized and the "defaultValue" isn't
         * set, it returns the "value".
         */
        locale(value, defaultValue, locale = null) {
            locale = locale || this.getLocale();
            const locales = this.getLocales();

            if (this.isValueLocalized(value, locale)) return locales[locale][value];
            return defaultValue || value;
        }
    }
};
