const assert = require("assert");
const base = require("../../base");

const { localeMixin } = require("../../../mixins/locales");

describe("Locales Mixin", () => {
    const localeTestComponent = {
        mixins: [localeMixin],
        template: "<div />"
    };

    it("should setup the locale mixin store module correctly", () => {
        const component = base.getComponent("Tag", { props: { text: "tag" }, mixins: [localeMixin] });
        component.vm.setupLocalePlugin(component.vm.$store, {
            localLocales: {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            locale: "en_us",
            localeFallback: "en_us"
        });
        assert.deepStrictEqual(component.vm.$store.state, {
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
        const component = base.getComponent("Tag", { props: { text: "tag" }, mixins: [localeMixin] });
        component.vm.setupLocalePlugin(component.vm.$store, {
            localLocales: {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            locale: "en_us",
            localeFallback: "en_us"
        });
        assert.deepStrictEqual(component.vm.$store.state, {
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

        component.vm.destroyLocalePlugin();
        assert.deepStrictEqual(component.vm.$store.state, {});
    });

    it("should check if the value is localized", () => {
        const component = base.getComponent("Tag", { props: { text: "tag" }, mixins: [localeMixin] });
        component.vm.setupLocalePlugin(component.vm.$store, {
            localLocales: {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            locale: "en_us",
            localeFallback: "en_us"
        });
        assert.deepStrictEqual(component.vm.$store.state, {
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

        assert.strictEqual(component.vm.isValueLocalized("example.not.added"), false);
        assert.strictEqual(component.vm.isValueLocalized("example.key.button_example"), true);
        assert.strictEqual(
            component.vm.isValueLocalized("example.key.button_example", "en_us"),
            true
        );
        assert.strictEqual(
            component.vm.isValueLocalized("example.key.button_example", "pt_pt"),
            true
        );
        assert.strictEqual(
            component.vm.isValueLocalized("example.key.button_example", "en_gb"),
            false
        );
    });

    it("should get locale", () => {
        const component = base.getComponent("Tag", { props: { text: "tag" }, mixins: [localeMixin] });
        component.vm.setupLocalePlugin(component.vm.$store, {
            localLocales: {},
            locale: "en_us",
            localeFallback: "en_us"
        });
        assert.strictEqual(component.vm.$store.state.localePlugin.locale, "en_us");
        assert.strictEqual(component.vm.$store.state.localePlugin.localeFallback, "en_us");

        assert.strictEqual(component.vm.getLocale(), "en_us");
    });

    it("should get locale fallback when locale isn't set", () => {
        const component = base.getComponent("Tag", { props: { text: "tag" }, mixins: [localeMixin] });
        component.vm.setupLocalePlugin(component.vm.$store, {
            localLocales: {},
            locale: null,
            localeFallback: "pt_pt"
        });
        assert.strictEqual(component.vm.$store.state.localePlugin.locale, null);
        assert.strictEqual(component.vm.$store.state.localePlugin.localeFallback, "pt_pt");

        assert.strictEqual(component.vm.getLocale(), "pt_pt");
    });

    it("should set locale", () => {
        const component = base.getComponent("Tag", { props: { text: "tag" }, mixins: [localeMixin] });
        component.vm.setupLocalePlugin(component.vm.$store, {
            localLocales: {},
            locale: null,
            localeFallback: "pt_pt"
        });
        assert.strictEqual(component.vm.$store.state.localePlugin.locale, null);
        assert.strictEqual(component.vm.$store.state.localePlugin.localeFallback, "pt_pt");

        component.vm.setLocale("en_us");
        assert.strictEqual(component.vm.$store.state.localePlugin.locale, "en_us");
    });

    it("should get locale fallback", () => {
        const component = base.getComponent("Tag", { props: { text: "tag" }, mixins: [localeMixin] });
        component.vm.setupLocalePlugin(component.vm.$store, {
            localLocales: {},
            locale: "en_us",
            localeFallback: "pt_pt"
        });
        assert.strictEqual(component.vm.$store.state.localePlugin.locale, "en_us");
        assert.strictEqual(component.vm.$store.state.localePlugin.localeFallback, "pt_pt");

        assert.strictEqual(component.vm.getLocaleFallback(), "pt_pt");
    });

    it("should set locale fallback", () => {
        const component = base.getComponent("Tag", { props: { text: "tag" }, mixins: [localeMixin] });
        component.vm.setupLocalePlugin(component.vm.$store, {
            localLocales: {},
            locale: null,
            localeFallback: "pt_pt"
        });
        assert.strictEqual(component.vm.$store.state.localePlugin.locale, null);
        assert.strictEqual(component.vm.$store.state.localePlugin.localeFallback, "pt_pt");

        component.vm.setLocaleFallback("en_us");
        assert.strictEqual(component.vm.$store.state.localePlugin.localeFallback, "en_us");
    });

    it("should get locales", () => {
        const component = base.getComponent("Tag", { props: { text: "tag" }, mixins: [localeMixin] });
        component.vm.setupLocalePlugin(component.vm.$store, {
            localLocales: {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            locale: "en_us",
            localeFallback: "en_us"
        });
        assert.deepStrictEqual(component.vm.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: { "example.key.button_example": "Botão Example" }
        });

        assert.deepStrictEqual(component.vm.getLocales(), {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: { "example.key.button_example": "Botão Example" }
        });
    });

    it("should set locales", () => {
        const component = base.getComponent("Tag", { props: { text: "tag" }, mixins: [localeMixin] });
        component.vm.setupLocalePlugin(component.vm.$store, {
            localLocales: {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            locale: "en_us",
            localeFallback: "en_us"
        });
        assert.deepStrictEqual(component.vm.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: { "example.key.button_example": "Botão Example" }
        });

        component.vm.setLocales({
            en_gb: { "example.key.button_example": "Button Example" }
        });
        assert.deepStrictEqual(component.vm.$store.state.localePlugin.locales, {
            en_gb: { "example.key.button_example": "Button Example" }
        });
    });

    it("should add locales", () => {
        const component = base.getComponent("Tag", { props: { text: "tag" }, mixins: [localeMixin] });
        component.vm.setupLocalePlugin(component.vm.$store, {
            localLocales: {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            locale: "en_us",
            localeFallback: "en_us"
        });
        assert.deepStrictEqual(component.vm.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: { "example.key.button_example": "Botão Example" }
        });

        component.vm.addLocales({ "example.key.button_example": "Button Example en_gb" }, "en_gb");
        assert.deepStrictEqual(component.vm.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: { "example.key.button_example": "Botão Example" },
            en_gb: { "example.key.button_example": "Button Example en_gb" }
        });

        component.vm.addLocales({ "new.example.key": "New Key example" }, "en_us");
        assert.deepStrictEqual(component.vm.$store.state.localePlugin.locales, {
            en_us: {
                "example.key.button_example": "Button Example",
                "new.example.key": "New Key example"
            },
            pt_pt: { "example.key.button_example": "Botão Example" },
            en_gb: { "example.key.button_example": "Button Example en_gb" }
        });

        component.vm.addLocales({ "example.key.button_example": "Updated Key example" }, "en_us");
        assert.deepStrictEqual(component.vm.$store.state.localePlugin.locales, {
            en_us: {
                "example.key.button_example": "Updated Key example",
                "new.example.key": "New Key example"
            },
            pt_pt: { "example.key.button_example": "Botão Example" },
            en_gb: { "example.key.button_example": "Button Example en_gb" }
        });
    });

    it("should add locales to the chosen locale if locale argument isn't passed", () => {
        const component = base.getComponent("Tag", { props: { text: "tag" }, mixins: [localeMixin] });
        component.vm.setupLocalePlugin(component.vm.$store, {
            localLocales: {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            locale: "pt_pt",
            localeFallback: "en_us"
        });
        assert.deepStrictEqual(component.vm.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: { "example.key.button_example": "Botão Example" }
        });

        component.vm.addLocales({
            "example.key.button_example": "Button Example updated in pt_pt"
        });
        assert.deepStrictEqual(component.vm.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: { "example.key.button_example": "Button Example updated in pt_pt" }
        });

        component.vm.addLocales({ "new.example.key": "New Key example" });
        assert.deepStrictEqual(component.vm.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: {
                "example.key.button_example": "Button Example updated in pt_pt",
                "new.example.key": "New Key example"
            }
        });

        component.vm.addLocales({ "example.key.button_example": "Updated Key example" });
        assert.deepStrictEqual(component.vm.$store.state.localePlugin.locales, {
            en_us: { "example.key.button_example": "Button Example" },
            pt_pt: {
                "example.key.button_example": "Updated Key example",
                "new.example.key": "New Key example"
            }
        });
    });

    it("should localize a value", () => {
        const component = base.getComponent("Tag", { props: { text: "tag" }, mixins: [localeMixin] });
        component.vm.setupLocalePlugin(component.vm.$store, {
            localLocales: {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            locale: "en_us",
            localeFallback: "en_us"
        });
        assert.deepStrictEqual(component.vm.$store.state, {
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

        assert.strictEqual(component.vm.locale("example.key.button_example"), "Button Example");
        assert.strictEqual(component.vm.locale("no.key.example"), "no.key.example");

        component.vm.setLocale("pt_pt");
        assert.strictEqual(component.vm.locale("example.key.button_example"), "Botão Example");

        component.vm.setLocale(null);
        assert.strictEqual(component.vm.locale("example.key.button_example"), "Button Example");

        component.vm.setLocaleFallback(null);
        assert.strictEqual(
            component.vm.locale("example.key.button_example"),
            "example.key.button_example"
        );
    });

    it("should localize a value to a specific locale", () => {
        const component = base.getComponent("Tag", { props: { text: "tag" }, mixins: [localeMixin] });
        component.vm.setupLocalePlugin(component.vm.$store, {
            localLocales: {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            locale: "en_us",
            localeFallback: "en_us"
        });
        assert.deepStrictEqual(component.vm.$store.state, {
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

        assert.strictEqual(
            component.vm.locale("example.key.button_example", undefined, "en_us"),
            "Button Example"
        );
        assert.strictEqual(
            component.vm.locale("example.key.button_example", undefined, "pt_pt"),
            "Botão Example"
        );
        assert.strictEqual(
            component.vm.locale("example.key.button_example", undefined, "en_gb"),
            "example.key.button_example"
        );
        assert.strictEqual(
            component.vm.locale("example.key.button_example", undefined, null),
            "Button Example"
        );

        component.vm.setLocale(null);
        component.vm.setLocaleFallback(null);
        assert.strictEqual(
            component.vm.locale("example.key.button_example", undefined, "en_gb"),
            "example.key.button_example"
        );
        assert.strictEqual(
            component.vm.locale("example.key.button_example", undefined, null),
            "example.key.button_example"
        );
    });

    it("should return the default value when localizing a value that can't be localized", () => {
        const component = base.getComponent("Tag", { props: { text: "tag" }, mixins: [localeMixin] });
        component.vm.setupLocalePlugin(component.vm.$store, {
            localLocales: {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            locale: "en_us",
            localeFallback: "en_us"
        });
        assert.deepStrictEqual(component.vm.$store.state, {
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

        assert.strictEqual(
            component.vm.locale("example.key.button_example", "default value example", "en_us"),
            "Button Example"
        );
        assert.strictEqual(
            component.vm.locale("example.key.button_example", "default value example", "pt_pt"),
            "Botão Example"
        );
        assert.strictEqual(
            component.vm.locale("example.key.button_example", "default value example", "en_gb"),
            "default value example"
        );
        assert.strictEqual(
            component.vm.locale("example.key.button_example", "default value example", null),
            "Button Example"
        );

        component.vm.setLocale(null);
        component.vm.setLocaleFallback(null);
        assert.strictEqual(
            component.vm.locale("example.key.button_example", "default value example", "en_gb"),
            "default value example"
        );
        assert.strictEqual(
            component.vm.locale("example.key.button_example", "default value example", null),
            "default value example"
        );
    });
});
