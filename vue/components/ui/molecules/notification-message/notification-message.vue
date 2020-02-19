<template>
    <transition name="fade">
        <div class="notification-message" v-bind:style="style" v-show="isVisible">
            <global-events v-on:keydown.esc="handleGlobal" />
            <div class="message-container">
                <icon
                    v-bind:icon="iconData"
                    v-bind:color="iconColorData"
                    v-bind:height="18"
                    v-bind:width="18"
                    v-if="iconData"
                />
                {{ textData }}
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
@import "css/animations.scss";

.notification-message {
    align-items: center;
    display: flex;
    justify-content: center;
    left: 0;
    opacity: 1;
    pointer-events: none;
    position: absolute;
    right: 0;
    text-align: center;
    top: 100px;
    z-index: 50;
}

.notification-message.fade-leave-active {
    animation: fade-shrink-visibility 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
}

.notification-message > .message-container {
    animation: fade-grow-rise 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
    background-color: $white;
    border-radius: 6px 6px 6px 6px;
    box-shadow: 0px 0px 16px rgba(45, 58, 70, 0.25);
    box-sizing: border-box;
    color: #1d2631;
    display: inline-flex;
    font-size: 14px;
    font-stretch: normal;
    font-style: normal;
    font-weight: 600;
    justify-content: center;
    letter-spacing: 0.3px;
    line-height: normal;
    max-height: 100%;
    max-width: 100%;
    opacity: 1;
    overflow-y: auto;
    padding: 17px 20px 17px 20px;
    pointer-events: initial;
    position: relative;
    z-index: 1;
}

.notification-message > .message-container > .icon {
    padding-right: 15px;
}
</style>

<script>
export const NotificationMessage = {
    name: "notification-message",
    props: {
        text: {
            type: String,
            default: "hello world"
        },
        icon: {
            type: String,
            default: null
        },
        iconColor: {
            type: String,
            default: null
        },
        visible: {
            type: Boolean,
            default: false
        },
        timeout: {
            type: Number,
            default: 2000
        },
        topHeight: {
            type: Number,
            default: 100
        },
        globalEvents: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        isVisible() {
            return this.visibleData;
        },
        style() {
            const base = {};
            if (this.topHeight !== null) base.top = `${this.topHeight}px`;
            return base;
        }
    },
    data: function() {
        return {
            visibleData: this.visible,
            globalEventsData: this.globalEvents,
            textData: this.text,
            iconData: this.icon,
            iconColorData: this.iconColor,
            timeoutData: this.tineoutData,
            timer: null,
            key: true
        };
    },
    watch: {
        icon(value) {
            this.iconData = value;
        },
        iconColor(value) {
            this.iconColorData = value;
        },
        text(value) {
            this.textData = value;
        },
        visible(value) {
            this.visibleData = value;
        },
        visibleData(value) {
            this.$emit("update:visible", value);
        }
    },
    mounted: function() {
        this.$bus.$on("show-notification-message", () => {
            this.show();
        });
        this.$bus.$on("hide-notification-message", () => {
            this.hide();
        });
        this.$bus.$on("hide-global", () => {
            if (!this.globalEvents) return;
            this.hide();
        });
        this.$bus.$on("notification", options => this.show(options));
    },
    methods: {
        show(options) {
            console.log("received show with options: ", options);
            const { text, timeout, icon, iconColor, reset = true } = options;

            this.textData = text;
            this.iconData = icon;
            this.iconColorData = iconColor;
            this.timeoutData = timeout || this.timeout;

            if (this.visibleData) this.resetTimeout();
            this.visibleData = true;

            // alternate the key to force the component
            // to be destroyed and mounted again
            if (reset) this.reset();

            this.timer = setTimeout(() => {
                this.hide();
                this.reset();
            }, this.timeout);
        },
        hide() {
            if (!this.visibleData) return;
            this.visibleData = false;
        },
        handleClose() {
            this.hide();
        },
        handleGlobal() {
            if (!this.globalEvents) return;
            this.hide();
        },
        reset() {
            this.key = !this.key;
        },
        resetTimeout() {
            if (this.timer) clearTimeout(this.timer);
        }
    }
};

export default NotificationMessage;
</script>
