<template>
    <transition name="fade">
        <div
            class="notification"
            v-bind:class="classes"
            v-bind:style="style"
            v-show="isVisible"
            v-on:click="onClick"
        >
            <global-events v-on:keydown.esc="handleGlobal" />
            <div class="notification-container">
                <icon
                    v-bind:icon="iconData"
                    v-bind:color="iconColorData"
                    v-bind:height="24"
                    v-bind:width="24"
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
    position: fixed;
    right: 0;
    text-align: center;
    top: 100px;
    z-index: 50;
}

.notification.fade-leave-active {
    animation: fade-shrink-visibility 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
}

.notification > .notification-container {
    align-items: center;
    animation: fade-grow-rise 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
    background-color: $white;
    border-radius: 8px 8px 8px 8px;
    box-shadow: 0px 8px 12px 0px rgba(98, 110, 117, 0.15);
    box-sizing: border-box;
    color: #1d2631;
    display: inline-flex;
    font-size: 14px;
    font-weight: 500;
    justify-content: center;
    letter-spacing: 0.3px;
    line-height: 24px;
    max-height: 100%;
    max-width: 100%;
    overflow-y: auto;
    padding: 12px 24px 12px 24px;
    pointer-events: initial;
    position: relative;
    z-index: 1;
}

.notification.dark > .notification-container {
    background-color: $dark;
    color: $white;
}

.notification > .notification-container > .icon {
    margin-right: 16px;
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
        variant: {
            type: String,
            default: null
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
        classes() {
            const base = {};
            if (this.variant) base[this.variant] = true;
            return base;
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
            // unpacks the complete set of options for the new notification
            // that is going to be displayed
            const { text, timeout, icon, iconColor, globalEvents, reset = true } = options;

            // updates the current local values taking into account
            // the provided set of options
            this.textData = text;
            this.iconData = icon;
            this.iconColorData = iconColor;
            this.timeoutData = timeout || this.timeout;
            this.globalEventsData = globalEvents || this.globalEvents;

            // sets the visible data value so that the current context
            // indicates that there's data available
            this.visibleData = true;

            // alternate the key to force the component
            // to be destroyed and mounted again
            if (reset) this.reset();

            // ensures that the previously registered timeout
            // is cleared so that a new one can be created
            this.resetTimeout();

            // creates the timeout that is going to be used to
            // hide and reset the current notification
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
            if (!this.timer) return;
            clearTimeout(this.timer);
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
