<template>
    <div class="details-expandable">
        <div v-bind:class="isExpanded[sectionName] ? 'details-expandable-section-show' : 'details-expandable-section-hide'" v-for="(section, sectionName, index) in data" v-bind:key="index">
            <h2 class="details-expandable-header" v-on:click="toggleSection(sectionName)">{{ sectionName }}</h2>
            <div class="details-expandable-row" v-for="(value, name, subIndex) in section" v-bind:key="subIndex">
                <label-ripe class="details-expandable-title" v-bind:text="capitalizeName(name)" v-bind:font-size="labelFontSize" />
                <div class="details-expandable-value">
                    <slot v-bind:name="sectionName + '-' + name" v-bind:field-value="value" />
                </div>
            </div>
            <icon class="details-expandable-caret" v-bind:icon="isExpanded[sectionName] ? 'chevron-up' : 'chevron-down'" />
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
    height: 25px;
    overflow: hidden;
    position: relative;
}

.details-expandable-section-show {
    height: auto;
    overflow: visible;
    position: relative;
}

.details-expandable-header {
    color: #0d0d0d;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    cursor: pointer;
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
        const initialIsExpanded = {};
        for (const sectionName in this.data) {
            initialIsExpanded[sectionName] = false;
        }

        return {
            isExpanded: initialIsExpanded
        };
    },
    methods: {
        capitalizeName(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
        toggleSection(sectionName) {
            this.isExpanded[sectionName] = !this.isExpanded[sectionName];
        }
    }
};

export default DetailsExpandable;
</script>
