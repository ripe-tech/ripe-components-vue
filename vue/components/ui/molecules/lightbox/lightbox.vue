<template>
    <div class="lightbox">
        <global-events v-on:keydown.esc="close" />
        <div class="lightbox-title" v-if="title">
            {{ title }}
        </div>
        <image-ripe
            v-bind:src="image"
            v-bind:style="imageStyle"
            v-bind:alt="alt || ''"
            v-if="image"
            v-on:click="event => $emit('click', event)"
        />
        <div class="lightbox-subtitle" v-if="subTitle">
            {{ subTitle }}
        </div>
        <transition name="fade">
            <div
                class="lightbox-container"
                v-if="visible && (imageLightbox || image)"
                v-on:click="() => $emit('close')"
            >
                <div class="image-container">
                    <image-ripe
                        v-bind:src="imageLightbox || image || ''"
                        v-bind:alt="alt"
                        v-bind:fade="false"
                    />
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
@import "css/animations.scss";

.lightbox {
    display: inline-block;
}

.lightbox-title {
    color: #a4adb5;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.6px;
    margin-bottom: 6.5px;
    text-transform: uppercase;
}

.lightbox-subtitle {
    background-color: #e1e2ff;
    border-radius: 4px;
    color: #5f60c2;
    font-size: 10px;
    margin-top: 12.5px;
    padding: 4px 6px;
    text-align: center;
    width: 55px;
}

.lightbox > img {
    cursor: pointer;
    height: inherit;
    max-height: inherit;
    max-width: inherit;
    object-fit: contain;
    width: inherit;
}

.lightbox-container {
    background-color: rgba(0, 0, 0, 0.7);
    bottom: 0px;
    box-sizing: border-box;
    left: 0px;
    opacity: 1;
    padding: 40px 40px 40px 40px;
    position: fixed;
    right: 0px;
    top: 0px;
    transition: opacity 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    z-index: 40;
}

.lightbox-container.fade-enter,
.lightbox-container.fade-leave-to {
    opacity: 0;
}

.lightbox-container .image-container {
    animation: fade-grow-rise 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
    height: 100%;
    position: relative;
    width: 100%;
}

.lightbox-container .image-container img {
    background: $white;
    border-radius: 4px 4px 4px 4px;
    box-shadow: 0px 0px 24px rgba(32, 32, 32, 0.8);
    cursor: pointer;
    left: 0px;
    margin: 0px auto 0px auto;
    max-height: 100%;
    max-width: 100%;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
}
</style>

<script>
export const Lightbox = {
    name: "lightbox",
    props: {
        title: {
            type: String,
            default: null
        },
        subTitle: {
            type: String,
            default: null
        },
        image: {
            type: String,
            default: null
        },
        imageLightbox: {
            type: String,
            default: null
        },
        objectFit: {
            type: String,
            default: null
        },
        alt: {
            type: String,
            default: null
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit("close");
        }
    },
    computed: {
        imageStyle() {
            const base = {};
            if (this.objectFit) base["object-fit"] = this.objectFit;
            return base;
        }
    }
};

export default Lightbox;
</script>
