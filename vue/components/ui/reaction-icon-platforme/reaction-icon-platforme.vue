<template>
    <div class="reaction-icon-container">
        <span class="reaction-icon">
            <img
                class="reaction-image"
                v-bind:src="iconSrc"
                v-on:click="handleClick"
            >
            <p class="emoji" v-if="emoji && (!icon && !imgUrl)">{{emoji}}</p>
        </span>
        <span class="reaction-count">
            {{count}}
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.reaction-icon-container {
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    display: inline-block;
    cursor: pointer;
    font-size: 0px;
    padding: 4px 6px 4px 6px;
    transition: background-color 0.15s ease-in-out;
    user-select: none;
    background-color: #EFEFEF;
    border: 1px solid transparent;
    transition: transform 0.15s ease-in-out;
    height: 24px;
    border-radius: 24px;
}

.reaction-icon-container:active {
    transform: scale(0.94);
}

.reaction-icon {
    display: inline-block;
}

.reaction-image {
    font-size: 0px;
    transition: background-color 0.15s ease-in-out;
    user-select: none;
    vertical-align: middle;
    pointer-events: none;
    height: 23px;
}

.reaction-icon-container:hover {
    border-color: #B7B7B7;
    background-color: $white;
}

.emoji {
    display: inline;
    vertical-align: middle;
    font-size: 20px;
}

.reaction-count {
    font-size: 11px;
    vertical-align: middle;
    color: $black;
    display: inline-block;
    pointer-events: none;
    padding: 0px 5px 0px 3px;
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
            type: String,
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
