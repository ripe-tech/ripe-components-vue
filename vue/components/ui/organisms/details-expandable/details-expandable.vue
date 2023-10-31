<template>
    <div class="details-expandable">
        <div v-for="(section, sectionName, index) in data" v-bind:key="index">
            <h2>{{ sectionName }}</h2>
            <div class="details-expandable-row" v-for="(value, name, subIndex) in section" :key="subIndex">
                <slot :fieldName="capitalizeName(name)" :fieldValue="value"></slot>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.details-expandable {
    padding: 0px 16px 0px 16px;
}
</style>
<script>
export const DetailsExpandable = {
    name: "details-expandable-ripe",
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        capitalizeName(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
    }
};

export default DetailsExpandable;
</script>
