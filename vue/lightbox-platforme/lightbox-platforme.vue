<template>
    <div class="lightbox-platforme">
        <global-events v-on:keyup.esc="close" />
        <img v-bind:src="image" v-bind:alt="alt" v-on:click="event => $emit('click', event)" />
        <transition name="fade">
            <div class="lightbox-container" v-show="visible" v-on:click="$emit('close')">
                <div class="image-container">
                    <img v-bind:src="image" v-bind:alt="alt" />
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.lightbox-platforme {
    display: inline-block;
}

.lightbox-platforme > img {
    cursor: pointer;
    height: inherit;
    max-height: inherit;
    max-width: inherit;
    width: inherit;
}

.lightbox-container {
    background-color: rgba(0, 0, 0, 0.7);
    bottom: 0px;
    box-sizing: border-box;
    left: 0px;
    padding: 40px 40px 40px 40px;
    position: fixed;
    right: 0px;
    top: 60px;
    z-index: 10;
}

.lightbox-container .image-container {
    animation: fade-grow-rise 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
    height: 100%;
    position: relative;
    width: 100%;
}

.lightbox-container .image-container img {
    background: #ffffff;
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
export const LightboxPlatforme = {
    props: {
        image: {
            type: String,
            default: ""
        },
        alt: {
            type: String,
            default: ""
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
    }
};

export default LightboxPlatforme;
</script>
