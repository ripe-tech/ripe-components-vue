<template>
    <div class="reaction-icon-container"
    v-on:click="handleClick"
    >
        <span class="reaction-icon" v-if="iconSrc || emoji">
            <img
                class="reaction-image"
                v-bind:src="iconSrc"
                v-if="iconSrc"
            >
            <p class="emoji" v-else>{{emoji}}</p>
        </span>
        <span class="reaction-count" v-bind:class="{'show-count': showCount}">
            {{count}}
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.reaction-icon-container {
    text-align: center;
    white-space: nowrap;
    display: inline-block;
    cursor: pointer;
    font-size: 0px;
    padding: 2px 6px 2px 6px;
    transition: background-color 0.15s ease-in-out;
    user-select: none;
    background-color: #EFEFEF;
    border: 1px solid transparent;
    transition: transform 0.15s ease-in-out;
    transition: max-width .125s ease-in-out;
    height: 15px;
    border-radius: 24px;
}

.reaction-icon-container:active {
    transform: scale(0.94);
}

.reaction-icon {
    display: inline-block;
    height: 15px;
    width: 15px;
}

.reaction-image {
    font-size: 0px;
    transition: background-color 0.15s ease-in-out;
    user-select: none;
    pointer-events: none;
    height: 15px;
    width: 15px;
}

.reaction-icon-container:hover {
    border-color: #B7B7B7;
    background-color: $white;
}

.emoji {
    display: inline;
    font-size: 15px;
    line-height: 15px;
}

.reaction-count:not(.show-count) {
    max-width: 0px;
    opacity: 0;
    padding: 0px 0px 0px 0px;
}

.reaction-count {
    max-width: 150px;
    overflow: hidden;
    font-size: 11px;
    color: $black;
    display: inline-block;
    pointer-events: none;
    transition: all .125s ease-in-out;
    opacity: 1;
    padding: 0px 2px 0px 3px;
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
            console.log("returning",(this.icon ? this.iconPath : this.imgUrl));
            return (this.icon ? this.iconPath : this.imgUrl);
        },        
        iconPath() {
            return require(`./../../../assets/icons/black/${this.icon}.svg`);
        },
        classes() {
            const base = {};
            if (this.color) base["reaction-icon-" + this.color] = this.color;
            return base;
        },
        showCount(){
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
