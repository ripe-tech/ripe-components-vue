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
        /**
         * Scrolls to the right element for a container,
         * given the index of the element to scroll to.
         * @param {*} container The parent container;
         * @param {*} elements List of elements to iterate over;
         * @param {*} index The index of the target element;
         */
        scrollToIndex(container, elements, index) {
            const visibleStart = container.scrollTop;
            const visibleEnd = visibleStart + container.clientHeight;

            let indexStart = 0;
            for (let i = 0; i < index; i++) {
                indexStart += elements[i].offsetHeight;
            }

            const indexHeight = elements[index].offsetHeight;
            const indexEnd = indexStart + indexHeight;

            if (indexStart < visibleStart) {
                container.scrollTop = indexStart;
            } else if (indexEnd > visibleEnd) {
                container.scrollTop = indexEnd - container.clientHeight;
            }
        }
    }
};
