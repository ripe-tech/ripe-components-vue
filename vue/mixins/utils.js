import { normalize } from "../../js";

export const utilsMixin = {
    methods: {
        dateString(timestamp, separator = "/") {
            const date = new Date(timestamp * 1000);
            const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
            let month = date.getMonth() + 1;
            month = month < 10 ? `0${month}` : month;
            return day + separator + month + separator + date.getFullYear();
        },
        dateStringUTC(timestamp, separator = "/") {
            const date = new Date(timestamp * 1000);
            const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();
            let month = date.getUTCMonth() + 1;
            month = month < 10 ? `0${month}` : month;
            return day + separator + month + separator + date.getUTCFullYear();
        },
        timeString(timestamp, separator = ":") {
            const date = new Date(timestamp * 1000);
            const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
            const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
            return hours + separator + minutes + separator + seconds;
        },
        timeStringUTC(timestamp, separator = ":") {
            const date = new Date(timestamp * 1000);
            const hours = date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours();
            const minutes =
                date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes();
            const seconds =
                date.getUTCSeconds() < 10 ? `0${date.getUTCSeconds()}` : date.getUTCSeconds();
            return hours + separator + minutes + separator + seconds;
        },
        /**
         * Generates a string that describes the time elapsed since the
         * provided time until the current time.
         *
         * @param {Number} timestamp The timestamp to be used in the in the
         * generation of the distance time string.
         * @returns {String} A descriptive time string to be used to describe
         * the time that has past.
         */
        timeSince(timestamp) {
            const timeElapsed = new Date() - timestamp;
            if (timeElapsed <= 60000) {
                return "Just now";
            } else if (timeElapsed <= 3600000) {
                return `${Math.floor(timeElapsed / 60000)}min ago`;
            } else if (timeElapsed <= 86400000) {
                return `${Math.floor(timeElapsed / 3600000)}h ago`;
            } else {
                const days = Math.floor(timeElapsed / 86400000);
                return days < 2 ? "Yesterday" : `${days} days ago`;
            }
        },
        normalize(value) {
            return normalize(value);
        }
    }
};
