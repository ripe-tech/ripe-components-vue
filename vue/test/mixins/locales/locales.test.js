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
        console.log(this.testComponent.$store.state);
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
});
