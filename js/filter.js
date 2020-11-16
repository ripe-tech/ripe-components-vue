const OP_REGEX = /(?:(?:<=)|(?:<)|(?:>=)|(?:>)|(?:=))/;

const OP_ALIAS = {
    ">": "gt",
    ">=": "gte",
    "<": "lt",
    "<=": "lte"
};

const KEYWORDS = {
    "@today": field => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        return `${field}>=${today.getTime()} and ${field}<${tomorrow.getTime()}`;
    },
    "@tomorrow": field => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const tomorrow = new Date(today.setDate(today.getDate() + 1));
        const afterTomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1));
        
        return `${field}>=${tomorrow.getTime()} and ${field}<${afterTomorrow.getTime()}`;
    },
    "@this-week": field => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const week = new Date(today.setDate(today.getDate() - today.getDay()));
        const nextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));

        return `${field}>=${week.getTime()} and ${field}<${nextWeek.getTime()}`;
    },
    "@next-week": field => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const nextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
        const nextNextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));

        return `${field}>=${nextWeek.getTime()} and ${field}<${nextNextWeek.getTime()}`;
    },
    "@this-month": field => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const month = today.getMonth();
        const startOfMonth = new Date(today.setDate(1));
        const nextMonth = new Date(new Date(today.setMonth(month + 1)).setDate(1));

        return `${field}>=${startOfMonth.getTime()} and ${field}<${nextMonth.getTime()}`;
    },
    "@next-month": field => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const month = today.getMonth();
        const nextMonth = new Date(new Date(today.setMonth(month + 1)).setDate(1));
        const nextNextMonth = new Date(new Date(today.setMonth(month + 2)).setDate(1));

        return `${field}>=${nextMonth.getTime()} and ${field}<${nextNextMonth.getTime()}`;
    }
};

export const filterToParams = (options = {}, nameAlias = {}, nameFunc = {}, filterFields = {}) => {
    let operator = "$or";
    const { sort, reverse, filter, start, limit } = options;
    let filterS = filter || "";

    // searches the filter for queries that contain keywords
    const keywords = filterS
        .split(" ")
        .filter(value => Object.keys(KEYWORDS).some(key => value.includes(nameAlias[key] || key)));

    // replaces the queries with keywords for their respective
    // translation
    for (const keyword of keywords) {
        const result = keyword.match(OP_REGEX);
        if (!result) continue;
        const [field, value] = keyword.split(OP_REGEX, 2);
        if (!(value in KEYWORDS)) continue;
        filterS = filterS.replace(keyword, KEYWORDS[value](field));
    }

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
            key = key.replace(new RegExp("-", "g"), "_");
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

export default filterToParams;
