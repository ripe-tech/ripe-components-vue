import { buildCsv, parseCsv, parseCsvComplex, readCsv } from "ripe-commons";

export const csvMixin = {
    methods: {
        buildCsv(data, headers = []) {
            return buildCsv(data, headers);
        },
        parseCsv(dataS, object = false, sanitize = true, delimiter = ",") {
            return parseCsv(dataS, object, sanitize, delimiter);
        },
        parseCsvComplex(dataS, object = false, sanitize = true, delimiter = ",") {
            return parseCsvComplex(dataS, object, sanitize, delimiter);
        },
        readCsv(file, parser = null) {
            return readCsv(file, parser);
        }
    }
};
