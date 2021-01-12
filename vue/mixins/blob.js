export const blobMixin = {
    methods: {
        /**
         * Downloads a blob file with a given filename
         *
         * @param {Object} blob File to be downloaded
         * @param {String} filename Name to give the file
         */
        downloadBlob(blob, filename) {
            const anchor = document.createElement("a");
            const url = URL.createObjectURL(blob);
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
