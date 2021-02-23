const OP_REGEX = /(?:(?:<=)|(?:<)|(?:>=)|(?:>)|(?:=))/;

const OP_ALIAS = {
    ">": "gt",
    ">=": "gte",
    "<": "lt",
    "<=": "lte"
};

const KEYWORDS = {
    "@today": (field, op) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        return _buildKeywordQuery(field, op, today, tomorrow);
    },
    "@yesterday": (field, op) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        return _buildKeywordQuery(field, op, yesterday, today);
    },
    "@tomorrow": (field, op) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const tomorrow = new Date(today.setDate(today.getDate() + 1));
        const afterTomorrow = new Date(today.setDate(today.getDate() + 1));

        return _buildKeywordQuery(field, op, tomorrow, afterTomorrow);
    },
    "@this-week": (field, op) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const week = new Date(today.setDate(today.getDate() - today.getDay()));
        const nextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));

        return _buildKeywordQuery(field, op, week, nextWeek);
    },
    "@next-week": (field, op) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const nextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
        const nextNextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));

        return _buildKeywordQuery(field, op, nextWeek, nextNextWeek);
    },
    "@this-month": (field, op) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const month = today.getMonth();
        const startOfMonth = new Date(today.setDate(1));
        const nextMonth = new Date(new Date(today.setMonth(month + 1)).setDate(1));

        return _buildKeywordQuery(field, op, startOfMonth, nextMonth);
    },
    "@next-month": (field, op) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const month = today.getMonth();
        const nextMonth = new Date(new Date(today.setMonth(month + 1)).setDate(1));
        const nextNextMonth = new Date(new Date(today.setMonth(month + 2)).setDate(1));

        return _buildKeywordQuery(field, op, nextMonth, nextNextMonth);
    }
};

export const filterToParams = (
    options = {},
    nameAlias = {},
    nameFunc = {},
    filterFields = {},
    keywordFieldValues = []
) => {
    let operator = "$or";
    const { sort, reverse, filter, start, limit } = options;
    const filterS = filter || "";

    const params = { number_records: limit, start_record: start };
    const direction = reverse ? "descending" : "ascending";
    const sortS = `${sort}:${direction}`;
    const filters = [];
    const isPerfect = filterS.match(OP_REGEX);
    if (isPerfect) {
        for (const part of filterS.split(" ")) {
            const result = part.match(OP_REGEX);
            if (!result) continue;
            let arithOp = result[0];
            let [key, value] = part.split(OP_REGEX, 2);
            key = key.replace(/-/g, "_");
            const field = nameAlias[key] || key;
            const fieldFunc = nameFunc[field];
            value = KEYWORDS[value] || !fieldFunc ? value : fieldFunc(value);
            arithOp = arithOp === "=" ? filterFields[field] : OP_ALIAS[arithOp];
            if (!field || !arithOp) continue;
            filters.push(..._buildFilter(field, arithOp, value, keywordFieldValues));
        }
        operator = "$and";
    } else {
        filters.push(
            ...Object.entries(filterFields)
                .flatMap(([field, operator]) => _buildFilter(field, operator, filterS, keywordFieldValues))
        );
    }
    if (sort) {
        params.sort = sortS;
    }
    if (filterS && filters.length > 0) {
        params["filters[]"] = filters;
        params.filter_operator = operator;
    }
    return params;
};

const _buildFilter = (field, arithOp, value, keywordFieldValues) => {
    // verifies if the value is a keyword, if not
    // returns the filter query with the given value
    const keywordF = KEYWORDS[value];
    if (!keywordF) return [`${field}:${arithOp}:${value}`];

    // replaces the keyword in the value with its
    // respective translation
    return KEYWORDS[value](field, arithOp);
};

const _buildKeywordQuery = (field, op, left, right) => {
    switch (op) {
        case "gt":
        case "gte":
            return [`${field}:${op}:${right.getTime() / 1000}`];
        case "lt":
        case "lte":
            return [`${field}:${op}:${left.getTime() / 1000}`];
        default:
            return [
                `${field}:gte:${left.getTime() / 1000}`,
                `${field}:lt:${right.getTime() / 1000}`
            ];
    }
};

export default filterToParams;
