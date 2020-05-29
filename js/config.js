const features = { "*": true };
const listeners = [];

export const hasFeature = name =>
    Boolean(features[name] === undefined ? features["*"] : features[name]);

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
