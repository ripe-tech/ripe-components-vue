import { hasFeature, setFeature, setFeatures, bindFeature, unbindFeature } from "ripe-commons";

export const configMixin = {
    methods: {
        hasFeature(name, fallback, source) {
            return hasFeature(name, fallback, source);
        },
        setFeature(name, value) {
            return setFeature(name, value);
        },
        setFeatures(features) {
            return setFeatures(features);
        },
        bindFeature(callable) {
            return bindFeature(callable);
        },
        unbindFeature(callable) {
            return unbindFeature(callable);
        }
    }
};
