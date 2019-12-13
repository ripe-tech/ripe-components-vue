<template>
    <div class="reaction-icon-container" v-on:click="handleClick">
        <span class="reaction-icon" v-if="iconSrc || emoji">
            <img class="reaction-image" v-bind:src="iconSrc" v-if="iconSrc" />
            <p class="emoji" v-else>{{ emoji }}</p>
        </span>
        <span class="reaction-count" v-bind:class="{ 'show-count': showCount }">
            {{ count }}
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.reaction-icon-container {
    background-color: #efefef;
    border: 1px solid transparent;
    border-radius: 24px;
    cursor: pointer;
    display: inline-block;
    font-size: 0px;
    height: 15px;
    padding: 2px 6px 2px 6px;
    text-align: center;
    user-select: none;
    white-space: nowrap;
}

.reaction-icon-container:hover {
    background-color: $white;
    border-color: #b7b7b7;
}

.reaction-icon-container:active {
    transform: scale(0.94);
}

.reaction-icon {
    display: inline-block;
    height: 15px;
    width: 15px;
}

.reaction-icon .reaction-image {
    font-size: 0px;
    height: 15px;
    pointer-events: none;
    transition: background-color 0.15s ease-in-out;
    user-select: none;
    width: 15px;
}

.reaction-icon .emoji {
    display: inline;
    font-size: 15px;
    line-height: 15px;
}

.reaction-count {
    color: $black;
    display: inline-block;
    font-size: 11px;
    max-width: 150px;
    opacity: 1;
    overflow: hidden;
    padding: 0px 2px 0px 3px;
    pointer-events: none;
    transition: all 0.125s ease-out 0s;
}

.reaction-count:not(.show-count) {
    max-width: 0px;
    opacity: 0;
    padding: 0px 0px 0px 0px;
}
</style>

<script>
export const ReactionIconPlatforme = {
    name: "reaction-icon-platforme",
    props: {
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
            default: 28
        }
    },
    computed: {
        iconSrc() {
            console.log("returning", this.icon ? this.iconPath : this.imgUrl);
            return this.icon ? this.iconPath : this.imgUrl;
        },
        iconPath() {
            return require(`./../../../assets/icons/black/${this.icon}.svg`);
        },
        showCount() {
            return this.count > 1;
        }
    },
    methods: {
        handleClick() {
            this.$emit("click");
        }
    }
};

export default ReactionIconPlatforme;
</script>
