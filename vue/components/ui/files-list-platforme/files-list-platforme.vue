<template>
    <div class="files-list-container">
        <div class="files-title">
            <span>Files</span>
        </div>
        <div class="files-list">
            <div class="file-row" 
                v-for="file in filesItems"
                v-bind:key="file.name"
                >
                <img class="file-image"
                    v-bind:src="imgPath(file)"
                    />
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

.files-list-container .files-list .file-row{
    height: 44px;
}

.files-list-container .files-list .file-row .file-image{
    height: 44px;
    margin: 0px 20px 0px 0px;
}

.files-list-container .files-list .file-row{
    height: 44px;
}

.files-list-container .files-list .file-row .link{
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
        return {
            defaultIcon: require(`./../../../assets/icons/black/file.svg`)
        };
    },
    computed:
    {
        imageStyle() {
            //TODO substituir v-bind:src, por uma class que faça o mesmo,
            //  mas que meta numa div com background-image
            //  para controlar os tamanhos e margens dependendo se é o icon ou imagem
        }
    },
    methods: {
        imgPath(file) {
            return this.isImage(file.extension) ? file.path: this.defaultIcon;
        },
        isImage(fileExtension){
            return fileExtension.match(/.(jpg|jpeg|png|gif)$/i);
        }
    }
};
export default FilesListPlatforme;
</script>