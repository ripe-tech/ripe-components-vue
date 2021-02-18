import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";
import Vuex from "vuex";

import { localeMixin } from "../locales";

storiesOf("Mixins/Locale Mixin", module)
    .addDecorator(withKnobs)
    .add("Locale Mixin", () => ({
        store: new Vuex.Store(),
        mixins: [localeMixin],
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
            <div>
                <div><b>Current Locale: </b>{{ getLocale() }}</div>
                <div><b>Chosen Locale: </b>{{ $store.state.localePlugin.locale }}</div>
                <div><b>Fallback Locale: </b>{{ getLocaleFallback() }}</div>
                <div><b>Test Value: </b>{{ locale("example.key.button_example") }}</div>
            </div>
        `
    }));
