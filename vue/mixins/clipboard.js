export const clipboardMixin = {
    methods: {
        toClipboard(text, notify = true) {
            const element = document.createElement("textarea");
            element.value = text;
            document.body.appendChild(element);
            element.select();
            document.execCommand("copy");
            document.body.removeChild(element);

            if (notify && this.notify) {
                this.notify("Copied to clipboard", { timeout: 3000 });
            }
        }
    }
};
