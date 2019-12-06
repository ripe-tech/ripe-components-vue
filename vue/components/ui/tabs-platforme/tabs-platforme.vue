<template>
    <div class="tabs">
        <div class="header">
            <div
                class="tab-label"
                v-bind:class="{ active: isTabActive(index), disabled: tab.disabled }"
                tabindex="0"
                v-for="(tab, index) in tabs"
                v-bind:key="tab.id"
                v-on:click="onClick(index)"
                v-on:keydown.13="onEnter(index)"
            >
                {{ tab.title || tab.id }}
            </div>
        </div>
        <div class="tabs-container" v-bind:style="{ height: `${height}px` }">
            <div
                class="tab"
                v-bind:class="{ visible: isTabActive(index) }"
                v-for="(tab, index) in tabs"
                v-bind:key="tab.id"
                v-bind:ref="`tab-${index}`"
            >
                <slot v-bind:name="tab.id" v-bind:index="index">
                    <p v-if="tab.text">
                        {{ tab.text }}
                    </p>
                </slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.tabs > .header {
    border-bottom: 2px solid $light-grey;
}

.tabs > .header > .tab-label {
    border-bottom: 2px solid transparent;
    color: $grey;
    cursor: pointer;
    display: inline-block;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.75px;
    line-height: 28px;
    margin-bottom: -2px;
    max-width: 200px;
    min-height: 28px;
    padding: 0px 25px 0px 25px;
    text-transform: uppercase;
    transition: color 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        border-color 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
}

.tabs > .header > .tab-label.active {
    border-bottom-color: $dark-blue;
    color: $dark-blue;
}

.tabs > .header > .tab-label:focus {
    outline: none;
}

.tabs > .header > .tab-label:focus,
.tabs > .header > .tab-label:hover {
    border-bottom-color: $dark-blue;
    color: $dark-blue;
}

.tabs > .header > .tab-label.disabled,
.tabs > .header > .tab-label.disabled:hover {
    border-bottom-color: transparent;
    color: $light-grey;
    cursor: default;
}

.tabs > .tabs-container {
    position: relative;
}

.tabs > .tabs-container > .tab {
    box-sizing: border-box;
    opacity: 0;
    padding: 15px 15px 15px 15px;
    position: absolute;
    transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
}

.tabs > .tabs-container > .tab.visible {
    opacity: 1;
}
</style>

<script>
export const TabsPlatforme = {
    name: "tabs-platforme",
    props: {
        tabs: {
            type: Array,
            required: true
        },
        initialTab: {
            type: Number,
            default: 0
        },
        initialHeight: {
            type: Number,
            default: 0
        }
    },
    data: function() {
        return {
            currentTab: this.initialTab,
            height: this.initialHeight
        };
    },
    mounted: function() {
        this._updateHeight();
    },
    methods: {
        selectTab(index) {
            if (this.tabs[index].disabled) return;
            if (this.currentTab === index) return;
            this.currentTab = index;
            this._updateHeight();
            this.$emit("update:tab", this.tabs[this.currentTab], this.currentTab);
        },
        isTabActive(index) {
            return index === this.currentTab;
        },
        onEnter(index) {
            this.selectTab(index);
        },
        onClick(index) {
            this.selectTab(index);
        },
        _updateHeight() {
            const tab = (this.$refs[`tab-${this.currentTab}`] || [])[0];
            if (!tab) return this.initialHeight;
            const style = tab.style;
            const marginTop = parseInt(style.marginTop) || 0;
            const marginBottom = parseInt(style.marginBottom) || 0;
            const height = parseInt(tab.offsetHeight);
            this.height = height + marginTop + marginBottom;
        }
    }
};

export default TabsPlatforme;
</script>
