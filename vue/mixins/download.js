export const downloadMixin = {
    methods: {
        /**
         * Downloads a file with a given filename.
         *
         * @param {Object} obj Object to be downloaded.
         * @param {String} filename Name to give the file.
         */
        download(obj, filename) {
            const anchor = document.createElement("a");
            const url = URL.createObjectURL(obj);
            anchor.href = url;
            anchor.download = filename;
            document.body.appendChild(anchor);
            anchor.click();
            setTimeout(function() {
                document.body.removeChild(anchor);
                window.URL.revokeObjectURL(url);
            });
        }
    }
};
