const OP_REGEX = /(?:(?:<=)|(?:<)|(?:>=)|(?:>)|(?:=))/;

const OP_ALIAS = {
    ">": "gt",
    ">=": "gte",
    "<": "lt",
    "<=": "lte"
};

const KEYWORDS = {
    "@today": (field, operator) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return _buildKeywordQuery(field, operator, today, tomorrow);
    },
    "@yesterday": (field, operator) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return _buildKeywordQuery(field, operator, yesterday, today);
    },
    "@tomorrow": (field, operator) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const tomorrow = new Date(today.setDate(today.getDate() + 1));
        const afterTomorrow = new Date(today.setDate(today.getDate() + 1));
        return _buildKeywordQuery(field, operator, tomorrow, afterTomorrow);
    },
    "@this-week": (field, operator) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const week = new Date(today.setDate(today.getDate() - today.getDay()));
        const nextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
        return _buildKeywordQuery(field, operator, week, nextWeek);
    },
    "@next-week": (field, operator) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const nextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
        const nextNextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
        return _buildKeywordQuery(field, operator, nextWeek, nextNextWeek);
    },
    "@this-month": (field, operator) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const month = today.getMonth();
        const startOfMonth = new Date(today.setDate(1));
        const nextMonth = new Date(new Date(today.setMonth(month + 1)).setDate(1));
        return _buildKeywordQuery(field, operator, startOfMonth, nextMonth);
    },
    "@next-month": (field, operator) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const month = today.getMonth();
        const nextMonth = new Date(new Date(today.setMonth(month + 1)).setDate(1));
        const nextNextMonth = new Date(new Date(today.setMonth(month + 2)).setDate(1));
        return _buildKeywordQuery(field, operator, nextMonth, nextNextMonth);
    }
};

export const filterToParams = (
    options = {},
    nameAlias = {},
    nameFunc = {},
    filterFields = {},
    keywordFields = {}
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
            filters.push(..._buildFilter(field, arithOp, value, keywordFields));
        }
        operator = "$and";
    } else {
        filters.push(
            ...Object.entries(filterFields).flatMap(([field, operator]) =>
                _buildFilter(field, operator, filterS, keywordFields)
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

/**
 * Builds the individual filter value (or set of filters) for the
 * provided values taking into account the provided arithmetic/logic
 * operator, the value and possible keyword values.
 *
 * This function supports the "expansion" of a keyword value into
 * multiple filter statements.
 *
 * @param {String} field The name of the field from which the filter
 * or set of filters is going to be built.
 * @param {String} arithOp The arithmetic operator (as a string) to be used
 * for a base comparison.
 * @param {String} value The target value of the comparison operation.
 * @param {Object} keywordFields An object that associated a certain field name
 * with the set of keywords that are "allowed".
 * @returns {Array} The sequence of filters (in canonical format) to be used
 * in the construction of a "normalized" query.
 */
const _buildFilter = (field, arithOp, value, keywordFields) => {
    // verifies if the value is a keyword, if not
    // returns the filter query with the given value
    const keywordF = KEYWORDS[value];
    if (!keywordF) return [`${field}:${arithOp}:${value}`];

    // verifies if the field given allows the usage of the
    // current keyword, forbidding invalid usage of keyword
    // with fields that do not support it
    const keywords = keywordFields[field];
    if (!keywords || !keywords.includes(value)) return [];

    // replaces the keyword in the value with its
    // respective translation
    return KEYWORDS[value](field, arithOp);
};

const _buildKeywordQuery = (field, operator, left, right) => {
    switch (operator) {
        case "gt":
        case "gte":
            return [`${field}:${operator}:${right.getTime() / 1000}`];
        case "lt":
        case "lte":
            return [`${field}:${operator}:${left.getTime() / 1000}`];
        default:
            return [
                `${field}:gte:${left.getTime() / 1000}`,
                `${field}:lt:${right.getTime() / 1000}`
            ];
    }
};

export default filterToParams;
