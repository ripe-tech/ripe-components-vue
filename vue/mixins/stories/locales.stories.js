import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";
import Vuex from "vuex";
import Vue from "vue";

import { localeMixin } from "../locales";

const localesStoryComponent = Vue.component("locales-story", {
    mixins: [localeMixin],
    props: {
        localeValue: {
            type: String,
            default: null
        },
        localeFallbackValue: {
            type: String,
            default: null
        }
    },
    watch: {
        localeValue(value) {
            this.setLocale(value);
        },
        localeFallbackValue(value) {
            this.setLocaleFallback(value);
        }
    },
    template: `
        <div class="locales-story">
            <div class="info">
                <div><b>Current Locale: </b>{{ getLocale() }}</div>
                <div><b>Chosen Locale: </b>{{ $store.state.localePlugin.locale }}</div>
                <div><b>Fallback Locale: </b>{{ getLocaleFallback() }}</div>
                <div><b>Test Value: </b>{{ locale("example.key.button_example") }}</div>
            </div>
            <div class="button-container">
                <button v-on:click="setLocale('pt_pt')">Change region to \u0022pt_pt\u0022</button>
                <button v-on:click="setLocale('en_us')">Change region to \u0022en_us\u0022</button>
                <button v-on:click="setLocale(null)">Change region to \u0022null\u0022</button>
            </div>
        </div>
    `
});

storiesOf("Mixins/Locale Mixin", module)
    .addDecorator(withKnobs)
    .add("Locale Mixin", () => ({
        components: { "locales-story": localesStoryComponent },
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
                default: text("Locale", "en_us")
            },
            localeFallbackValue: {
                type: String,
                default: text("Locale Fallback", "en_us")
            }
        },
        created: function() {
            localeMixin.methods.setupLocalePlugin(this.$store, {
                localLocales: this.localLocales,
                locale: this.localeValue,
                localeFallback: this.localeFallbackValue
            });
        },
        template: `
            <locales-story
                v-bind:locale-value="localeValue"
                v-bind:locale-fallback-value="localeFallbackValue"
            />
        `
    }));
