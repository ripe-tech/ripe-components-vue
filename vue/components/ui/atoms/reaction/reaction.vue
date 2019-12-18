<template>
    <div
        class="reaction"
        v-bind:class="{ 'user-reacted': userReacted, 'hidden-counter': hideenCounter }"
        v-if="hasReactions"
        v-on:click="handleClick"
    >
        <span class="reaction-figure" v-if="hasFigure">
            <img class="image" v-bind:src="imageSrc" v-if="hasImage" />
            <span class="emoji" v-else>{{ emoji }}</span>
        </span>
        <span class="reaction-counter">
            {{ count }}
        </span>
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
    height: 15px;
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

.reaction .reaction-figure {
    display: inline-block;
    height: 15px;
    overflow: hidden;
    vertical-align: bottom;
    width: 15px;
}

.reaction .reaction-figure .image {
    font-size: 0px;
    height: 15px;
    pointer-events: none;
    user-select: none;
    width: 15px;
}

.reaction .reaction-figure .emoji {
    display: inline-block;
    font-size: 15px;
    line-height: 16px;
}

.reaction .reaction-counter {
    color: $black;
    display: inline-block;
    font-size: 11px;
    max-width: 150px;
    opacity: 1;
    overflow: hidden;
    padding: 0px 2px 0px 3px;
    pointer-events: none;
    transition: max-width 0.125s ease-in-out, padding 0.125s ease-in-out, opacity ease-in 0.125s;
}

.reaction.hidden-counter .reaction-counter {
    max-width: 0px;
    opacity: 0;
    padding: 0px 0px 0px 0px;
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
            return this.count > 0 && (this.hasFigure || (this.hasCount && !this.hideenCounter));
        },
        hasImage() {
            return Boolean(this.icon || this.imgUrl);
        },
        hasFigure() {
            return Boolean(this.hasImage || this.emoji);
        },
        hasCount() {
            return Boolean(this.count);
        },
        hideenCounter() {
            return this.count < 2 && this.hasFigure;
        }
    },
    methods: {
        handleClick() {
            this.$emit("click", this.id);
        }
    }
};

export default Reaction;
</script>
