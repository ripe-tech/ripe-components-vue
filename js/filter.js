const OP_REGEX = /(?:(?:<=)|(?:<)|(?:>=)|(?:>)|(?:=))/;

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

        if (op === ">" || op === ">=") return `${field}${op}${tomorrow.getTime()}`;
        else if (op === "<" || op === "<=") return `${field}${op}${today.getTime()}`;
        return `${field}>=${today.getTime()} and ${field}<${tomorrow.getTime()}`;
    },
    "@yesterday": (field, op = "=") => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const todayTime = today.getTime();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        if (op === ">" || op === ">=") return `${field}${op}${todayTime}`;
        else if (op === "<" || op === "<=") return `${field}${op}${yesterday.getTime()}`;
        return `${field}>=${yesterday.getTime()} and ${field}<${todayTime}`;
    },
    "@tomorrow": (field, op = "=") => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const tomorrow = new Date(today.setDate(today.getDate() + 1));
        const afterTomorrow = new Date(today.setDate(today.getDate() + 1));

        if (op === ">" || op === ">=") return `${field}${op}${afterTomorrow.getTime()}`;
        else if (op === "<" || op === "<=") return `${field}${op}${tomorrow.getTime()}`;
        return `${field}>=${tomorrow.getTime()} and ${field}<${afterTomorrow.getTime()}`;
    },
    "@this-week": (field, op = "=") => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const week = new Date(today.setDate(today.getDate() - today.getDay()));
        const nextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));

        if (op === ">" || op === ">=") return `${field}${op}${nextWeek.getTime()}`;
        else if (op === "<" || op === "<=") return `${field}${op}${week.getTime()}`;
        return `${field}>=${week.getTime()} and ${field}<${nextWeek.getTime()}`;
    },
    "@next-week": (field, op = "=") => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const nextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
        const nextNextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));

        if (op === ">" || op === ">=") return `${field}${op}${nextNextWeek.getTime()}`;
        else if (op === "<" || op === "<=") return `${field}${op}${nextWeek.getTime()}`;
        return `${field}>=${nextWeek.getTime()} and ${field}<${nextNextWeek.getTime()}`;
    },
    "@this-month": (field, op = "=") => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const month = today.getMonth();
        const startOfMonth = new Date(today.setDate(1));
        const nextMonth = new Date(new Date(today.setMonth(month + 1)).setDate(1));

        if (op === ">" || op === ">=") return `${field}${op}${nextMonth.getTime()}`;
        else if (op === "<" || op === "<=") return `${field}${op}${startOfMonth.getTime()}`;
        return `${field}>=${startOfMonth.getTime()} and ${field}<${nextMonth.getTime()}`;
    },
    "@next-month": (field, op = "=") => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const month = today.getMonth();
        const nextMonth = new Date(new Date(today.setMonth(month + 1)).setDate(1));
        const nextNextMonth = new Date(new Date(today.setMonth(month + 2)).setDate(1));

        if (op === ">" || op === ">=") return `${field}${op}${nextNextMonth.getTime()}`;
        else if (op === "<" || op === "<=") return `${field}${op}${nextMonth.getTime()}`;
        return `${field}>=${nextMonth.getTime()} and ${field}<${nextNextMonth.getTime()}`;
    }
};

export const filterToParams = (
    options = {},
    nameAlias = {},
    nameFunc = {},
    filterFields = {},
    keywordFields = []
) => {
    let operator = "$or";
    const { sort, reverse, filter, start, limit } = options;
    let filterS = filter || "";
    filterS = _filterKeywords(filterS, nameAlias, keywordFields);

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

const _filterKeywords = (filter, nameAlias = {}, keywordFields = []) => {
    // searches the filter for queries that contain keywords
    const keywords = filter
        .split(" ")
        .filter(value => Object.keys(KEYWORDS).some(key => value.includes(nameAlias[key] || key)));

    // replaces the keywords in the queries with their respective translation,
    // a keyword with no key will be replaced with the fields provided in
    // the `keywordFields` argument
    for (const keyword of keywords) {
        const arithOp = keyword.match(OP_REGEX);
        if (!arithOp) return;

        // replaces the key and keyword with the translation
        // of the keyword
        const [field, value] = keyword.split(OP_REGEX, 2);
        if (!(value in KEYWORDS)) continue;
        filter = filter.replace(keyword, KEYWORDS[value](field, arithOp));
    }

    return filter;
};

export default filterToParams;
