export const normalize = value => {
    return value.split("_").join(" ");
};

export const buildSlug = value => {
    return (
        value
            .toLowerCase()
            .trim()
            // replace spaces with -
            .replace(/\s+/g, "-")
            // remove all non-word chars
            .replace(/[^\w\-]+/g, "")
            // replace multiple - with a single -
            .replace(/\-\-+/g, "-")
    );
};
