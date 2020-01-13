const OP_REGEX = /(?:(?:<=)|(?:<)|(?:>=)|(?:>)|(?:=))/;

const OP_ALIAS = {
    ">": "gt",
    ">=": "gte",
    "<": "lt",
    "<=": "lte"
};

const filterMixin = {
    methods: {
<<<<<<< HEAD
        getFilterParams({ options = {}, nameAlias = {}, nameFunc = {}, filterFields = {} } = {}) {
=======
        getFilterParams({
            options = {},
            nameAlias = {},
            nameFunc = {},
            filterFields = {},
            filterFieldsExt = {}
        } = {}) {
            const allFilterFields = Object.assign({}, filterFields, filterFieldsExt);
>>>>>>> parent of d2cc221... Merge branch 'master' into ns/table_row_click_events
            let operator = "$or";
            const { sort, reverse, filter, start, limit } = options;
            const filterS = filter || "";
            const params = { number_records: limit, start_record: start };
            const direction = reverse ? "ascending" : "descending";
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
                    arithOp = arithOp === "=" ? allFilterFields[field] : OP_ALIAS[arithOp];
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
        }
    }
};

export { filterMixin };
