<template>
    <upload-area
        class="image-input"
        v-bind:files.sync="files"
        v-bind:multiple="multiple"
        v-bind:accept="'image/*'"
        v-on:update:files="loadFiles"
    >
        <template v-slot="{ openModal }">
            <div class="image-input-content" v-on:click="openModal">
                <icon
                    class="upload-icon"
                    v-bind:icon="'add-camera'"
                    v-bind:height="24"
                    v-bind:width="24"
                    v-show="!hasImages"
                />
                <div
                    class="image-container"
                    v-for="(image, index) in imagesData"
                    v-bind:key="image.name"
                    v-on:click.stop
                >
                    <lightbox
                        class="image-preview"
                        v-bind:image="image.data"
                        v-bind:visible="visibleLightbox === index"
                        v-on:close="onCloseLightbox"
                        v-on:click.stop="onClickLightbox(index)"
                    />
                    <div class="name">
                        {{ image.name }}
                    </div>
                    <button-icon
                        class="remove-button"
                        title="Remove"
                        v-bind:icon="'remove'"
                        v-bind:width="20"
                        v-bind:height="20"
                        v-bind:color="'grey'"
                        v-on:click.stop="onClickFileRemove(index)"
                    />
                </div>
            </div>
        </template>
    </upload-area>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.image-input {
    background-color: #f9fafd;
    border: 1px solid #e4e8f0;
    border-radius: 6px;
    cursor: pointer;
    height: 30px;
    height: 100%;
    width: 100%;
}

.image-input:hover {
    border-color: #1d1d1d;
}

.image-input.dragging {
    opacity: 0.3;
}

.image-input > .image-input-content {
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 10px 10px 10px 10px;
    width: 100%;
}

.image-input > .image-input-content > .image-container {
    align-items: center;
    cursor: initial;
    display: flex;
    overflow: hidden;
    padding: 5px 0px 5px 0px;
    white-space: nowrap;
}

.image-input > .image-input-content > .image-container > .remove-button {
    cursor: pointer;
    display: none;
    margin-right: 10px;
}

.image-input > .image-input-content > .image-container:hover > .remove-button {
    display: inline-block;
}

.image-input > .image-input-content > .image-container > .image-preview {
    height: 30px;
    vertical-align: top;
    width: 30px;
}

.image-input > .image-input-content > .image-container > .image-preview ::v-deep img {
    object-fit: contain;
}

.image-input > .image-input-content > .image-container > .name {
    display: inline-block;
    line-height: 30px;
    margin: 0px 10px;
    width: 100%;
}
</style>

<script>
export const ImageInput = {
    name: "image-input",
    props: {
        images: {
            type: Array,
            default: []
        },
        multiple: {
            type: Boolean,
            defsault: true
        }
    },
    computed: {
        hasImages() {
            return this.imagesData.length > 0;
        }
    },
    data: function() {
        return {
            imagesData: this.images,
            visibleLightbox: null
        };
    },
    watch: {
        imagesData(value) {
            this.$emit("update:images", value);
        }
    },
    methods: {
        loadFiles(files) {
            if (this.multiple) {
                Object.values(files).forEach(file => this.loadFile(file));
            } else {
                this.imagesData = [];
                this.loadFile(files[0]);
            }
        },
        onClickFileRemove(index) {
            this.imagesData.splice(index, 1);
        },
        onClickLightbox(index) {
            this.visibleLightbox = index;
        },
        onCloseLightbox() {
            this.visibleLightbox = null;
        },
        async loadFile(file) {
            const data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
            this.imagesData.push({
                name: file.name,
                type: file.type,
                size: file.size,
                lastModified: file.lastModified,
                data: data
            });
        }
    }
};
export default ImageInput;
</script>
