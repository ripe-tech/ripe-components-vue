const assert = require("assert");
const Vue = require("vue").default;
const vuex = require("vuex");

const { localeMixin } = require("../../../mixins/locales");

describe("Locales Mixin", () => {
    Vue.use(vuex);
    this.testComponent = null;

    beforeEach(() => {
        this.testComponent = new Vue({
            mixins: [localeMixin],
            store: new vuex.Store(),
            // eslint-disable-next-line quotes
            template: `<div />`,
            title: "LocalesMixinTest"
        }).$mount();
    });

    afterEach(() => {
        this.testComponent = null;
    });

    it("should setup the locale mixin store module correctly", () => {
        assert.deepStrictEqual(this.testComponent.$store.state, {});

        this.testComponent.setupLocalePlugin(
            this.testComponent.$store,
            {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            "en_us",
            "en_us"
        );
        assert.deepStrictEqual(this.testComponent.$store.state, {
            localePlugin: {
                locale: "en_us",
                localeFallback: "en_us",
                locales: {
                    en_us: {
                        "example.key.button_example": "Button Example"
                    },
                    pt_pt: {
                        "example.key.button_example": "Botão Example"
                    }
                }
            }
        });
    });

    it("should remove localePlugin from the store", () => {
        this.testComponent.setupLocalePlugin(
            this.testComponent.$store,
            {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            "en_us",
            "en_us"
        );
        assert.deepStrictEqual(this.testComponent.$store.state, {
            localePlugin: {
                locale: "en_us",
                localeFallback: "en_us",
                locales: {
                    en_us: {
                        "example.key.button_example": "Button Example"
                    },
                    pt_pt: {
                        "example.key.button_example": "Botão Example"
                    }
                }
            }
        });

        this.testComponent.destroyLocalePlugin();
        assert.deepStrictEqual(this.testComponent.$store.state, {});
    });

    it("should check if the value is localized", () => {
        this.testComponent.setupLocalePlugin(
            this.testComponent.$store,
            {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            "en_us",
            "en_us"
        );
        assert.deepStrictEqual(this.testComponent.$store.state, {
            localePlugin: {
                locale: "en_us",
                localeFallback: "en_us",
                locales: {
                    en_us: {
                        "example.key.button_example": "Button Example"
                    },
                    pt_pt: {
                        "example.key.button_example": "Botão Example"
                    }
                }
            }
        });

        assert.strictEqual(this.testComponent.isValueLocalized("example.not.added"), false);
        assert.strictEqual(this.testComponent.isValueLocalized("example.key.button_example"), true);
        assert.strictEqual(this.testComponent.isValueLocalized("example.key.button_example", "en_us"), true);
        assert.strictEqual(this.testComponent.isValueLocalized("example.key.button_example", "pt_pt"), true);
        assert.strictEqual(this.testComponent.isValueLocalized("example.key.button_example", "en_gb"), false);
    });

    it("should get locale", () => {
        this.testComponent.setupLocalePlugin(this.testComponent.$store, {}, "en_us", "en_us");
        assert.strictEqual(this.testComponent.$store.state.localePlugin.locale, "en_us");
        assert.strictEqual(this.testComponent.$store.state.localePlugin.localeFallback, "en_us");

        assert.strictEqual(this.testComponent.getLocale(), "en_us");
    });

    it("should get locale fallback when locale isn't set", () => {
        this.testComponent.setupLocalePlugin(this.testComponent.$store, {}, null, "pt_pt");
        assert.strictEqual(this.testComponent.$store.state.localePlugin.locale, null);
        assert.strictEqual(this.testComponent.$store.state.localePlugin.localeFallback, "pt_pt");

        assert.strictEqual(this.testComponent.getLocale(), "pt_pt");
    });

    it("should set locale", () => {
        this.testComponent.setupLocalePlugin(this.testComponent.$store, {}, null, "pt_pt");
        assert.strictEqual(this.testComponent.$store.state.localePlugin.locale, null);
        assert.strictEqual(this.testComponent.$store.state.localePlugin.localeFallback, "pt_pt");

        this.testComponent.setLocale("en_us");
        assert.strictEqual(this.testComponent.$store.state.localePlugin.locale, "en_us");
    });
});
