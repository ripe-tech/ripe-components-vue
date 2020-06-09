export const serializeContext = context => {
    const result = {};
    for (const [key, value] of Object.entries(context)) {
        switch (typeof value) {
            case "boolean":
                result[key] = value ? "1" : "0";
                break;
            case "string":
                result[key] = value;
                break;
            default:
                result[key] = String(value);
                break;
        }
    }
    return result;
};
