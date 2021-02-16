<template>
    <div
        class="upload-area"
        v-bind:class="classes"
        v-on:dragover.prevent="event => onDragOver(event)"
        v-on:drop.prevent="event => onDrop(event)"
        v-on:dragenter="event => onDragEnter(event)"
        v-on:dragleave="event => onDragLeave(event)"
    >
        <input
            type="file"
            hidden
            v-bind:multiple="multiple"
            v-bind:accept="accept"
            ref="filesInput"
            v-on:change="onFilesInputChange"
        />
        <slot v-bind:open-modal="openModal">
            <div class="upload-area-container">
                <transition name="fade-in" mode="out-in">
                    <div class="description" v-bind:key="dragging">
                        {{ descriptionText }}
                    </div>
                </transition>
                <button-icon v-bind:icon="icon" v-bind:size="110" />
                <button-color
                    class="button-upload"
                    v-bind:text="'Upload File'"
                    v-bind:icon="'cloud-upload'"
                    v-bind:alignment="'center'"
                    v-bind:disabled="disabled"
                    v-on:click="onUploadButtonClick"
                />
            </div>
        </slot>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
@import "css/animations.scss";

.upload-area > .upload-area-container {
    align-items: center;
    border: 2px dashed $light-white;
    border-radius: 8px 8px 8px 8px;
    display: flex;
    flex-direction: column;
    height: 150px;
    justify-content: center;
    overflow: hidden;
    position: relative;
    transition: background-color 0.125s ease-in;
    white-space: nowrap;
}

.upload-area.dragging > .upload-area-container {
    background-color: $lighter-grey;
    border-color: $medium-grey;
    pointer-events: none;
}

.upload-area.disabled > .upload-area-container {
    cursor: not-allowed;
}

.upload-area > .upload-area-container > .description {
    color: $dark;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-bottom: 22px;
}

.upload-area > .upload-area-container > .description.fade-in-enter-active,
.upload-area > .upload-area-container > .description.fade-in-leave-active {
    transition: opacity 0.125s ease-in-out, transform 0.125s ease-in-out;
}

.upload-area .upload-area-container > .description.fade-in-enter,
.upload-area .upload-area-container > .description.fade-in-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.upload-area > .upload-area-container > .button-icon {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 40px;
    transition: opacity 0.125s ease-in;
}

.upload-area.dragging > .upload-area-container > .button-icon {
    animation: zoom 2.5s ease-in-out infinite;
    height: 40px;
    opacity: 1;
}

.upload-area > .upload-area-container > .button-upload {
    transition: opacity 0.125s ease-in;
}

.upload-area.dragging > .upload-area-container > .button-upload {
    opacity: 0;
}
</style>

<script>
export const UploadArea = {
    name: "upload-area",
    props: {
        description: {
            type: String,
            default: "Drag & drop your files"
        },
        descriptionDragging: {
            type: String,
            default: "Drop your files to upload"
        },
        disabled: {
            type: Boolean,
            default: false
        },
        draggingIcon: {
            type: String,
            default: null
        },
        files: {
            type: Array,
            default: () => []
        },
        multiple: {
            type: Boolean,
            default: true
        },
        accept: {
            type: String,
            default: null
        }
    },
    computed: {
        descriptionText() {
            return this.dragging ? this.descriptionDragging : this.description;
        },
        icon() {
            return this.draggingIcon ? this.draggingIcon : "cloud-upload";
        },
        classes() {
            const base = { dragging: this.dragging, disabled: this.draggingDisabled };
            return base;
        }
    },
    data: function() {
        return {
            filesData: this.files,
            dragging: false,
            draggingDisabled: false,
            dragEnterTarget: null
        };
    },
    watch: {
        files(value) {
            this.filesData = value;
        },
        dragging(value) {
            this.$emit("update:dragging", value);
        },
        draggingDisabled(value) {
            // this.$emit("")
            console.log("svkjsdsdn");
        }
    },
    methods: {
        setFiles(filesList) {
            this.filesData = [...filesList];
            this.$emit("update:files", this.filesData);
        },
        openModal() {
            this.$refs.filesInput.click();
        },
        onDragOver(event) {
            if (this.disabled) return;
            event.dataTransfer.dropEffect = "copy";
        },
        onDrop(event) {
            if (this.disabled) return;
            this.setFiles(event.dataTransfer.files);
            this.dragging = false;
        },
        onDragEnter(event) {
            if (this.disabled) {
                this.draggingDisabled = true;
                return;
            };
            this.dragging = true;
        },
        onDragLeave(event) {
            if (event.currentTarget.contains(event.relatedTarget)) return false;
            if (this.disabled) this.draggingDisabled = false;
            this.dragging = false;
        },
        onFilesInputChange() {
            this.setFiles(this.$refs.filesInput.files);
        },
        onUploadButtonClick() {
            this.$refs.filesInput.click();
        },
        async uploadRules() {
            const content = window.content;
            const headers = ["brand", "shoe", "variant", "part", "material", "color", "vat_included", "ddp_included", "fixed_price", "round_price", "pivot", "priority", "price_eur", "price_usd", "price_gbp"];
            const promises = [];
            const rulesPayload = {};

            console.log(headers);

            content.forEach(values => {
                values.forEach((value, index) => {
                    rulesPayload[headers[index]] = value;
                });
                const promise = window.api.createPriceRule(rulesPayload);
                promises.push(promise);
            });

            document.body.classList.add("loading");

            try {
                await Promise.all(promises);
                alert("Rules saved in the database");
                // _cleanupDom();
            } finally {
                document.body.classList.remove("loading");
            }
}
    }
};
export default UploadArea;
</script>
