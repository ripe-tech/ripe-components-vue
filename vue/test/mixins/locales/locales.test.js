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
        assert.strictEqual(
            this.testComponent.isValueLocalized("example.key.button_example", "en_us"),
            true
        );
        assert.strictEqual(
            this.testComponent.isValueLocalized("example.key.button_example", "pt_pt"),
            true
        );
        assert.strictEqual(
            this.testComponent.isValueLocalized("example.key.button_example", "en_gb"),
            false
        );
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

    it("should get locale fallback", () => {
        this.testComponent.setupLocalePlugin(this.testComponent.$store, {}, "en_us", "pt_pt");
        assert.strictEqual(this.testComponent.$store.state.localePlugin.locale, "en_us");
        assert.strictEqual(this.testComponent.$store.state.localePlugin.localeFallback, "pt_pt");

        assert.strictEqual(this.testComponent.getLocaleFallback(), "pt_pt");
    });

    it("should set locale fallback", () => {
        this.testComponent.setupLocalePlugin(this.testComponent.$store, {}, null, "pt_pt");
        assert.strictEqual(this.testComponent.$store.state.localePlugin.locale, null);
        assert.strictEqual(this.testComponent.$store.state.localePlugin.localeFallback, "pt_pt");

        this.testComponent.setLocaleFallback("en_us");
        assert.strictEqual(this.testComponent.$store.state.localePlugin.localeFallback, "en_us");
    });

    it("should get locales", () => {
        this.testComponent.setupLocalePlugin(
            this.testComponent.$store,
            {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            "en_us",
            "en_us"
        );
        assert.deepStrictEqual(this.testComponent.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: { "example.key.button_example": "Botão Example" }
        });

        assert.deepStrictEqual(this.testComponent.getLocales(), {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: { "example.key.button_example": "Botão Example" }
        });
    });

    it("should set locales", () => {
        this.testComponent.setupLocalePlugin(
            this.testComponent.$store,
            {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            "en_us",
            "en_us"
        );
        assert.deepStrictEqual(this.testComponent.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: { "example.key.button_example": "Botão Example" }
        });

        this.testComponent.setLocales({
            en_gb: { "example.key.button_example": "Button Example" }
        });
        assert.deepStrictEqual(this.testComponent.$store.state.localePlugin.locales, {
            en_gb: { "example.key.button_example": "Button Example" }
        });
    });

    it("should add locales", () => {
        this.testComponent.setupLocalePlugin(
            this.testComponent.$store,
            {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            "en_us",
            "en_us"
        );
        assert.deepStrictEqual(this.testComponent.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: { "example.key.button_example": "Botão Example" }
        });

        this.testComponent.addLocales(
            { "example.key.button_example": "Button Example en_gb" },
            "en_gb"
        );
        assert.deepStrictEqual(this.testComponent.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: { "example.key.button_example": "Botão Example" },
            en_gb: { "example.key.button_example": "Button Example en_gb" }
        });

        this.testComponent.addLocales({ "new.example.key": "New Key example" }, "en_us");
        assert.deepStrictEqual(this.testComponent.$store.state.localePlugin.locales, {
            en_us: {
                "example.key.button_example": "Button Example",
                "new.example.key": "New Key example"
            },
            pt_pt: { "example.key.button_example": "Botão Example" },
            en_gb: { "example.key.button_example": "Button Example en_gb" }
        });

        this.testComponent.addLocales(
            { "example.key.button_example": "Updated Key example" },
            "en_us"
        );
        assert.deepStrictEqual(this.testComponent.$store.state.localePlugin.locales, {
            en_us: {
                "example.key.button_example": "Updated Key example",
                "new.example.key": "New Key example"
            },
            pt_pt: { "example.key.button_example": "Botão Example" },
            en_gb: { "example.key.button_example": "Button Example en_gb" }
        });
    });

    it("should add locales to the chosen locale if locale argument isn't passed", () => {
        this.testComponent.setupLocalePlugin(
            this.testComponent.$store,
            {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            "pt_pt",
            "en_us"
        );
        assert.deepStrictEqual(this.testComponent.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: { "example.key.button_example": "Botão Example" }
        });

        this.testComponent.addLocales({
            "example.key.button_example": "Button Example updated in pt_pt"
        });
        assert.deepStrictEqual(this.testComponent.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: { "example.key.button_example": "Button Example updated in pt_pt" }
        });

        this.testComponent.addLocales({ "new.example.key": "New Key example" });
        assert.deepStrictEqual(this.testComponent.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: {
                "example.key.button_example": "Button Example updated in pt_pt",
                "new.example.key": "New Key example"
            }
        });

        this.testComponent.addLocales({ "example.key.button_example": "Updated Key example" });
        assert.deepStrictEqual(this.testComponent.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: {
                "example.key.button_example": "Updated Key example",
                "new.example.key": "New Key example"
            }
        });
    });

    it("should localize a value", () => {
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

        assert.strictEqual(this.testComponent.locale("example.key.button_example"), "Button Example");
        assert.strictEqual(this.testComponent.locale("no.key.example"), "no.key.example");

        this.testComponent.setLocale("pt_pt");
        assert.strictEqual(this.testComponent.locale("example.key.button_example"), "Botão Example");

        this.testComponent.setLocale(null);
        assert.strictEqual(this.testComponent.locale("example.key.button_example"), "Button Example");

        this.testComponent.setLocaleFallback(null);
        assert.strictEqual(this.testComponent.locale("example.key.button_example"), "example.key.button_example");
    });

    it("should localize a value to a specific locale", () => {
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

        assert.strictEqual(this.testComponent.locale("example.key.button_example", undefined, "en_us"), "Button Example");
        assert.strictEqual(this.testComponent.locale("example.key.button_example", undefined, "pt_pt"), "Botão Example");
        assert.strictEqual(this.testComponent.locale("example.key.button_example", undefined, "en_gb"), "example.key.button_example");
        assert.strictEqual(this.testComponent.locale("example.key.button_example", undefined, null), "Button Example");

        this.testComponent.setLocale(null);
        this.testComponent.setLocaleFallback(null);
        assert.strictEqual(this.testComponent.locale("example.key.button_example", undefined, "en_gb"), "example.key.button_example");
        assert.strictEqual(this.testComponent.locale("example.key.button_example", undefined, null), "example.key.button_example");
    });
});
