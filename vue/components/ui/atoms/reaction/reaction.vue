<template>
    <div class="reaction" v-bind:class="{ 'user-reacted': userReacted }" v-on:click="onClick">
        <img class="image" v-bind:src="imageSrc" v-if="hasImage" />
        <div class="emoji" v-else>
            {{ emoji }}
        </div>
        <div class="reaction-counter" v-if="hasReactions">
            {{ count }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.reaction {
    background-color: $lighter-grey;
    border: 1.5px solid transparent;
    border-radius: 24px;
    cursor: pointer;
    display: inline-block;
    font-size: 0px;
    padding: 2px 6px 2px 6px;
    text-align: center;
    transition: transform 0.02s, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    user-select: none;
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

.reaction > .image,
.reaction > .emoji {
    vertical-align: middle;
}

.reaction > .image {
    height: 15px;
    width: 15px;
}

.reaction > .emoji {
    display: inline-block;
    font-size: 15px;
    line-height: 15px;
}

.reaction .reaction-counter {
    color: $black;
    display: inline-block;
    font-size: 11px;
    line-height: 15px;
    padding: 0px 2px 0px 3px;
    vertical-align: middle;
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
            mandatory: true
        },
        userReacted: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        imageSrc() {
            return this.icon ? this.iconPath : this.imgUrl;
        },
        iconPath() {
            return require(`./../../../../assets/icons/black/${this.icon}.svg`);
        },
        hasReactions() {
            return this.count > 0;
        },
        hasImage() {
            return Boolean(this.imageSrc);
        },
        hasEmoji() {
            return Boolean(this.emoji);
        },
        hasCount() {
            return Boolean(this.count);
        }
    },
    methods: {
        onClick() {
            this.$emit("click", this.id);
        }
    }
};

export default Reaction;
</script>
