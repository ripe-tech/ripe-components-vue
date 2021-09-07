<template>
    <upload-button
        class="upload-area"
        v-bind="$attrs"
        v-bind:dragging.sync="dragging"
        v-bind:class="classes"
        ref="upload-button"
        v-on="$listeners"
    >
        <slot v-bind:open-modal="openModal">
            <transition name="fade-in" mode="out-in">
                <div class="description" v-bind:key="dragging">
                    {{ descriptionText }}
                </div>
            </transition>
            <icon v-bind:icon="icon" v-bind:size="110" v-bind:color="'gray'" />
        </slot>
    </upload-button>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
@import "css/animations.scss";

.upload-area {
    align-items: center;
    border: 2px dashed $light-white;
    border-radius: 8px 8px 8px 8px;
    flex-direction: column;
    height: 150px;
    justify-content: center;
    overflow: hidden;
    position: relative;
    transition: background-color 0.125s ease-in;
    white-space: nowrap;
}

.upload-area.upload-button {
    display: flex;
}

.upload-area.dragging {
    background-color: $lighter-grey;
    border-color: $medium-grey;
}

.upload-area.disabled {
    cursor: not-allowed;
}

.upload-area > .description {
    color: $dark;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-bottom: 22px;
}

.upload-area > .description.fade-in-enter-active,
.upload-area > .description.fade-in-leave-active {
    transition: opacity 0.125s ease-in-out, transform 0.125s ease-in-out;
}

.upload-area > .description.fade-in-enter,
.upload-area > .description.fade-in-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.upload-area > .icon {
    opacity: 0;
    position: absolute;
    top: 70px;
    transition: opacity 0.125s ease-in;
}

.upload-area.hidden-upload-button > .upload-area > .icon {
    animation: zoom 2.5s ease-in-out infinite;
    opacity: 1;
}

.upload-area.dragging > .icon {
    animation: zoom 2.5s ease-in-out infinite;
    height: 50px;
    opacity: 1;
}

.upload-area ::v-deep .button-upload {
    transition: opacity 0.125s ease-in;
}

.upload-area.dragging ::v-deep .button.button-color.button-upload {
    opacity: 0;
}

.upload-area.hidden-upload-button ::v-deep .button.button-color.button-upload {
    opacity: 0;
    pointer-events: none;
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
        }
    },
    data: function() {
        return {
            dragging: false
        };
    },
    computed: {
        descriptionText() {
            return this.dragging ? this.descriptionDragging : this.description;
        },
        icon() {
            return this.draggingIcon ? this.draggingIcon : "cloud-upload";
        },
        emptySlots() {
            return Object.entries(this.$slots).length === 0;
        },
        classes() {
            const base = { "hidden-upload-button": !this.emptySlots };
            return base;
        }
    },
    methods: {
        openModal() {
            this.$refs["upload-button"].openModal();
        }
    }
};
export default UploadArea;
</script>
