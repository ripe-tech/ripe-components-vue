/**
 * Normalizes the provided string value replacing irregular
 * values with simple ones.
 *
 * @param {String} value The value to be normalized.
 * @returns {String} The final normalized values.
 */
export const normalize = value => {
    return value.split("_").join(" ");
};

/**
 * Creates a slug like representation of the provided value
 * converting for instance "hello World" to "hello-world".
 *
 * @param {String} value The value that is going to be "slugified".
 * @returns {String} The "slugified" version of the provided value.
 */
export const buildSlug = value => {
    return value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
};
