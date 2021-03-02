import { normalize, buildSlug } from "../../js";

export const utilsMixin = {
    methods: {
        dateString(timestamp, separator = "/", { year = true, month = true, day = true } = {}) {
            const buffer = [];
            const date = new Date(timestamp * 1000);
            const dayV = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
            let monthV = date.getMonth() + 1;
            monthV = monthV < 10 ? `0${monthV}` : monthV;
            const yearV = date.getFullYear();
            if (day) buffer.push(dayV);
            if (month) buffer.push(monthV);
            if (year) buffer.push(yearV);
            return buffer.join(separator);
        },
        dateStringUTC(timestamp, separator = "/", { year = true, month = true, day = true } = {}) {
            const buffer = [];
            const date = new Date(timestamp * 1000);
            const dayV = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();
            let monthV = date.getUTCMonth() + 1;
            monthV = monthV < 10 ? `0${monthV}` : monthV;
            const yearV = date.getUTCFullYear();
            if (day) buffer.push(dayV);
            if (month) buffer.push(monthV);
            if (year) buffer.push(yearV);
            return buffer.join(separator);
        },
        timeString(
            timestamp,
            separator = ":",
            { hours = true, minutes = true, seconds = true } = {}
        ) {
            const buffer = [];
            const date = new Date(timestamp * 1000);
            const hoursV = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            const minutesV = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
            const secondsV = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
            if (hours) buffer.push(hoursV);
            if (minutes) buffer.push(minutesV);
            if (seconds) buffer.push(secondsV);
            return buffer.join(separator);
        },
        timeStringUTC(
            timestamp,
            separator = ":",
            { hours = true, minutes = true, seconds = true } = {}
        ) {
            const buffer = [];
            const date = new Date(timestamp * 1000);
            const hoursV = date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours();
            const minutesV =
                date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes();
            const secondsV =
                date.getUTCSeconds() < 10 ? `0${date.getUTCSeconds()}` : date.getUTCSeconds();
            if (hours) buffer.push(hoursV);
            if (minutes) buffer.push(minutesV);
            if (seconds) buffer.push(secondsV);
            return buffer.join(separator);
        },
        normalize(value) {
            return normalize(value);
        },
        buildSlug(value) {
            return buildSlug(value);
        }
    }
};
