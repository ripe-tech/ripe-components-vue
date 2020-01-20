export const normalize = value => {
    return value.split("_").join(" ");
};

export default normalize;
