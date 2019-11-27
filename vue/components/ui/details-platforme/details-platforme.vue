<template>
    <container-platforme class="details-platforme">
        <div class="container-header">
            <div class="header-buttons">
                <slot name="header-buttons">
                    <span class="button-stats" v-on:click="onStatsClick">
                        <img src="~./assets/stats.svg" />
                    </span>
                    <span class="button-previous" v-on:click="onPreviousClick">
                        <img src="~./assets/chevron-left.svg" />
                    </span>
                    <span class="button-next" v-on:click="onNextClick">
                        <img src="~./assets/chevron-right.svg" />
                    </span>
                    <span class="button-refresh" v-on:click="onRefreshClick">
                        <img src="~./assets/refresh.svg" />
                    </span>
                    <span
                        class="button-options"
                        v-bind:class="{ active: optionsVisible }"
                        v-if="optionsItems.length > 0"
                        v-on:click.stop="options"
                    >
                        <img src="~./assets/options.svg" />
                        <dropdown-platforme
                            v-bind:items="optionsItems"
                            v-bind:visible.sync="optionsVisible"
                            v-on:item-clicked="onOptionsItemClick"
                        />
                    </span>
                </slot>
            </div>
            <h1 class="title">{{ title }}</h1>
            <div class="header-center">
                <slot name="header-center" />
            </div>
        </div>
        <div class="details">
            <div class="details-column details-column-image" v-if="imageUrl">
                <lightbox-platforme
                    class="image"
                    v-bind:visible="lightBoxVisible"
                    v-bind:image="imageUrl"
                    v-on:click="onLightboxClick"
                    v-on:close="onLightboxClose"
                />
                <slot name="image-footer" />
            </div>
            <div class="details-column" v-for="column in columns" v-bind:key="column">
                <slot v-bind:name="value" v-for="value in getColumnValues(column - 1)" />
            </div>
        </div>
    </container-platforme>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.details-platforme .container-header {
    font-size: 0px;
    padding: 24px 24px 20px 24px;
    text-align: left;
}

.details-platforme {
    min-height: 430px;
}

.details-platforme .header-buttons {
    float: right;
    font-size: 0px;
    margin-top: -12px;
    user-select: none;
}

.details-platforme .header-buttons > span {
    border-radius: 36px 36px 36px 36px;
    cursor: pointer;
    display: inline-block;
    font-size: 24px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    transition: background-color 0.1s ease-in-out, opacity 0.05s ease-in-out;
    user-select: none;
    vertical-align: middle;
    width: 36px;
}

.details-platforme .header-buttons > span:hover {
    background-color: #f2f2f2;
}

.details-platforme .header-buttons > span.active,
.details-platforme .header-buttons > span:active {
    background-color: #e2e2e2;
}

.details-platforme .header-buttons > span > img {
    opacity: 0.5;
}

.details-platforme .header-buttons > span:hover > img {
    opacity: 1;
}

.details-platforme .button-options ::v-deep .dropdown-platforme {
    font-size: 13px;
    left: auto;
    margin-left: -142px;
    margin-top: 6px;
    min-width: 180px;
    text-align: left;
}

.details-platforme .button-options ::v-deep .dropdown-platforme > .dropdown-item {
    line-height: 32px;
}

.details-platforme .title {
    color: $lower-color;
    display: inline-block;
    font-size: 26px;
    font-weight: 500;
    letter-spacing: 0.5px;
    line-height: 34px;
    margin: 0px 0px 0px 0px;
    text-align: left;
    width: 40%;
}

.details-platforme .header-center {
    display: inline-block;
    font-size: 0px;
    vertical-align: top;
    width: 30%;
}

.details-platforme .details {
    font-size: 0px;
    padding: 0px 24px 40px 24px;
    text-align: left;
}

.details-platforme .details-column {
    box-sizing: border-box;
    display: inline-block;
    padding: 20px 20px 0px 0px;
    vertical-align: top;
    width: 15%;
}

.details-platforme .details-column.details-column-image {
    padding: 0px 10% 0px 0px;
    text-align: center;
    width: 40%;
}

.details-platforme .details-column:last-child {
    padding-right: 0px;
}

.details-platforme .details-column .image {
    display: block;
    height: 250px;
    margin: 0px auto 0px auto;
    max-height: 250px;
    max-width: 100%;
    object-fit: contain;
    width: auto;
}
</style>

<script>
export const DetailsPlatforme = {
    name: "details-platforme",
    props: {
        title: {
            type: String,
            required: true
        },
        columns: {
            type: Number,
            default: 4
        },
        values: {
            type: Array,
            required: true
        },
        imageUrl: {
            type: String,
            default: null
        },
        optionsItems: {
            type: Array,
            default: () => []
        }
    },
    data: function() {
        return {
            optionsVisible: false,
            lightBoxVisible: false
        };
    },
    methods: {
        getValueColumn(valueIndex) {
            return valueIndex % this.columns;
        },
        getColumnValues(columnIndex) {
            return this.values.filter((value, index) => this.getValueColumn(index) === columnIndex);
        },
        async options() {
            const status = this.optionsVisible;
            document.body.click();
            this.optionsVisible = !status;
        },
        onOptionsItemClick(item) {
            this.$emit(`click:${item.event}`);
        },
        onLightboxClick() {
            this.lightBoxVisible = true;
        },
        onLightboxClose() {
            this.lightBoxVisible = false;
        },
        onStatsClick() {
            this.$emit("click:stats");
        },
        onPreviousClick() {
            this.$emit("click:previous");
        },
        onNextClick() {
            this.$emit("click:next");
        },
        onRefreshClick() {
            this.$emit("click:refresh");
        }
    }
};

export default DetailsPlatforme;
</script>
