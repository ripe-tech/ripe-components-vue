export const localeMixin = {
    methods: {
        /**
         * Set currently chosen locale. Example: "en_us".
         */
        setLocale(locale) {
            this.$store.commit("SET_LOCALE", locale);
        },
        /**
         * Set locales information. Example:
         * { en_us: { "ripe_twitch.value_a.value_b": "Value Example" } }.
         */
        setLocales(locales = {}) {
            this.$store.commit("SET_LOCALES", locales);
        },
        /**
         * Append new locales information. If the locale isn't specified,
         * it will use the already chosen locale. Example:
         * locales: { "ripe_twitch.value_a.value_b": "Value Example" }
         * locale: "en_us".
         */
        addLocales(locales = {}, locale = null) {
            const _locale = locale || this.$store.state.localePlugin.locale;

            const localeObj = this.$store.state.localePlugin.locales[_locale] || {};
            const updatedLocaleObj = { ...localeObj, ...locales };
            this.setLocales({
                ...this.$store.state.localePlugin.locales,
                ...{ [_locale]: updatedLocaleObj }
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
        setupLocalePlugin(store, localLocales, locale) {
            const _localLocales = localLocales || {};
            const _locale = locale || Object.keys(localLocales)[0];

            // Setup localePlugin store
            store.registerModule("localePlugin", {
                state: {
                    locale: false,
                    locales: {}
                },
                mutations: {
                    SET_LOCALE(state, value) {
                        state.locale = value;
                    },
                    SET_LOCALES(state, value) {
                        state.locales = value;
                    }
                }
            });
            store.commit("SET_LOCALE", _locale);
            store.commit("SET_LOCALES", _localLocales);
        },
        destroyLocalePlugin() {
            this.$store.unregisterModule("localePlugin");
        },
        /**
         * Checks if a value is localized in the provided locale. If the locale
         * isn't specified, it will use the already chosen locale.
         */
        isValueLocalized(value, locale = null) {
            const _locale = locale || this.$store.state.localePlugin.locale;
            const locales = this.$store.state.localePlugin.locales;
            return locales[_locale] && locales[_locale][value];
        },
        /**
         * Return the localized value for the given key. If there isn't any, it returns
         * the key. If the locale isn't specified, it will use the already chosen locale.
         */
        locale(value, defaultValue, locale = null) {
            const _locale = locale || this.$store.state.localePlugin.locale;
            const locales = this.$store.state.localePlugin.locales;
            return this.isValueLocalized(value, _locale) ? locales[_locale][value] : value;
        }
    }
};
