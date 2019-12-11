<template>
    <div class="files-list-container" v-bind:style="filesListContainerStyle">
        <div class="files-title">
            <span>Files</span>
        </div>
        <div class="files-list" v-bind:style="filesListStyle">
            <div class="file-row" v-for="file in filesItems" v-bind:key="file.name">
                <div class="file-image">
                    <img v-bind="imageAttributes(file)" />
                </div>
                <link-platforme
                    v-bind:text="file.name"
                    v-bind:href="file.path"
                    v-bind:disabled="false"
                    v-bind:size="'small'"
                    v-bind:color="'black'"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.files-list-container {
    background-color: $grey-6;
    border: solid 1px #e4e8f0;
    display: grid;
}

.files-list-container .files-title {
    background-color: $white;
    border: solid 1px #e4e8f0;
    height: 42px;
}

.files-list-container .files-title span {
    color: $light-black;
    display: block;
    font-weight: bold;
    letter-spacing: 0.7px;
    line-height: 42px;
    margin: 0px 20px 0px 20px;
}

.files-list-container .files-list {
    overflow: auto;
}

.files-list-container .files-list .file-row {
    border: solid 1px #e4e8f0;
    height: 44px;
}

.files-list-container .files-list .file-row .file-image {
    display: inline-block;
    height: 44px;
    margin: 0px 20px 0px 0px;
    position: relative;
    width: 44px;
}

.files-list-container .files-list .file-row .file-image img {
    display: block;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}

.files-list-container .files-list .file-row .link {
    line-height: 44px;
    vertical-align: top;
}
</style>

<script>
export const FilesListPlatforme = {
    name: "files-list-platforme",
    props: {
        filesItems: {
            type: Array,
            default: () => []
        },
        width: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: null
        }
    },
    data: function() {
        return {};
    },
    computed: {
        filesListContainerStyle() {
            const base = {};

            if (this.width) base.width = `${this.width}px`;

            return base;
        },
        filesListStyle() {
            const base = {};

            if (this.height) base.height = `${this.height}px`;

            return base;
        }
    },
    methods: {
        isImage(fileExtension) {
            return fileExtension.match(/.(jpg|jpeg|png|gif)$/i);
        },
        imageAttributes(file) {
            if (this.isImage(file.extension)) {
                return {
                    src: file.path,
                    width: 44,
                    height: 44
                };
            } else {
                return {
                    src: require("./../../../assets/icons/black/file.svg"),
                    width: 18,
                    height: 18
                };
            }
        }
    }
};
export default FilesListPlatforme;
</script>
