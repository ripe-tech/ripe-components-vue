<template>
    <div class="locales-story">
        <div class="info">
            <div><b>Current Locale: </b>{{ getLocale() }}</div>
            <div><b>Chosen Locale: </b>{{ $store.state.localePlugin.locale }}</div>
            <div><b>Fallback Locale: </b>{{ getLocaleFallback() }}</div>
            <div><b>Test Value: </b>{{ locale("example.key.button_example") }}</div>
        </div>
        <div class="button-container">
            <button-color
                v-bind:text="'Change region to \u0022pt_pt\u0022'"
                v-on:click="setLocale('pt_pt')"
            />
            <button-color
                v-bind:text="'Change region to \u0022en_us\u0022'"
                v-on:click="setLocale('en_us')"
            />
            <button-color
                v-bind:text="'Change region to \u0022null\u0022'"
                v-on:click="setLocale(null)"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.locales-story > .info {
    font-size: 18px;
    margin: 10px 10px 10px 10px;
}

.locales-story > .button-container {
    margin: 10px 10px 10px 10px;
}

.locales-story > .button-container > .button-color {
    width: 250px;
}
</style>

<script>
import { localeMixin } from "../locales";

export const LocalesStory = {
    name: "locales-story",
    mixins: [localeMixin]
};

export default LocalesStory;
</script>
