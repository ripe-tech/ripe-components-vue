export const uploadMixin = {
    props: {
        files: {
            type: Array,
            default: () => []
        },
        disabled: {
            type: Boolean,
            default: false
        },
        draggable: {
            type: Boolean,
            default: true
        },
        multiple: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            dragging: false,
            draggingDisabled: false,
            filesData: this.files,
            fileInputRef: null
        };
    },
    methods: {
        initUploadArea(filesInputRef) {
            this.fileInputRef = filesInputRef;
        },
        setFiles(filesList) {
            if (!this.multiple) {
                this.filesData = [filesList[0]];
            } else {
                this.filesData = [...filesList];
            }
            this.$emit("update:files", this.filesData);
        },
        clear() {
            this.fileInputRef.value = null;
        },
        openModal() {
            this.fileInputRef.click();
        },
        onDragOver(event) {
            if (this.disabled || !this.draggable) return;
            event.dataTransfer.dropEffect = "copy";
        },
        onDrop(event) {
            if (this.disabled || !this.draggable) return;
            this.setFiles(event.dataTransfer.files);
            this.dragging = false;
        },
        onDragEnter(event) {
            if (this.disabled || !this.draggable) {
                this.draggingDisabled = true;
                return;
            }
            this.dragging = true;
        },
        onDragLeave(event) {
            if (event.currentTarget.contains(event.relatedTarget)) return false;
            if (this.disabled || !this.draggable) this.draggingDisabled = false;
            this.dragging = false;
        },
        onFilesInputChange() {
            this.setFiles(this.fileInputRef.files);
        },
        onUploadButtonClick() {
            this.fileInputRef.click();
        }
    }
};
