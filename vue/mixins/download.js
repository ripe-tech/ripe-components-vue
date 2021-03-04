export const downloadMixin = {
    methods: {
        /**
         * Downloads a file with a given filename using the provided
         * Blob object as the basis for the creation of it.
         *
         * @param {Object} blob The Blob object that is going to be used
         * as the basis for the URL generation in the download.
         * @param {String} filename The name to be give to the file that
         * is going to be downloaded.
         */
        download(blob, filename) {
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
