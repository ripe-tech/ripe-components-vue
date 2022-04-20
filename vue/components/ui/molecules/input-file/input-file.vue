<template>
    <div class="upload-input" v-bind:class="classes" v-on:click="onUploadButtonClick">
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
    padding: 0px 12px 0px 12px;
}

.upload-input > .text {
    font-size: 13px;
    font-weight: 400;
}

.upload-input.remove > .text {
    font-weight: 500;
}

.upload-input > .icon {
    align-self: center;
    cursor: pointer;
    margin-left: auto;
    padding: 1px;
    transition: 0.2s;
}

.upload-input.remove > .icon:hover {
    background-color: #e6e6e6;
    border-radius: 100px;
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
    computed: {
        classes() {
            const base = {
                remove: !this.noFileSelected
            };
            return base;
        },
        noFileSelected() {
            return this.filesData.length === 0;
        },
        buttonText() {
            return this.noFileSelected ? this.text : this.filesData[0].name;
        },
        icon() {
            return this.noFileSelected ? "upload" : "close";
        }
    },
    mounted: function() {
        this.initUploadArea(this.$refs.filesInput);
    },
    methods: {
        reset() {
            this.clear();
            this.filesData = [];
        },
        onIconClick() {
            if (this.noFileSelected) {
                this.onUploadButtonClick();
                return;
            }
            this.reset();
        }
    }
};

export default InputFile;
</script>
