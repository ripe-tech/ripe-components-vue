<template>
    <transition name="fade">
        <div class="notification" v-bind:style="style" v-show="isVisible" v-on:click="onClick">
            <global-events v-on:keydown.esc="handleGlobal" />
            <div class="notification-container">
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

.notification {
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    text-align: center;
    top: 100px;
    z-index: 50;
}

.notification.fade-leave-active {
    animation: fade-shrink-visibility 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
}

.notification > .notification-container {
    animation: fade-grow-rise 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
    background-color: $white;
    border-radius: 6px 6px 6px 6px;
    box-shadow: 0px 0px 16px rgba(45, 58, 70, 0.25);
    box-sizing: border-box;
    color: #1d2631;
    display: inline-flex;
    font-size: 13px;
    font-weight: 600;
    justify-content: center;
    letter-spacing: 0.3px;
    max-height: 100%;
    max-width: 100%;
    overflow-y: auto;
    padding: 12px 18px 12px 18px;
    pointer-events: initial;
    position: relative;
    z-index: 1;
}

.notification > .notification-container > .icon {
    padding-right: 8px;
}
</style>

<script>
export const Notification = {
    name: "notification",
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
            default: 1000
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
            timeoutData: this.timeoutData,
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
        this.$bus.$on("notification", options => this.show(options));
        this.$bus.$on("hide-global", () => {
            if (!this.globalEventsData) return;
            this.hide();
        });
    },
    methods: {
        show(options) {
            const { text, timeout, icon, iconColor, globalEvents, reset = true } = options;

            this.textData = text;
            this.iconData = icon;
            this.iconColorData = iconColor;
            this.timeoutData = timeout || this.timeout;
            this.globalEventsData = globalEvents || this.globalEvents;

            if (this.visibleData) this.resetTimeout();
            this.visibleData = true;

            // alternate the key to force the component
            // to be destroyed and mounted again
            if (reset) this.reset();

            this.timer = setTimeout(() => {
                this.hide();
                this.reset();
            }, this.timeoutData);
        },
        hide() {
            if (!this.visibleData) return;
            this.visibleData = false;
        },
        reset() {
            this.key = !this.key;
        },
        resetTimeout() {
            if (this.timer) clearTimeout(this.timer);
        },
        handleGlobal() {
            if (!this.globalEvents) return;
            this.hide();
        },
        onClick() {
            this.hide();
        }
    }
};

export default Notification;
</script>
