<template>
    <div class="details-expandable">
        <div class="details-expandable-section" v-for="(section, sectionName, index) in data" v-bind:key="index">
            <h2 class="details-expandable-header">{{ sectionName }}</h2>
            <div class="details-expandable-row" v-for="(value, name, subIndex) in section" :key="subIndex">
                <label-ripe class="details-expandable-title" v-bind:text='capitalizeName(name)' v-bind:font-size="labelFontSize"></label-ripe>
                <div class="details-expandable-value">
                    <slot :fieldValue="value"></slot>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.details-expandable {
    padding: 0px 16px 0px 16px;
}

.details-expandable-section {
    margin-top: 35px;
}
.details-expandable-header {
    font-size: 12px;
    color: #0d0d0d;
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
        },
        },
        methods: {
            capitalizeName(name) {
                return name.charAt(0).toUpperCase() + name.slice(1);
            }
        }
};

export default DetailsExpandable;
</script>
