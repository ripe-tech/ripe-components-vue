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
            const _locale = locale || this.$store.state.locale;

            const localeObj = this.$store.state.locales[_locale] || {};
            const updatedLocaleObj = { ...localeObj, ...locales };
            this.setLocales({
                ...this.$store.state.locales,
                ...{ [_locale]: updatedLocaleObj }
            });
        },
        /**
         * Load the local locales information located in the JSON files located
         * in the "locales" folder located in the project's root. If the locale
         * isn't specified, it will use the already chosen locale.
         */
        /*
        loadLocalLocales(locale = null) {
            const _locale = locale || this.$store.state.locale;

            let localLocalesJson = null;
            try {
                localLocalesJson = require(`../locales/${_locale}.json`);
            } catch (error) {
                localLocalesJson = {};
            }

            this.addLocales(localLocalesJson, _locale);
        },
        */
        /**
         * Should be called when first opening the extension. It gets and sets the
         * user's locale and loads that locale's local locales.
         */
        initLocales() {
            // Get locale from somewhere, fallback to "en_us"
            const locale = "en_us" || "en_us";

            this.setLocale(locale);
            // this.loadLocalLocales();
        },
        /**
         * Checks if a value is localized in the provided locale. If the locale
         * isn't specified, it will use the already chosen locale.
         */
        isValueLocalized(value, locale = null) {
            const _locale = locale || this.$store.state.locale;
            const locales = this.$store.state.locales;
            return locales[_locale] && locales[_locale][value];
        },
        /**
         * Return the localized value for the given key. If there isn't any, it returns
         * the key. If the locale isn't specified, it will use the already chosen locale.
         */
        locale(value, defaultValue, locale = null) {
            const _locale = locale || this.$store.state.locale;
            const locales = this.$store.state.locales;
            return this.isValueLocalized(value, _locale) ? locales[_locale][value] : value;
        }
    }
};
