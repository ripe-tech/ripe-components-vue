import { arrayListToCsv, arrayToCsv, objectListToCsv, objectToCsv, parseCsv, parseCsvFile } from "ripe-commons";

export const csvMixin = {
    methods: {
        arrayListToCsv(data, headers = [], delimiter = ",") {
            return arrayListToCsv(data, headers, delimiter);
        },
        arrayToCsv(data, delimiter = ",") {
            return arrayToCsv(data, delimiter);
        },
        objectListToCsv(data, headers = [], delimiter = ",") {
            return objectListToCsv(data, headers, delimiter);
        },
        objectToCsv(data, headers = [], delimiter = ",") {
            return objectToCsv(data, headers, delimiter);
        },
        parseCsv(dataS, object = false, sanitize = true, delimiter = ",") {
            return parseCsv(dataS, object, sanitize, delimiter);
        },
        parseCsvFile(file, parser = null) {
            return parseCsvFile(file, parser);
        }
    }
};
