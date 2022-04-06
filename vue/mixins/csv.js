import { objectToCsv, readCsv, buildCsv, parseCsv, parseCsvComplex } from "ripe-commons";

export const csvMixin = {
    methods: {
        objectToCsv(object) {
            return objectToCsv(object);
        },
        readCsv(file, parser = null) {
            return readCsv(file, parser);
        },
        buildCsv(data, headers = []) {
            return buildCsv(data, headers);
        },
        parseCsv(dataS, object = false, sanitize = true, delimiter = ",") {
            return parseCsv(dataS, object, sanitize, delimiter);
        },
        parseCsvComplex(dataS, object = false, sanitize = true, delimiter = ",") {
            return parseCsvComplex(dataS, object, sanitize, delimiter);
        }
    }
};
