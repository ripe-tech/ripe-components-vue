export const urlMixin = {
    methods: {
        openNewTab(url) {
            const anchor = Object.assign(document.createElement("a"), {
                target: "_blank",
                href: url
            });
            anchor.click();
        }
    }
};
