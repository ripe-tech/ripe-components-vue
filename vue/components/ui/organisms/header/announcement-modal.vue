<template>
    <transition name="fade">
        <div
            class="announcements-container"
            v-bind:class="{ visible: visible }"
            v-show="isVisible"
            v-on:click.stop
        >
            <global-events v-on:keydown.esc="onHandleGlobal" v-on:click="onHandleGlobal" />
            <div class="announcement-header">
                <h1 class="title">{{ title }}</h1>
                <button-icon
                    v-bind:icon="'close'"
                    v-bind:color="'grey'"
                    v-on:click="onClickClose"
                />
                <p class="description">
                    {{ description }}
                </p>
                <form-input>
                    <checkbox
                        v-bind:items="items"
                        v-bind:values="{ notify }"
                        v-bind:disabled="false"
                        v-on:update:values="onUpdateValues"
                    />
                </form-input>
            </div>
            <div class="announcements">
                <div
                    class="announcement"
                    v-for="(announcement, index) in announcements"
                    v-bind:key="index"
                >
                    <p class="date">
                        {{ dateString(announcement.timestamp / 1000) }}
                    </p>
                    <div
                        class="dot"
                        v-bind:style="{ backgroundColor: String(notifyColor) }"
                        v-if="!announcement.read"
                        v-on:click.stop.prevent="onClickAnnouncement(index)"
                    />
                    <h2 class="title">{{ announcement.title }}</h2>
                    <div class="content">
                        {{ announcement.content }}
                    </div>
                    <link-ripe
                        class="link"
                        v-bind:text="'More details'"
                        v-bind:href="announcement.link"
                        v-bind:target="'_blank'"
                        v-bind:rel="'noopener noreferrer'"
                        v-bind:color="'black'"
                    />
                    <reaction
                        class="reaction"
                        v-bind:emoji="'👍'"
                        v-bind:count="count(announcement)"
                        v-bind:user-reacted="announcement.has_reacted"
                        v-if="announcement.reaction"
                        v-bind:id="`${index}`"
                        v-on:click="onReactionClick"
                    />
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@import "css/colors.scss";
@import "css/variables.scss";
@import "css/animations.scss";

.announcements-container {
    animation: fade-grow-rise 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
    background-color: $white;
    border: 1px solid transparent;
    width: 370px;
}

.announcements-container.fade-leave-active {
    animation: fade-shrink-visibility 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
}

.announcements-container.visible {
    border: 1px solid $light-white;
    box-shadow: 0px 6px 24px 0px rgba(67, 86, 100, 0.15);
}

.announcements-container .announcement-header {
    border-bottom: 1px solid $light-white;
    padding: 15px 24px 15px 24px;
}

.announcements-container .announcement-header .title {
    display: inline-block;
    font-size: 18px;
    line-height: 18px;
}

.announcements-container .announcement-header .description {
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 10px;
}

.announcements-container .announcement-header ::v-deep .checkbox .choice {
    padding-left: 0px;
}

.announcements-container .announcement-header ::v-deep .button-icon {
    display: inline-block;
    float: right;
    margin-top: 16px;
}

.announcements-container .announcements {
    max-height: 900px;
    overflow-y: auto;
}

.announcements-container .announcements .announcement {
    border-top: 1px solid $light-white;
    padding: 0px 24px 15px 24px;
    position: relative;
}

.announcements-container .announcements .announcement:first-child {
    border-top: 0px;
}

.announcements-container .announcements .announcement .date {
    display: inline-block;
    line-height: 14px;
    margin-top: 5px;
}

.announcements-container .announcements .announcement .dot {
    background: #4b8dd7;
    border: 1px solid #ffffff;
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
    float: right;
    height: 8px;
    line-height: 14px;
    padding: 0px 0px 0px 0px;
    position: absolute;
    right: 30px;
    top: 27px;
    width: 8px;
}

.announcements-container .announcements .announcement .title {
    font-size: 16px;
    line-height: 16px;
    margin: 0px 0px 0px 0px;
}

.announcements-container .announcements .announcement .content {
    font-size: 14px;
    line-height: 25px;
    margin-bottom: 40px;
    white-space: pre-line;
}

.announcements-container .announcements .announcement .link {
    border-color: #1d2631;
}

.announcements-container .announcements .announcement .reaction {
    float: right;
    line-height: initial;
    margin-top: 17px;
}
</style>

<script>
import { utilsMixin } from "../../../../mixins";

export const AnnouncementModal = {
    name: "announcement-modal",
    mixins: [utilsMixin],
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        notifyColor: {
            type: String,
            default: "#3c80cd"
        },
        title: {
            type: String,
            default: "What's new?"
        },
        description: {
            type: String,
            default: ""
        },
        announcements: {
            type: Array,
            default: []
        },
        notifyUser: {
            type: Boolean,
            required: true
        },
        items: {
            type: Array,
            required: true
        }
    },
    data: function() {
        return {
            visibleData: true,
            notify: true
        };
    },
    watch: {
        visible(value) {
            this.visibleData = value;
        }
    },
    computed: {
        isVisible() {
            return this.visible && this.visibleData;
        }
    },
    created: function() {
        this.notify = this.notifyUser;
    },
    methods: {
        setValues(values) {
            const { notify } = values;
            this.notify = Boolean(notify);
            this.$emit("update:notify", this.notify);
        },
        hide() {
            if (!this.visibleData) return;
            this.visibleData = false;
            this.$emit("update:visible", this.visibleData);
        },
        count(announcement) {
            return announcement.has_reacted ? 2 : 1;
        },
        onHandleGlobal() {
            this.hide();
        },
        onClickAnnouncement(index) {
            this.$emit("click:announcement", index);
        },
        onClickClose() {
            this.hide();
        },
        onUpdateValues(newValues) {
            this.setValues(newValues);
        },
        onReactionClick(id) {
            this.$emit("update:reaction", id);
        }
    }
};

export default AnnouncementModal;
</script>
