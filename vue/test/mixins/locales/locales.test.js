const assert = require("assert");
const Vue = require("vue").default;
const vuex = require("vuex");

const { localeMixin } = require("../../../mixins/locales");

describe("Locales Mixin", () => {
    Vue.use(vuex);
    this.$store = new vuex.Store();

    it("should setup the locale mixin store module correctly", () => {
        assert.deepStrictEqual(this.$store.state, {});

        localeMixin.methods.setupLocalePlugin(
            this.$store,
            {
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            },
            "en_us",
            "en_us"
        );
        assert.deepStrictEqual(this.$store.state, {
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
});
