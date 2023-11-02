<template>
    <div class="details-expandable">
        <div v-bind:class="isExpanded[index] ? 'details-expandable-section-show' : 'details-expandable-section-hide'" v-for="(section, sectionName, index) in data" v-bind:key="index" v-on:click="toggleSection(index)">
            <h2 class="details-expandable-header">{{ sectionName }}</h2>
            <div class="details-expandable-row" v-for="(value, name, subIndex) in section" v-bind:key="subIndex">
                <label-ripe class="details-expandable-title" v-bind:text="capitalizeName(name)" v-bind:font-size="labelFontSize" />
                <div class="details-expandable-value">
                    <slot v-bind:field-value="value" />
                </div>
            </div>
            <icon class="details-expandable-caret" v-bind:icon="isExpanded[index] ? 'chevron-up' : 'chevron-down'" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.details-expandable {
    padding: 0px 16px 0px 16px;
}

.details-expandable-caret {
    height: 24px;
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
}

.details-expandable-section-hide {
    cursor: pointer;
    height: 25px;
    margin-top: 35px;
    overflow: hidden;
    position: relative;
}

.details-expandable-section-show {
    cursor: pointer;
    height: auto;
    overflow: visible;
}

.details-expandable-header {
    color: #0d0d0d;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.6px;
    text-transform: uppercase;
}

.details-expandable-title {
    color: #57626e;
}

.details-expandable-value {
    margin-top: 10px;
}

.details-expandable-row {
    margin-top: 25px;
}

</style>
<script>
export const DetailsExpandable = {
    name: "details-expandable-ripe",
    props: {
        data: {
            type: Object,
            required: true
        },
        labelFontSize: {
            type: Number,
            default: null
        }
    },
    data: function() {
        return {
            isExpanded: []
        };
    },

    mounted: function() {
        this.isExpanded = new Array(Object.keys(this.data).length).fill(false);
    },
    methods: {
        capitalizeName(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
        toggleSection(index) {
            this.isExpanded[index] = !this.isExpanded[index];
        }
    }
};

export default DetailsExpandable;
</script>
