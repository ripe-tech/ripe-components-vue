<template>
    <div class="details-platforme">
        <container-platforme class="loading" v-if="!loaded">
            <div class="container-header">
                <h1 class="title" v-if="invalid">{{ invalidTitle }}</h1>
                <h1 class="title" v-else>{{ title }}</h1>
            </div>
            <h1 class="order-invalid" v-if="invalid">
                {{ invalidMsg }}
            </h1>
            <loader-platforme loader="line-scale" v-bind:count="5" v-else />
        </container-platforme>
        <container-platforme class="details-container" v-bind:class="{ invisible: !loaded }">
            <div class="container-header">
                <div class="header-buttons">
                    <slot name="header-buttons">
                        <div class="header-button">
                            <span class="button-stats" v-on:click="onStatsClick">
                                <img src="~./assets/stats.svg" />
                            </span>
                            <p>Orders</p>
                        </div>
                        <div class="header-button">
                            <span class="button-previous" v-on:click="onPreviousClick">
                                <img src="~./assets/chevron-left.svg" />
                            </span>
                            <p>Previous</p>
                        </div>
                        <div class="header-button">
                            <span class="button-next" v-on:click="onNextClick">
                                <img src="~./assets/chevron-right.svg" />
                            </span>
                            <p>Next</p>
                        </div>
                        <div class="header-button">
                            <span class="button-refresh" v-on:click="onRefreshClick">
                                <img src="~./assets/refresh.svg" />
                            </span>
                            <p>Refresh</p>
                        </div>
                        <div
                            class="header-button"
                            v-bind:class="{
                                invisible: optionsItems.length === 0 && loaded !== false
                            }"
                        >
                            <span
                                class="button-options"
                                v-bind:class="{ active: optionsVisible }"
                                v-on:click.stop="options"
                            >
                                <img src="~./assets/options.svg" />
                                <dropdown-platforme
                                    v-bind:items="optionsItems"
                                    v-bind:visible.sync="optionsVisible"
                                    v-on:item-clicked="onOptionsItemClick"
                                />
                            </span>
                            <p>Status</p>
                        </div>
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
                    <slot v-bind:name="value.id" v-for="value in getColumnValues(column - 1)">
                        <div
                            class="label-value"
                            v-bind:class="[value.id, `label-value-${value.id}`]"
                            v-bind:key="value.id"
                        >
                            <div class="label-value-component label">
                                <slot v-bind:name="`label-${value.id}`">
                                    <p class="label-text">
                                        <slot v-bind:name="`label-${value.id}-text`">
                                            {{ value.label || value.id | capitalize || value.name }}
                                        </slot>
                                    </p>
                                </slot>
                            </div>
                            <div class="label-value-component value">
                                <slot v-bind:name="`value-${value.id}`">
                                    <p class="value-text">
                                        <slot v-bind:name="`value-${value.id}-text`">
                                            {{ item[value.value] || item[value.id] || "-" }}
                                        </slot>
                                    </p>
                                </slot>
                            </div>
                            <div class="label-value-component note">
                                <slot v-bind:name="`note-${value.id}`">
                                    <p
                                        class="note-text"
                                        v-if="value.note || $slots[`note-${value.id}-text`]"
                                    >
                                        <slot v-bind:name="`note-${value.id}-text`">
                                            {{ item[value.note] }}
                                        </slot>
                                    </p>
                                </slot>
                            </div>
                        </div>
                    </slot>
                </div>
            </div>
        </container-platforme>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.container-platforme.loading {
    min-height: 430px;
}

.container-platforme .container-header {
    font-size: 0px;
    padding: 24px 24px 20px 24px;
    text-align: left;
}

body.tablet .container-platforme .container-header,
body.mobile .container-platforme .container-header {
    padding: 20px 15px 17px 15px;
}

.container-platforme.loading .container-header .title {
    margin: 0px 0px 0px 0px;
}

body.tablet .container-platforme,
body.mobile .container-platforme {
    border: none;
    border-bottom: 1px solid #f2f2f2;
    border-top: 1px solid #f2f2f2;
    box-shadow: none;
    margin: 0px 0px 0px 0px;
}

.loader,
.order-invalid {
    border-top: 1px solid transparent;
    height: 38px;
    line-height: 38px;
    margin: 0px 0px 0px 0px;
    padding-top: 140px;
}

.details-container.invisible {
    border-width: 0px 0px 0px 0px;
    height: 0px;
    margin: 0px 0px 0px 0px;
    min-height: 0px;
    padding: 0px 0px 0px 0px;
    visibility: hidden;
    width: 0px;
}

body.tablet .details-container.invisible ::v-deep .header-buttons,
body.mobile .details-container.invisible ::v-deep .header-buttons {
    visibility: visible;
}

.details-container {
    min-height: 430px;
}

body.tablet .details,
body.mobile .details {
    padding: 0px 0px 0px 0px;
}

.details-container .header-buttons {
    float: right;
    font-size: 0px;
    margin-top: -12px;
    user-select: none;
}

body.tablet .details-container .header-buttons,
body.mobile .details-container .header-buttons {
    animation: none;
    background-color: #ffffff;
    border-top: 1px solid #e4e8f0;
    bottom: 0px;
    display: flex;
    left: 0px;
    position: fixed;
    text-align: justify;
    transition: none;
    width: 100%;
    z-index: 10;
}

.details-container .header-buttons > div {
    display: inline-block;
}

.details-container .header-buttons span {
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

.details-container .header-buttons span:hover {
    background-color: #f2f2f2;
}

.details-container .header-buttons span.active,
.details-container .header-buttons span:active {
    background-color: #e2e2e2;
}

.details-container .header-buttons span > img {
    opacity: 0.5;
}

.details-container .header-buttons span:hover > img {
    opacity: 1;
}

.header-buttons > .header-button > p {
    display: none;
}

body.tablet .header-buttons > .header-button,
body.mobile .header-buttons > .header-button {
    display: inline-block;
    flex: auto;
    margin: 8px 0px 8px 0px;
    text-align: center;
}

body.tablet .header-buttons > .header-button.invisible,
body.mobile .header-buttons > .header-button.invisible {
    opacity: 0;
}

body.tablet .header-buttons > .header-button > p,
body.mobile .header-buttons > .header-button > p {
    color: #57626e;
    display: block;
    font-size: 11px;
    letter-spacing: 0.28px;
    margin: 0px 0px 0px 0px;
}

body.tablet .header-buttons > .header-button > span > img,
body.mobile .header-buttons > .header-button > span > img {
    height: 20px;
    width: 20px;
}

body.tablet .order-dates,
body.mobile .order-dates {
    display: none;
}

.details-container .button-options ::v-deep .dropdown-platforme {
    font-size: 13px;
    left: auto;
    margin-left: -142px;
    margin-top: 6px;
    min-width: 180px;
    text-align: left;
}

body.tablet .button-options ::v-deep .dropdown-platforme,
body.mobile .button-options ::v-deep .dropdown-platforme {
    bottom: 40px;
    margin: 0px 0px 0px 0px;
    right: 0;
}

.details-container .button-options ::v-deep .dropdown-platforme > .dropdown-item {
    line-height: 32px;
}

.container-platforme .title {
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

body.tablet .container-platforme .title,
body.mobile .container-platforme .title {
    width: 100%;
}

.details-container .header-center {
    display: inline-block;
    font-size: 0px;
    vertical-align: top;
    width: 30%;
}

.details-container .details {
    font-size: 0px;
    padding: 0px 24px 40px 24px;
    text-align: left;
}

.details-container .details-column {
    box-sizing: border-box;
    display: inline-block;
    padding: 20px 20px 0px 0px;
    vertical-align: top;
    width: 15%;
}

body.tablet .details-container .details-column,
body.mobile .details-container .details-column {
    padding: 0px 0px 0px 20px;
    text-align: center;
    width: 50%;
}

body.tablet .details-container .details-column .order-report,
body.mobile .details-container .details-column .order-report {
    background-color: #1d2631;
    border-radius: 6px;
    box-sizing: border-box;
    margin: 5px 0px 25px 0px;
    padding: 18px 14px 18px 14px;
    width: 100%;
}

.details-container .details-column.details-column-image {
    padding: 0px 10% 0px 0px;
    text-align: center;
    width: 40%;
}

body.tablet .details-column.details-column-image,
body.mobile .details-column.details-column-image {
    padding: 0px 0px 0px 0px;
    width: 100%;
}

.details-container .details-column:last-child {
    padding-right: 0px;
}

.details-container .details-column .image {
    display: block;
    height: 250px;
    margin: 0px auto 0px auto;
    max-height: 250px;
    max-width: 100%;
    object-fit: contain;
    width: auto;
}

.details-container .label-value {
    font-weight: 600;
    max-width: 100%;
    overflow: hidden;
    text-align: left;
    text-transform: uppercase;
}

.details-container .details-column .label-value {
    min-height: 100px;
}

body.tablet .details-container .details-column .label-value,
body.mobile .details-container .details-column .label-value {
    height: 80px;
    margin-top: 30px;
    min-height: unset;
    overflow: hidden;
}

.details-container .details-column .label-value:last-child {
    min-height: auto;
}

.details-container ::v-deep .label-value .label-value-component > p {
    margin: 0px 0px 0px 0px;
}

.details-container ::v-deep .label-value .label {
    color: $label-color;
    font-size: 12px;
    margin: 0px 0px 6px 0px;
}

.details-container ::v-deep .label-value .value {
    font-size: 14px;
    line-height: 18px;
    margin: 6px 0px 0px 0px;
    word-break: break-all;
    word-break: break-word;
}

.details-container ::v-deep .label-value .note {
    color: $label-color;
    font-size: 11px;
    line-height: 16px;
    margin-bottom: 0px;
    margin-top: 2px;
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
        },
        item: {
            type: Object,
            required: true
        },
        loaded: {
            type: Boolean,
            default: null
        },
        id: {
            type: Number,
            default: null
        },
        invalid: {
            type: Boolean,
            default: null
        },
        invalidTitle: {
            type: String,
            default: "Order not found"
        },
        invalidMsg: {
            type: String,
            default: "Our apologies, it looks like this order doesn't exist"
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
