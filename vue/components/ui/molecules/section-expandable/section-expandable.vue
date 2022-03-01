<template>
    <div class="section-expandable">
        <div class="header" v-on:click="onSectionClick">
            <div class="title" v-if="title">
                <slot name="title">
                    {{ title }}
                </slot>
            </div>
            <icon
                v-bind:icon="expanded ? 'chevron-up' : 'chevron-down'"
                v-bind:color="'#c2c7cc'"
                v-bind:width="20"
                v-bind:height="20"
            />
        </div>
        <div class="content" ref="content">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/colors.scss";

.section-expandable {
    border-top: 1px solid $light-white;
    padding-bottom: 24px;
    padding-top: 24px;
}

.section-expandable > .header {
    display: flex;
}

.section-expandable > .header > .title {
    color: $black;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.35px;
    text-transform: uppercase;
}

.section-expandable > .header > .icon {
    margin-left: auto;
}

.section-expandable > .content > .description:first-child,
.section-expandable > .content > .form-input:first-child {
    margin-top: 30px;
}

.section-expandable > .content > .form-input,
.section-expandable > .content > .description {
    margin-bottom: 0px;
    margin-top: 24px;
}

.section-expandable > .content {
    max-height: 0px;
    overflow: hidden;
    transition: max-height 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>

<script>
export const SectionExpandable = {
    name: "section-expandable-ripe",
    data: function() {
        return {
            expanded: false,
            expandedHeight: null
        };
    },
    props: {
        title: {
            type: String,
            default: null
        }
    },
    mounted: function() {
        this.calculateOffsetHeight();
    },
    methods: {
        calculateOffsetHeight() {
            const content = this.$refs.content;

            if (content && this.expandedHeight === null) {
                content.style.maxHeight = "none";
                try {
                    this.expandedHeight = content.offsetHeight;
                } finally {
                    content.style.maxHeight = "0px";
                }
            }
        },
        onSectionClick() {
            this.expanded = !this.expanded;
            const content = this.$refs.content;

            if (content && this.expanded) {
                content.style.maxHeight = `${this.expandedHeight}px`;
            } else if (content) {
                content.style.maxHeight = "0px";
            }
        }
    }
};

export default SectionExpandable;
</script>
