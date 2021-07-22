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
        normalize(value, options) {
            return normalize(value, options);
        },
        buildSlug(value) {
            return buildSlug(value);
        },
        scrollToIndexDropdown(dropdown, elements, index) {
            const visibleStart = dropdown.scrollTop;
            const visibleEnd = visibleStart + dropdown.clientHeight;

            let indexStart = 0;
            for (let i = 0; i < index; i++) {
                indexStart += elements[i].offsetHeight;
            }

            const indexHeight = elements[index].offsetHeight;
            const indexEnd = indexStart + indexHeight;

            if (indexStart < visibleStart) {
                dropdown.scrollTop = indexStart;
            } else if (indexEnd > visibleEnd) {
                dropdown.scrollTop = indexEnd - dropdown.clientHeight;
            }
        }
    }
};
