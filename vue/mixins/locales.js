export const localeMixin = {
    methods: {
        /**
         * Set currently chosen locale. Example: "en_us".
         */
        setLocale(locale) {
            this.$store.commit("SET_LOCALE", locale);
        },
        /**
         * Get the currently chosen locale.
         */
        getLocale() {
            return (
                this.$store.state.localePlugin.locale ||
                this.$store.state.localePlugin.localeFallback
            );
        },
        /**
         * Set the fallback locale. Example: "en_us".
         */
        setLocaleFallback(locale) {
            this.$store.commit("SET_LOCALE_FALLBACK", locale);
        },
        /**
         * Get the fallback locale.
         */
        getLocaleFallback() {
            return this.$store.state.localePlugin.localeFallback;
        },
        /**
         * Set locales information. Example:
         * { en_us: { "ripe_twitch.value_a.value_b": "Value Example" } }.
         */
        setLocales(locales = {}) {
            this.$store.commit("SET_LOCALES", locales);
        },
        /**
         * Get the object with all the locales.
         */
        getLocales() {
            return this.$store.state.localePlugin.locales;
        },
        /**
         * Append new locales information. If the locale isn't specified,
         * it will use the already chosen locale. Example:
         * locales: { "ripe_twitch.value_a.value_b": "Value Example" }
         * locale: "en_us".
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
         * Should be called when first opening the extension. It setups the
         * locales plugin by registering a new module named "localePlugin"
         * and sets the given locale and local locales.
         * localLocales: { en_us: { "ripe_twitch.value_a.value_b": "Value Example" },
         * pt_pt: { "ripe_twitch.value_a.value_b": "Value Example" } }
         * locale: "en_us".
         */
        setupLocalePlugin(store, localLocales, locale, localeFallback) {
            localLocales = localLocales || {};
            locale = locale || Object.keys(localLocales)[0];
            localeFallback = localeFallback || "en_us";

            // Setup localePlugin store
            store.registerModule("localePlugin", {
                state: {
                    locale: locale,
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
         * Destroy traces of the locale plugin.
         */
        destroyLocalePlugin() {
            this.$store.unregisterModule("localePlugin");
        },
        /**
         * Checks if a value is localized in the provided locale. If the locale
         * isn't specified, it will use the already chosen locale.
         */
        isValueLocalized(value, locale = null) {
            locale = locale || this.getLocale();
            const locales = this.getLocales();

            return locales[locale] && locales[locale][value];
        },
        /**
         * Return the localized value for the given key. If there isn't any, it returns
         * the key. If the locale isn't specified, it will use the already chosen locale.
         */
        locale(value, defaultValue, locale = null) {
            locale = locale || this.getLocale();
            const locales = this.getLocales();

            if (this.isValueLocalized(value, locale)) return locales[locale][value];
            return defaultValue || value;
        }
    }
};
