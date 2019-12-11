<template>
    <transition name="fade">
        <div
            class="whats-new"
            v-bind:class="{ visible: visible }"
            v-show="isVisible"
            ref="container"
        >
            <div class="whats-new-container">
                <global-events v-on:keydown.esc="handleGlobal()" />
                <div class="whats-new-header">
                    <slot name="header">
                        <h1 class="title">What's new?</h1>
                        <button-icon-platforme
                            v-bind:icon="'close'"
                            v-bind:color="'grey'"
                            v-on:click="hide"
                        />
                        <form-input-platforme>
                            <checkbox-platforme
                                v-bind:items="items"
                                v-bind:values="values"
                                v-bind:disabled="false"
                                v-on:update:values="setValues"
                            />
                        </form-input-platforme>
                    </slot>
                </div>
                <div class="whats-new-news">
                    <div class="whats-new-item" v-for="(item, index) in news" v-bind:key="index">
                        <slot v-bind:item="item">
                            <p class="news-date">
                                {{ dateString(item.date / 1000) }}
                            </p>
                            <div
                                class="news-dot"
                                v-bind:style="{ background: String(notifyColor) }"
                                v-if="!item.read"
                                v-on:click.stop="onClickNews(index)"
                            />
                            <h2 class="news-title">{{ item.title }}</h2>
                            <div class="news-content">
                                {{ item.content }}
                            </div>
                            <link-platforme
                                class="news-link"
                                v-bind:text="'More details'"
                                v-bind:href="'http://platforme.com'"
                                v-bind:color="'black'"
                            />
                            <button-icon-platforme
                                class="news-reaction"
                                v-bind:icon="'eye'"
                                v-bind:color="'grey'"
                            />
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@import "css/colors.scss";
@import "css/variables.scss";
@import "css/animations.scss";

.whats-new {
    width: 370px;
}

.whats-new.fade-leave-active > .whats-new-container {
    animation: fade-shrink-visibility 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
}

.whats-new-container {
    background-color: $white;
    border: 1px solid transparent;
}

.whats-new.visible .whats-new-container {
    border: 1px solid $light-white;
    box-shadow: 0 6px 24px 0 rgba(67, 86, 100, 0.15);
}

.whats-new-container .whats-new-header {
    border-bottom: 1px solid $light-white;
    padding: 15px 24px 15px 24px;
}

.whats-new-container .whats-new-header .title {
    display: inline;
    font-size: 18px;
}

.whats-new-container .whats-new-header ::v-deep .button-icon {
    display: inline;
    float: right;
    margin-top: 17px;
}

.whats-new-container .whats-new-news {
    max-height: 80vh;
    overflow-y: auto;
}

.whats-new-container .whats-new-news .whats-new-item {
    border-top: 1px solid $light-white;
    padding: 15px 24px 15px 24px;
}

.whats-new-container .whats-new-news .whats-new-item:first-child {
    border-top: 0px;
}

.whats-new-container .whats-new-news .whats-new-item .news-date {
    display: inline;
}

.whats-new-container .whats-new-news .whats-new-item .news-dot {
    background: #4b8dd7;
    border: 1px solid #ffffff;
    border-radius: 50%;
    cursor: pointer;
    display: inline;
    float: right;
    height: 10px;
    line-height: 14px;
    margin: 25px 12px 0px 0px;
    margin-top: 25px;
    padding: 0px 0px 0px 0px;
    width: 10px;
}

.whats-new-container .whats-new-news .whats-new-item .news-title {
    font-size: 16px;
    line-height: 16px;
    margin: 0px 0px 0px 0px;
}

.whats-new-container .whats-new-news .whats-new-item .news-content {
    font-size: 14px;
    line-height: 25px;
    margin-bottom: 40px;
    white-space: pre-line;
}

.whats-new-container .whats-new-news .whats-new-item .news-link {
    border-color: #1d2631;
}

.whats-new-container .whats-new-news .whats-new-item .news-reaction {
    float: right;
    margin-top: 17px;
}
</style>

<script>
import { utilsMixin } from "../../../mixins";

export const WhatsNewModalPlatforme = {
    name: "whats-new-modal-platforme",
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
        news: {
            type: Array,
            default: []
        },
        notifyUser: {
            type: Boolean,
            required: true
        }
    },
    data: function() {
        return {
            visibleData: true,
            items: [
                {
                    label: "Notify me about updates",
                    value: "notify",
                    checked: true
                }
            ],
            values: {
                notify: true
            }
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
        this.values.notify = this.notifyUser;
        document.addEventListener("click", this.handleGlobal);
    },
    destroyed: function() {
        document.removeEventListener("click", this.handleGlobal);
    },
    methods: {
        setValues(newValues) {
            this.values = newValues;
            this.$emit("update:notify", !!this.values.notify);
        },
        hide() {
            if (!this.visibleData) return;
            this.visibleData = false;
            this.$emit("update:visible", this.visibleData);
        },
        handleGlobal(event) {
            if (!event) {
                this.hide();
            } else if (!this.$refs.container.contains(event.target)) {
                this.hide();
            }
        },
        onClickNews(index) {
            this.$emit("click:news", index);
        }
    }
};

export default WhatsNewModalPlatforme;
</script>
