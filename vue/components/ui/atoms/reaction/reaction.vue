<template>
    <div class="reaction" v-bind:class="{ 'user-reacted': userReactedData }" v-on:click="onClick">
        <image-ripe v-bind:src="imgUrl" v-if="hasImage" />
        <icon v-bind:icon="icon" v-else-if="hasIcon" />
        <div class="emoji" v-else>
            {{ emoji }}
        </div>
        <div class="reaction-counter" v-if="hasReactions">
            {{ countData }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.reaction {
    background-color: $lighter-grey;
    border: 1px solid transparent;
    border-radius: 24px 24px 24px 24px;
    cursor: pointer;
    display: inline-block;
    font-size: 0px;
    line-height: 15px;
    min-height: 15px;
    min-width: 12px;
    padding: 3px 7px 3px 7px;
    text-align: center;
    transition: transform 0.15s ease-out, background-color 0.2s ease-out, border-color 0.2s ease-out;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
}

.reaction:hover {
    background-color: $white;
    border-color: $medium-grey;
}

.reaction:active {
    transform: scale(0.94);
}

.reaction.user-reacted {
    background-color: #e2eff5;
    border-color: #43abd7;
}

.reaction.user-reacted:hover {
    background-color: #ecf2f5;
    border-color: #43abd7;
}

.reaction > * {
    vertical-align: middle;
}

.reaction > .image {
    display: inline-block;
    height: 15px;
    width: 15px;
}

.reaction > .icon {
    height: 15px;
    width: 15px;
}

.reaction > .emoji {
    display: inline-block;
    font-size: 12px;
}

.reaction .reaction-counter {
    color: $black;
    display: inline-block;
    font-size: 11px;
    padding: 0px 2px 0px 3px;
}
</style>

<script>
export const Reaction = {
    name: "reaction",
    props: {
        id: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            mandatory: false
        },
        imgUrl: {
            type: String,
            mandatory: false
        },
        emoji: {
            type: String,
            mandatory: false
        },
        count: {
            type: Number,
            default: 0
        },
        userReacted: {
            type: Boolean,
            default: false
        },
        behavior: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            countData: this.count,
            userReactedData: this.userReacted
        };
    },
    watch: {
        count(value) {
            this.countData = value;
        },
        userReacted(value) {
            this.userReactedData = value;
        }
    },
    computed: {
        hasReactions() {
            return this.countData > 0;
        },
        hasImage() {
            return Boolean(this.imgUrl);
        },
        hasIcon() {
            return Boolean(this.icon);
        },
        hasEmoji() {
            return Boolean(this.emoji);
        },
        hasCount() {
            return Boolean(this.countData);
        }
    },
    methods: {
        increment() {
            this.countData += 1;
            this.$emit("update:count", this.countData);
        },
        decrement() {
            this.countData -= 1;
            this.$emit("update:count", this.countData);
        },
        toggle() {
            this.userReactedData = !this.userReactedData;
            if (this.userReactedData) this.increment();
            else this.decrement();
            this.$emit("update:userReacted", this.userReactedData);
        },
        onClick(event) {
            if (this.behavior) this.toggle();
            this.$emit("click", event);
        }
    }
};

export default Reaction;
</script>
