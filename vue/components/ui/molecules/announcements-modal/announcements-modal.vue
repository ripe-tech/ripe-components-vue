<template>
    <div class="announcements-container">
        <div class="announcement-header">
            <h1 class="title">{{ title }}</h1>
            <button-icon
                v-bind:icon="'close'"
                v-bind:color="'grey'"
                class="button-close"
                v-on:click="onClickClose"
            />
            <p class="description">
                {{ description }}
            </p>
            <form-input v-if="showSubscribe">
                <checkbox
                    v-bind:items="[checkboxItem]"
                    v-bind:values="{ subscribe }"
                    v-on:update:values="onUpdateSubscribe"
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
                    v-if="isNew(announcement) && !announcement.read"
                    v-on:click.stop.prevent="onClickAnnouncement(index)"
                />
                <h2 class="title">{{ announcement.title }}</h2>
                <div class="content">
                    {{ announcement.content }}
                </div>
                <div class="footer">
                    <link-ripe
                        class="link"
                        v-bind:text="'More details'"
                        v-bind:href="announcement.link"
                        v-bind:target="'_blank'"
                        v-bind:rel="'noopener noreferrer'"
                        v-bind:color="'black'"
                        v-if="announcement.link"
                    />
                    <reaction
                        class="reaction"
                        v-bind:emoji="'👍'"
                        v-bind:count="announcement.reactions || 0"
                        v-bind:user-reacted="announcement.user_reacted"
                        v-if="showReactions && announcement.show_reactions"
                        v-on:click="onReactionClick(index)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/colors.scss";
@import "css/variables.scss";
@import "css/animations.scss";

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
    margin: 0px 0px 10px 0px;
}

.announcements-container .announcement-header .button-close {
    display: inline-block;
    float: right;
    margin-top: 16px;
}

.announcements-container .announcements {
    max-height: 900px;
    overflow-y: auto;
}

body.mobile .announcements-container > .announcements {
    height: 500px;
}

.announcements-container .announcements > .announcement {
    border-top: 1px solid $light-white;
    padding: 15px 24px 30px 24px;
    position: relative;
}

.announcements-container .announcements > .announcement:first-child {
    border-top: 0px;
}

.announcements-container .announcements > .announcement .date {
    display: inline-block;
    margin-top: 10px;
}

.announcements-container .announcements > .announcement .dot {
    background-color: #4b8dd7;
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

.announcements-container .announcements > .announcement .title {
    font-size: 16px;
    line-height: 22px;
    margin: 0px 0px 0px 0px;
}

.announcements-container .announcements > .announcement .content {
    font-size: 14px;
    line-height: 25px;
    white-space: pre-line;
}

.announcements-container .announcements > .announcement > .footer {
    margin-top: 40px;
}

.announcements-container .announcements > .announcement > .footer > .reaction {
    float: right;
}
</style>

<script>
import { utilsMixin } from "../../../../mixins";

export const AnnouncementsModal = {
    name: "announcements-modal",
    mixins: [utilsMixin],
    props: {
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
        newThreshold: {
            type: Number,
            default: 432000
        },
        showSubscribe: {
            type: Boolean,
            default: false
        },
        subscribe: {
            type: Boolean,
            default: true
        },
        showReactions: {
            type: Boolean,
            default: false
        },
        checkboxItem: {
            type: Object,
            default: () => ({
                label: "Notify me about updates",
                value: "subscribe"
            })
        }
    },
    data: function() {
        return {
            subscribeData: this.subscribe
        };
    },
    watch: {
        subscribe(value) {
            this.subscribeData = value;
        }
    },
    methods: {
        setSubscribe(value) {
            this.subscribeData = value;
            this.$emit("update:subscribe", this.subscribeData);
        },
        isNew(announcement) {
            return announcement.timestamp > Date.now() - this.newThreshold;
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
        onUpdateSubscribe(values) {
            const { subscribe } = values;
            this.setSubscribe(subscribe);
        },
        onReactionClick(index) {
            this.$emit("click:reaction", index);
        }
    }
};

export default AnnouncementsModal;
</script>
