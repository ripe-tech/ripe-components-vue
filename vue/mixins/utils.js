import { normalize, buildslug } from "../../js";

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
        normalize(value) {
            return normalize(value);
        },
        buildslug(value) {
            return buildslug(value);
        }
    }
};
