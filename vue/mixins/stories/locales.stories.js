import { storiesOf } from "@storybook/vue";
import Vuex from "vuex";

import { localeMixin } from "../locales";

import { LocalesStory } from "./locales-story";

storiesOf("Mixins/Locale Mixin", module).add("Locale Mixin", () => ({
    components: { "locales-story": LocalesStory },
    store: new Vuex.Store(),
    props: {
        localLocales: {
            default: () => ({
                en_us: { "example.key.button_example": "Button Example" },
                pt_pt: { "example.key.button_example": "Botão Example" }
            })
        },
        localeValue: {
            type: String,
            default: "en_us"
        },
        localeFallbackValue: {
            type: String,
            default: "en_us"
        }
    },
    created: function() {
        localeMixin.methods.setupLocalePlugin(
            this.$store,
            this.localLocales,
            this.locale,
            this.localeFallback
        );
    },
    template: `
            <locales-story />
    `
}));
