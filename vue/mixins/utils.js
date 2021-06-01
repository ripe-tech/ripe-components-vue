import {
    dateString,
    dateStringUTC,
    timeString,
    timeStringUTC,
    normalize,
    buildSlug
} from "ripe-commons";

export const utilsMixin = {
    methods: {
        dateString(timestamp, separator, options) {
            return dateString(timestamp, separator, options);
        },
        dateStringUTC(timestamp, separator, options) {
            return dateStringUTC(timestamp, separator, options);
        },
        timeString(timestamp, separator, options) {
            return timeString(timestamp, separator, options);
        },
        timeStringUTC(timestamp, separator, options) {
            return timeStringUTC(timestamp, separator, options);
        },
        normalize(value) {
            return normalize(value);
        },
        buildSlug(value) {
            return buildSlug(value);
        }
    }
};
