<template>
    <div class="section-expandable">
        <p>mequie</p>
        <div class="title" v-if="title">
            <slot name="title">
                {{ title }}
            </slot>
        </div>
        <p>vivvas</p>
        <icon
            v-bind:icon="isExpanded ? 'chevron-up' : 'chevron-down'"
            v-bind:color="'#c2c7cc'"
            v-bind:width="20"
            v-bind:height="20"
        />
        <div class="content" v-if="isExpanded">
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

.section-expandable > .title {
    color: $black;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.35px;
    margin-bottom: 30px;
    text-transform: uppercase;
}

.section-expandable > .content > .form-input,
.section-expandable > .description {
    margin-bottom: 24px;
    margin-top: 0px;
}

.section-expandable > .content > .form-input:last-child,
.section-expandable > .description:last-child {
    margin-bottom: 0px;
}
</style>

<script>
export const SectionExpandable = {
    name: "section-expandable-ripe",
    data: function() {
        return {
            isExpanded: false
        };
    },
    props: {
        title: {
            type: String,
            default: null
        },
        items: {
            type: Array,
            default: () => []
        }
    }
};

export default SectionExpandable;
</script>
