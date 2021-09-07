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
        }
    },
    data: function() {
        return {
            dragging: false,
            draggingDisabled: false,
            filesData: this.files,
            fileInputRef: this.files
        };
    },
    methods: {
        setFiles(filesList) {
            this.filesData = [...filesList];
            this.$emit("update:files", this.filesData);
        },
        clear() {
            this.$refs.filesInput.value = null;
        },
        openModal() {
            this.$refs.filesInput.click();
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
            this.setFiles(this.$refs.filesInput.files);
        },
        onUploadButtonClick() {
            this.$refs.filesInput.click();
        }
    }
};
