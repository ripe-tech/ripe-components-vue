<template>
    <upload-area
        class="input-image"
        v-bind:files.sync="files"
        v-bind:multiple="multiple"
        v-bind:accept="accept"
        v-on:update:files="loadFiles"
    >
        <template v-slot="{ openModal }">
            <div class="input-image-content" v-on:click="openModal">
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
                        v-bind:object-fit="'contain'"
                        v-on:close="onCloseLightbox"
                        v-on:click="onClickLightbox(index)"
                    />
                    <div class="name">
                        {{ image.name }}
                    </div>
                    <button-icon
                        class="button-remove"
                        title="Remove"
                        v-bind:icon="'remove'"
                        v-bind:width="20"
                        v-bind:height="20"
                        v-bind:color="'grey'"
                        v-on:click="onClickFileRemove(index)"
                    />
                </div>
            </div>
        </template>
    </upload-area>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.input-image {
    background-color: #f9fafd;
    border: 1px solid #e4e8f0;
    border-radius: 6px;
    cursor: pointer;
}

.input-image:hover {
    border-color: #1d1d1d;
}

.input-image.dragging {
    opacity: 0.3;
}

.input-image > .input-image-content {
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 10px 10px 10px 10px;
    width: 100%;
}

.input-image > .input-image-content > .image-container {
    align-items: center;
    cursor: initial;
    display: flex;
    overflow: hidden;
    padding: 5px 0px 5px 0px;
    white-space: nowrap;
}

.input-image > .input-image-content > .image-container > .button-remove {
    cursor: pointer;
    display: none;
    margin-right: 10px;
}

.input-image > .input-image-content > .image-container:hover > .button-remove {
    display: inline-block;
}

.input-image > .input-image-content > .image-container > .image-preview {
    height: 30px;
    vertical-align: top;
    width: 30px;
}

.input-image > .input-image-content > .image-container > .name {
    display: inline-block;
    line-height: 30px;
    margin: 0px 10px;
    width: 100%;
}
</style>

<script>
export const InputImage = {
    name: "input-image",
    props: {
        /**
         * The initial set of images to be uploaded.
         * An image should be an object with data property
         * having the content of the image in base64.
         */
        images: {
            type: Array,
            default: []
        },
        /**
         * Support for multiple images, this allowing the user
         * to select and upload more than one image.
         */
        multiple: {
            type: Boolean,
            default: true
        },
        /**
         * The content types (MIME types) to be allowed within
         * the underlying upload area.
         */
        accept: {
            type: String,
            default: "image/*"
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
        images(value) {
            this.imagesData = value;
        },
        imagesData(value) {
            this.$emit("update:images", value);
        }
    },
    methods: {
        async loadFiles(files) {
            if (this.multiple) {
                await Promise.all(Object.values(files).map(file => this.loadFile(file)));
            } else {
                this.imagesData = [];
                await this.loadFile(files[0]);
            }
        },
        async loadFile(file) {
            const data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
                reader.readAsDataURL(file);
            });
            this.imagesData.push({
                name: file.name,
                type: file.type,
                size: file.size,
                lastModified: file.lastModified,
                data: data
            });
        },
        onClickFileRemove(index) {
            this.imagesData.splice(index, 1);
        },
        onClickLightbox(index) {
            this.visibleLightbox = index;
        },
        onCloseLightbox() {
            this.visibleLightbox = null;
        }
    }
};
export default InputImage;
</script>
