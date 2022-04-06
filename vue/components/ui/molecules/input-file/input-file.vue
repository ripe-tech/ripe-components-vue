<template>
    <div class="upload-input" v-on:click="onUploadButtonClick">
        <div class="text">
            {{ buttonText }}
        </div>
        <input
            type="file"
            hidden
            v-bind:multiple="false"
            v-bind:accept="accept"
            ref="filesInput"
            v-on:change="onFilesInputChange"
        />
        <icon
            v-bind:icon="icon"
            v-bind:width="15"
            v-bind:height="14"
            v-on:click.stop="onIconClick"
        />
    </div>
</template>

<style lang="scss" scoped>
.upload-input {
    background-color: #f9fafd;
    border: 1px solid #e4e8f0;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    height: 34px;
    line-height: 34px;
    padding-left: 12px;
    padding-right: 12px;
}

.upload-input > .text {
    font-size: 13px;
}

.upload-input > .icon {
    align-self: center;
    cursor: pointer;
    margin-left: auto;
}

</style>

<script>
import { uploadMixin } from "../../../../mixins/upload";

export const InputFile = {
    name: "input-file",
    mixins: [uploadMixin],
    props: {
        text: {
            type: String,
            default: null
        },
        accept: {
            type: String,
            default: null
        }
    },
    data: function() {
        return {
            height: null,
            greaterValue: null
        };
    },
    mounted: function() {
        this.initUploadArea(this.$refs.filesInput);
    },
    computed: {
        buttonText() {
            return this.filesData.length === 0 ? this.text : this.filesData[0].name;
        },
        icon() {
            return this.filesData.length === 0 ? "upload" : "close";
        }
    },
    watch: {
        files(value) {
            if (!value || value.length === 0) this.clear();
            this.filesData = value;
        }
    },
    methods: {
        reset() {
            this.clear();
            this.filesData = [];
        },
        onIconClick() {
            if (this.filesData.length === 0) {
                this.onUploadButtonClick();
                return;
            }
            this.reset();
        }
    }
};

export default InputFile;
</script>
