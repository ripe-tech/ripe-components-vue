export const normalize = value => {
    return value.split("_").join(" ");
};

export const buildslug = value => {
    return value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // replace spaces with -
        .replace(/[^\w\-]+/g, "") // remove all non-word chars
        .replace(/\-\-+/g, "-"); // replace multiple - with a single -
};
