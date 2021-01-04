<template>
    <div class="lightbox" v-bind:class="classes">
        <global-events v-on:keydown.esc="close" />
        <image-ripe
            v-bind:src="image || ''"
            v-bind:alt="alt || ''"
            v-on:click="event => $emit('click', event)"
        />
        <transition name="fade">
            <div
                class="lightbox-container"
                v-if="visible && (imageLightbox || image)"
                v-on:click="$emit('close')"
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

.lightbox > img {
    cursor: pointer;
    height: inherit;
    max-height: inherit;
    max-width: inherit;
    width: inherit;
}

.lightbox.fit > img {
    object-fit: contain;
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
        image: {
            type: String,
            default: null
        },
        imageLightbox: {
            type: String,
            default: null
        },
        imageFit: {
            type: Boolean,
            default: false
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
        classes() {
            const base = {
                fit: this.imageFit
            };
            return base;
        }
    }
};

export default Lightbox;
</script>
