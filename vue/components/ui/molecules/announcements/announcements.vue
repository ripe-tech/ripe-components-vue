<template>
    <div class="announcements">
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
        <div class="announcements-list">
            <div
                class="announcement"
                v-for="(announcement, index) in announcements"
                v-bind:key="index"
            >
                <p class="date">
                    {{ dateString(announcement.timestamp) }}
                </p>
                <div
                    class="dot"
                    v-if="isNew(announcement) && !announcement.read"
                    v-on:click.stop.prevent="onClickAnnouncement(index)"
                />
                <h2 class="title">{{ announcement.title }}</h2>
                <div class="content" v-html="announcement.content" />
                <div
                    class="footer"
                    v-if="
                        (showLinks && announcement.link) ||
                            (showReactions && announcement.show_reactions)
                    "
                >
                    <div class="footer-left">
                        <link-ripe
                            class="link"
                            v-bind:text="announcement.link_text || 'Learn More'"
                            v-bind:href="announcement.link"
                            v-bind:target="'_blank'"
                            v-bind:rel="'noopener noreferrer'"
                            v-if="showLinks && announcement.link"
                        />
                    </div>
                    <div class="footer-right">
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
    </div>
</template>

<style lang="scss" scoped>
@import "css/colors.scss";
@import "css/variables.scss";
@import "css/animations.scss";

.announcements .announcement-header {
    border-bottom: 1px solid $light-white;
    padding: 15px 24px 15px 24px;
}

.announcements .announcement-header .title {
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    line-height: 18px;
}

.announcements .announcement-header .description {
    font-size: 14px;
    letter-spacing: 0.35px;
    line-height: 24px;
    margin: 0px 0px 10px 0px;
}

.announcements .announcement-header .button-close {
    float: right;
}

.announcements .announcements-list {
    max-height: 900px;
    overflow-y: auto;
}

body.mobile .announcements > .announcements-list {
    height: 500px;
}

.announcements .announcements-list > .announcement {
    border-top: 1px solid $light-white;
    padding: 20px 24px 20px 24px;
    position: relative;
}

.announcements .announcements-list > .announcement:first-child {
    border-top: 0px;
}

.announcements .announcements-list > .announcement .date {
    display: inline-block;
    font-weight: 600;
    margin-top: 10px;
}

.announcements .announcements-list > .announcement .dot {
    background-color: #4b8dd7;
    border: 1px solid #ffffff;
    border-radius: 50%;
    cursor: pointer;
    float: right;
    height: 8px;
    line-height: 14px;
    padding: 0px 0px 0px 0px;
    position: absolute;
    right: 30px;
    top: 27px;
    width: 8px;
}

.announcements .announcements-list > .announcement .title {
    font-size: 16px;
    font-weight: bold;
    line-height: 22px;
    margin: 0px 0px 0px 0px;
}

.announcements .announcements-list > .announcement .content {
    font-size: 14px;
    letter-spacing: 0.35px;
    line-height: 24px;
    margin-top: 8px;
}

.announcements .announcements-list > .announcement > .footer {
    display: flex;
    font-size: 0px;
    justify-content: baseline;
    margin-top: 16px;
}

.announcements .announcements-list > .announcement > .footer > .footer-left,
.announcements .announcements-list > .announcement > .footer > .footer-right {
    align-self: flex-end;
    display: inline-block;
    font-size: 14px;
    letter-spacing: 0.35px;
    line-height: 16px;
}

.announcements .announcements-list > .announcement > .footer > .footer-left {
    flex: 1 0;
    text-align: left;
}

.announcements .announcements-list > .announcement > .footer > .footer-right {
    flex: 0 1;
    text-align: right;
}
</style>

<script>
import { utilsMixin } from "../../../../mixins";

export const Announcements = {
    name: "announcements",
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
        showLinks: {
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
            return announcement.timestamp * 1000 > Date.now() - this.newThreshold * 1000;
        },
        onClickAnnouncement(index) {
            this.$emit("click:announcement", index);
        },
        onClickClose() {
            this.$emit("click:close");
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

export default Announcements;
</script>
