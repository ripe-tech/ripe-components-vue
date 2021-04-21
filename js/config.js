const features = { "*": true };
const listeners = [];

export const hasFeature = (name, fallback = false, source = null) => {
    source = source || features;
    fallback = source["*"] === undefined ? fallback : source["*"];
    return Boolean(source[name] === undefined ? fallback : source[name]);
};

export const setFeature = (name, value) => {
    features[name] = value;
    listeners.forEach(callable => callable(name, value));
};

export const setFeatures = _features => {
    Object.keys(features).forEach(k => delete features[k]);
    Object.entries(_features).forEach(([k, v]) => {
        features[k] = v;
    });
};

export const bindFeature = callable => {
    listeners.push(callable);
    return callable;
};

export const unbindFeature = callable => {
    listeners.splice(listeners.indexOf(callable), 1);
    return callable;
};
