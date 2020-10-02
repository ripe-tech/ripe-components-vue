export const normalize = value => {
    return value.split("_").join(" ");
};

export const buildslug = value => {
    return value
        .toLowerCase()
        .normalize("NFD")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
};
