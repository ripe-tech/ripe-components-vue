<template>
    <div class="details">
        <global-events
            v-on:keydown.j="onKeyJ"
            v-on:keydown.k="onKeyK"
            v-on:keydown.left="onKeyLeft"
            v-on:keydown.right="onKeyRight"
        />
        <container-ripe class="loading" v-if="isLoading">
            <template v-slot:header>
                <slot name="title" v-if="isLoaded">
                    <breadcrumbs
                        v-bind:font-size="breadcrumbsFontSize"
                        v-bind:separator="breadcrumbsSeparator"
                        v-bind:breadcrumbs="title"
                        v-if="hasBreadcrumbs"
                    />
                    <title-ripe v-else>
                        {{ invalid ? invalidTitle : title }}
                    </title-ripe>
                </slot>
                <div class="header-buttons">
                    <slot name="header-buttons">
                        <slot name="header-buttons-before" v-if="isDesktopWidth()" />
                        <div class="header-button">
                            <span class="button-stats" v-on:click="onStatsClick">
                                <img src="~./assets/stats.svg" />
                            </span>
                            <p>{{ name }}s</p>
                        </div>
                        <div class="header-button" v-bind:class="{ invisible: !hasIndex }">
                            <span class="button-previous" v-on:click="onPreviousClick">
                                <img src="~./assets/chevron-left.svg" />
                            </span>
                            <p>Previous</p>
                        </div>
                        <div class="header-button" v-bind:class="{ invisible: !hasIndex }">
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
                                invisible: optionsItems.length === 0 || isLoading
                            }"
                        >
                            <span
                                class="button-options"
                                v-bind:class="{ active: optionsVisible }"
                                ref="button-options-loading"
                                v-on:click="toggleOptions"
                            >
                                <img src="~./assets/options.svg" />
                            </span>
                            <dropdown
                                class="options-dropdown"
                                v-bind:items="optionsItems"
                                v-bind:visible.sync="optionsVisible"
                                v-bind:owners="$refs['button-options-loading']"
                                v-on:item-clicked="onOptionsItemClick"
                            >
                                <slot
                                    v-bind:name="slot"
                                    v-for="slot in optionsSlots"
                                    v-bind:slot="slot.replace('options-', '')"
                                />
                                <template
                                    v-for="slot in optionsScopedSlots"
                                    v-bind:slot="slot.replace('options-', '')"
                                    slot-scope="scope"
                                >
                                    <slot v-bind:name="slot" v-bind="scope" />
                                </template>
                            </dropdown>
                            <p>Status</p>
                        </div>
                        <slot name="header-buttons-after" v-if="isDesktopWidth()" />
                    </slot>
                </div>
            </template>
            <h1 class="item-invalid" v-if="invalid">
                {{ invalidMessage }}
            </h1>
            <loader-logo v-else />
        </container-ripe>
        <container-ripe class="details-container" v-else>
            <slot name="details-before" />
            <template v-slot:header>
                <slot name="title" v-if="isLoaded">
                    <breadcrumbs
                        v-bind:font-size="breadcrumbsFontSize"
                        v-bind:separator="breadcrumbsSeparator"
                        v-bind:breadcrumbs="title"
                        v-if="hasBreadcrumbs"
                    />
                    <title-ripe v-else>
                        {{ title }}
                    </title-ripe>
                </slot>
                <slot name="header-extra" />
                <div class="header-buttons" v-if="headerButtons">
                    <slot name="header-buttons">
                        <slot name="header-buttons-before" v-if="isDesktopWidth()" />
                        <div class="header-button">
                            <span class="button-stats" v-on:click="onStatsClick">
                                <img src="~./assets/stats.svg" />
                            </span>
                            <p>{{ name }}s</p>
                        </div>
                        <div class="header-button" v-bind:class="{ invisible: !hasIndex }">
                            <span class="button-previous" v-on:click="onPreviousClick">
                                <img src="~./assets/chevron-left.svg" />
                            </span>
                            <p>Previous</p>
                        </div>
                        <div class="header-button" v-bind:class="{ invisible: !hasIndex }">
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
                                ref="button-options"
                                v-on:click="toggleOptions"
                            >
                                <img src="~./assets/options.svg" />
                            </span>
                            <dropdown
                                class="options-dropdown"
                                v-bind:items="optionsItems"
                                v-bind:visible.sync="optionsVisible"
                                v-bind:owners="$refs['button-options']"
                                v-on:item-clicked="onOptionsItemClick"
                            >
                                <slot
                                    v-bind:name="slot"
                                    v-for="slot in optionsSlots"
                                    v-bind:slot="slot.replace('options-', '')"
                                />
                                <template
                                    v-for="slot in optionsScopedSlots"
                                    v-bind:slot="slot.replace('options-', '')"
                                    slot-scope="scope"
                                >
                                    <slot v-bind:name="slot" v-bind="scope" />
                                </template>
                            </dropdown>
                            <p>Status</p>
                        </div>
                        <slot name="header-buttons-after" v-if="isDesktopWidth()" />
                    </slot>
                </div>
            </template>
            <div class="details" v-if="isLoaded">
                <div class="details-column details-column-image" v-if="imageUrl">
                    <lightbox
                        class="image"
                        v-bind:visible="lightBoxVisible"
                        v-bind:image="imageUrl"
                        v-on:click="onLightboxClick"
                        v-on:close="onLightboxClose"
                    />
                    <slot name="image-footer" />
                </div>
                <div
                    class="details-column"
                    v-bind:style="detailsColumnStyle"
                    v-for="column in columns"
                    v-bind:key="column"
                >
                    <slot v-bind:name="value.value" v-for="value in getColumnValues(column - 1)">
                        <div
                            class="label-value"
                            v-bind:class="[value.value, `label-value-${value.value}`]"
                            v-if="value.value"
                            v-bind:key="value.value"
                        >
                            <div class="label-value-component label">
                                <slot v-bind:name="`label-${value.value}`">
                                    <p class="label-text">
                                        <slot v-bind:name="`label-${value.value}-text`">
                                            {{ value.label || value.value || value.name }}
                                        </slot>
                                    </p>
                                </slot>
                            </div>
                            <div class="label-value-component value">
                                <slot v-bind:name="`value-${value.value}`">
                                    <p class="value-text">
                                        <slot v-bind:name="`value-${value.value}-text`">
                                            {{
                                                item[value.value] !== null &&
                                                    item[value.value] !== undefined
                                                    ? item[value.value]
                                                    : "-"
                                            }}
                                        </slot>
                                    </p>
                                </slot>
                            </div>
                            <div class="label-value-component note">
                                <slot v-bind:name="`note-${value.value}`">
                                    <p
                                        class="note-text"
                                        v-if="value.note || $slots[`note-${value.value}-text`]"
                                    >
                                        <slot v-bind:name="`note-${value.value}-text`">
                                            {{ item[value.note] }}
                                        </slot>
                                    </p>
                                </slot>
                            </div>
                        </div>
                    </slot>
                </div>
            </div>
            <slot name="details-after" />
        </container-ripe>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.details {
    padding: 0px 16px 0px 16px;
}

body.mobile .details {
    padding: 0px 0px 0px 0px;
}

.container-ripe {
    min-height: 430px;
}

.container-ripe.loading {
    min-height: 430px;
}

body.tablet .container-ripe,
body.mobile .container-ripe {
    border: none;
    border-bottom: 1px solid $lighter-grey;
    border-radius: 0px 0px 0px 0px;
    border-top: none;
    box-shadow: none;
    margin: 0px 0px 0px 0px;
}

.container-ripe .loader,
.container-ripe .loader-logo,
.container-ripe .item-invalid {
    border-top: 1px solid transparent;
    height: 38px;
    line-height: 38px;
    margin: 0px 0px 0px 0px;
    padding-top: 140px;
}

.container-ripe .loader-logo {
    padding-top: 120px;
}

body.tablet .container-ripe .header-buttons,
body.mobile .container-ripe .header-buttons {
    animation: none;
    background-color: $white;
    border-top: 1px solid $light-white;
    bottom: 0px;
    display: flex;
    left: 0px;
    position: fixed;
    text-align: justify;
    transition: none;
    width: 100%;
    z-index: 10;
}

.container-ripe .header-buttons > .header-button {
    display: inline-block;
}

body.tablet .container-ripe .header-buttons > .header-button,
body.mobile .container-ripe .header-buttons > .header-button {
    display: inline-block;
    flex: auto;
    margin: 8px 0px 8px 0px;
    text-align: center;
}

.container-ripe .header-buttons > .header-button.invisible {
    opacity: 0.2;
    pointer-events: none;
}

body.tablet .container-ripe .header-buttons > .header-button.invisible,
body.mobile .container-ripe .header-buttons > .header-button.invisible {
    display: inline-block;
}

.container-ripe .header-buttons .header-button > span {
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

.container-ripe .header-buttons .header-button > span:hover {
    background-color: $lighter-grey;
}

.container-ripe .header-buttons .header-button > span.active,
.container-ripe .header-buttons .header-button > span:active {
    background-color: $light-grey;
}

.container-ripe .header-buttons .header-button > span > img {
    opacity: 0.5;
}

body.tablet .container-ripe .header-buttons > .header-button > span > img,
body.mobile .container-ripe .header-buttons > .header-button > span > img {
    height: 20px;
    width: 20px;
}

.container-ripe .header-buttons .header-button > span:hover > img,
.container-ripe .header-buttons .header-button > span.active > img,
.container-ripe .header-buttons .header-button > span:active > img {
    opacity: 1;
}

.container-ripe .header-buttons > .header-button > p {
    display: none;
}

body.tablet .container-ripe .header-buttons > .header-button > p,
body.mobile .container-ripe .header-buttons > .header-button > p {
    color: $grey;
    display: block;
    font-size: 11px;
    letter-spacing: 0.25px;
    margin: 0px 0px 0px 0px;
}

body.tablet .container-ripe .details,
body.mobile .container-ripe .details {
    padding: 0px 20px 20px 20px;
}

.container-ripe .options-dropdown ::v-deep .dropdown {
    font-size: 13px;
    left: auto;
    margin-left: -142px;
    margin-top: 6px;
    min-width: 180px;
    position: absolute;
    text-align: left;
}

body.tablet .container-ripe .options-dropdown ::v-deep .dropdown,
body.mobile .container-ripe .options-dropdown ::v-deep .dropdown {
    bottom: 40px;
    margin: 0px 0px 0px 0px;
    right: 13px;
}

body.tablet .container-ripe .title,
body.mobile .container-ripe .title {
    width: 100%;
}

.container-ripe .details {
    font-size: 0px;
    padding: 0px 24px 40px 24px;
    text-align: left;
}

.container-ripe .details-column {
    box-sizing: border-box;
    display: inline-block;
    padding: 20px 20px 0px 0px;
    vertical-align: top;
}

body.tablet .container-ripe .details-column,
body.mobile .container-ripe .details-column {
    padding-top: 10px;
    text-align: center;
    width: 50%;
}

.container-ripe .details-column.details-column-image {
    padding: 0px 10% 0px 0px;
    text-align: center;
    width: 40%;
}

body.tablet .details-column.details-column-image,
body.mobile .details-column.details-column-image {
    padding: 0px 0px 0px 0px;
    width: 100%;
}

.container-ripe .details-column:last-child {
    padding-right: 0px;
}

.container-ripe .details-column .image {
    display: block;
    height: 250px;
    margin: 0px auto 0px auto;
    max-height: 250px;
    max-width: 100%;
    object-fit: contain;
    width: auto;
}

.container-ripe .label-value {
    font-weight: 600;
    max-width: 100%;
    overflow: hidden;
    text-align: left;
    text-transform: uppercase;
}

.container-ripe .details-column .label-value {
    min-height: 100px;
}

body.tablet .container-ripe .details-column .label-value,
body.mobile .container-ripe .details-column .label-value {
    margin-top: 12px;
    min-height: 70px;
    overflow: hidden;
}

.container-ripe .details-column .label-value:last-child {
    min-height: auto;
}

.container-ripe .label-value .label-value-component > p {
    margin: 0px 0px 0px 0px;
}

.container-ripe .label-value .label {
    color: $label-color;
    font-size: 12px;
    margin: 0px 0px 6px 0px;
}

.container-ripe .label-value .value {
    font-size: 14px;
    line-height: 18px;
    margin: 6px 0px 0px 0px;
    word-break: break-all;
}

.container-ripe .label-value .note {
    color: $label-color;
    font-size: 11px;
    line-height: 16px;
    margin-bottom: 0px;
    margin-top: 2px;
}
</style>

<script>
import { partMixin } from "../../../../mixins/part";

export const Details = {
    name: "details-ripe",
    mixins: [partMixin],
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String | Array,
            required: true
        },
        breadcrumbsFontSize: {
            type: Number,
            default: 26
        },
        breadcrumbsSeparator: {
            type: String,
            default: "/"
        },
        invalidTitle: {
            type: String,
            default: "Item not found"
        },
        invalidMessage: {
            type: String,
            default: "Our apologies, it looks like this item doesn't exist"
        },
        optionsItems: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Number,
            default: 4
        },
        values: {
            type: Array,
            required: true
        },
        columnWidth: {
            type: String,
            default: null
        },
        imageUrl: {
            type: String,
            default: null
        },
        context: {
            type: Object,
            default: () => ({})
        },
        item: {
            type: Object,
            default: null
        },
        index: {
            type: Number,
            default: null
        },
        loaded: {
            type: Boolean,
            default: true
        },
        invalid: {
            type: Boolean,
            default: false
        },
        getItems: {
            type: Function,
            required: true
        },
        navigation: {
            type: Boolean,
            default: true
        },
        safe: {
            type: Boolean,
            default: false
        },
        headerButtons: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            switching: false,
            optionsVisible: false,
            lightBoxVisible: false
        };
    },
    computed: {
        isLoaded() {
            return this.loaded && !this.switching;
        },
        isLoading() {
            return !this.isLoaded;
        },
        hasBreadcrumbs() {
            return this.title && Array.isArray(this.title);
        },
        hasIndex() {
            return this.index !== null && this.index !== undefined;
        },
        optionsSlots() {
            return Object.keys(this.$slots).filter(slot => slot.startsWith("options-"));
        },
        optionsScopedSlots() {
            return Object.keys(this.$scopedSlots).filter(slot => slot.startsWith("options-"));
        },
        detailsColumnStyle() {
            const width = this.columnWidth
                ? this.columnWidth
                : `${(this.imageUrl ? 60 : 100) / this.columns}%`;
            const base = {
                width: this.isTabletWidth() || this.isMobileWidth() ? null : width
            };
            return base;
        }
    },
    methods: {
        getValueColumn(valueIndex) {
            return valueIndex % this.columns;
        },
        getColumnValues(columnIndex) {
            return this.values.filter((value, index) => this.getValueColumn(index) === columnIndex);
        },
        toggleOptions() {
            this.optionsVisible = !this.optionsVisible;
        },
        async previousItem(force = false) {
            if (!this.hasIndex) return;
            if (!this.navigation && !force) return;
            if ((this.safe && this.isLoading) || this.index === undefined || this.index === 0) {
                this.triggerAnimation("slide-left-fake");
                return;
            }
            const [previous] = await this.getItems({
                ...this.context,
                start: this.index - 1,
                limit: 1
            });
            previous
                ? this.showItem(previous, this.index - 1)
                : this.triggerAnimation("slide-left-fake");
        },
        async nextItem(force = false) {
            if (!this.hasIndex) return;
            if (!this.navigation && !force) return;
            if ((this.safe && this.isLoading) || this.index === undefined) {
                this.triggerAnimation("slide-right-fake");
                return;
            }
            const [next] = await this.getItems({
                ...this.context,
                start: this.index + 1,
                limit: 1
            });
            next ? this.showItem(next, this.index + 1) : this.triggerAnimation("slide-right-fake");
        },
        showItem(item, index) {
            if (!this.$router) return;
            this.switching = true;
            const transition = index > this.index ? "slide-left" : "slide-right";

            this.$router.push(
                {
                    name: this.name,
                    params: { id: item.id, transition: transition },
                    query: { ...this.$route.query, index }
                },
                () => (this.switching = false),
                () => (this.switching = false)
            );
        },
        triggerAnimation(animation) {
            this.$emit("animation", animation);
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
            this.previousItem();
        },
        onNextClick() {
            this.nextItem();
        },
        onRefreshClick() {
            this.$emit("click:refresh");
        },
        onKeyJ() {
            this.nextItem();
        },
        onKeyK() {
            this.previousItem();
        },
        onKeyLeft() {
            this.previousItem();
        },
        onKeyRight() {
            this.nextItem();
        }
    }
};

export default Details;
</script>
