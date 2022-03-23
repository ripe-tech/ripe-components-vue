<template>
    <div class="bar-chart">
        <div
            class="bars"
            v-bind:style="getBarHeight(index)"
            v-for="(value, index) in values"
            v-bind:key="index"
        />
    </div>
</template>

<style lang="scss" scoped>
.bar-chart {
    align-items: baseline;
    background-color: blue;
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-evenly;
    width: 100%;
}

.bar-chart > .bars {
    background-color: red;
    height: 1px;
    width: 15px;
}
</style>

<script>
export const BarChart = {
    name: "bar-chart",
    props: {
        values: {
            type: Array,
            default: () => [
                { label: 7, value: 4 },
                { label: 27, value: 44 }
            ]
        }
    },
    data: function() {
        return {
            height: null,
            greaterValue: null
        };
    },
    mounted: async function() {
        const height = document.getElementsByClassName("bar-chart")[0]?.offsetHeight;
        this.height = height;
        this.greaterValue = this.values.reduce((a, b) => (a.value > b.value ? a : b));
        console.log("this.height", this.height);
        console.log("this.greaterValue", this.greaterValue);
    },
    computed: {},
    watch: {},
    methods: {
        getBarHeight(index) {
            if (!this.height && !this.greaterValue) return {};
            const height =
                this.values[index].value === this.greaterValue.value
                    ? this.height
                    : this.height * (this.values[index].value / this.greaterValue.value);
            const base = {
                height: `${parseInt(height)}px`
            };
            return base;
        }
    }
};

export default BarChart;
</script>
