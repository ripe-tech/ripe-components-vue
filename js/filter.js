const OP_REGEX = /(?:(?:<=)|(?:<)|(?:>=)|(?:>)|(?:=))/;
const KEYWORD_REGEX = /(?:[\w]*(?:(?:<=)|(?:<)|(?:>=)|(?:>)|(?:=))@[\w]*)/g;

const OP_ALIAS = {
    ">": "gt",
    ">=": "gte",
    "<": "lt",
    "<=": "lte"
};

const KEYWORDS = {
    "@today": (field, op = "=") => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        return _buildKeywordQuery(field, op, today, tomorrow);
    },
    "@yesterday": (field, op = "=") => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        return _buildKeywordQuery(field, op, yesterday, today);
    },
    "@tomorrow": (field, op = "=") => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const tomorrow = new Date(today.setDate(today.getDate() + 1));
        const afterTomorrow = new Date(today.setDate(today.getDate() + 1));

        return _buildKeywordQuery(field, op, tomorrow, afterTomorrow);
    },
    "@this-week": (field, op = "=") => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const week = new Date(today.setDate(today.getDate() - today.getDay()));
        const nextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));

        return _buildKeywordQuery(field, op, week, nextWeek);
    },
    "@next-week": (field, op = "=") => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const nextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
        const nextNextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));

        return _buildKeywordQuery(field, op, nextWeek, nextNextWeek);
    },
    "@this-month": (field, op = "=") => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const month = today.getMonth();
        const startOfMonth = new Date(today.setDate(1));
        const nextMonth = new Date(new Date(today.setMonth(month + 1)).setDate(1));

        return _buildKeywordQuery(field, op, startOfMonth, nextMonth);
    },
    "@next-month": (field, op = "=") => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const month = today.getMonth();
        const nextMonth = new Date(new Date(today.setMonth(month + 1)).setDate(1));
        const nextNextMonth = new Date(new Date(today.setMonth(month + 2)).setDate(1));

        return _buildKeywordQuery(field, op, nextMonth, nextNextMonth);
    }
};

export const filterToParams = (options = {}, nameAlias = {}, nameFunc = {}, filterFields = {}) => {
    let operator = "$or";
    const { sort, reverse, filter, start, limit } = options;
    let filterS = filter || "";
    filterS = _filterKeywords(filterS);

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
            value = fieldFunc ? fieldFunc(value) : value;
            arithOp = arithOp === "=" ? filterFields[field] : OP_ALIAS[arithOp];
            if (!field || !arithOp) continue;
            filters.push(`${field}:${arithOp}:${value}`);
        }
        operator = "$and";
    } else {
        filters.push(
            ...Object.entries(filterFields).map(
                ([field, operator]) => `${field}:${operator}:${filterS}`
            )
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

const _filterKeywords = filter => {
    // searches the filter for queries that contain keywords,
    // if none exist, return the filter as is
    const keywords = filter.match(KEYWORD_REGEX);
    if (!keywords) return filter;

    // iterates over the keywords found and verifies
    // if the operator is correctly implement, replacing
    // the keyword with the respective translation
    for (const keyword of keywords) {
        const result = keyword.match(OP_REGEX);
        if (!result) continue;

        // replaces the keywords in the queries with their
        // respective translation
        const arithOp = result[0];
        const [field, value] = keyword.split(OP_REGEX, 2);
        if (!(value in KEYWORDS)) continue;
        filter = filter.replace(keyword, KEYWORDS[value](field, arithOp));
    }

    return filter;
};

const _buildKeywordQuery = (field, op, left, right) => {
    switch (op) {
        case ">":
        case ">=":
            return `${field}${op}${right.getTime()}`;
        case "<":
        case "<=":
            return `${field}${op}${left.getTime()}`;
        case "=":
            return `${field}>=${left.getTime()} and ${field}<${right.getTime()}`;
        default:
            break;
    }
};

export default filterToParams;
