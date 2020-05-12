<template>
    <div class="details">
        <global-events
            v-on:keydown.j="onKeyJ"
            v-on:keydown.k="onKeyK"
            v-on:keydown.left="onKeyLeft"
            v-on:keydown.right="onKeyRight"
        />
        <container-ripe
            class="loading"
            v-bind:title="invalid ? invalidTitle : title"
            v-bind:header-buttons="_containerHeaderButtons"
            v-if="isLoading"
            v-on:header-button:click="onHeaderButtonClick"
        >
            <slot v-bind:name="slot" v-for="slot in Object.keys($slots)" v-bind:slot="slot" />
            <template
                v-for="slot in Object.keys($scopedSlots)"
                v-bind:slot="slot"
                slot-scope="scope"
            >
                <slot v-bind:name="slot" v-bind="scope" />
            </template>
            <template v-if="header-buttons" v-slot:header-buttons-extra-after>
                <button-icon
                    v-bind:icon="'options'"
                    v-bind:size="34"
                    v-bind:disabled="optionsItems.length === 0 || isLoading"
                    v-bind:active="optionsVisible"
                    ref="button-icon-options-loading"
                    v-bind:key="'options'"
                    v-on:click="toggleOptions"
                />
                <dropdown
                    class="options-dropdown"
                    v-bind:items="optionsItems"
                    v-bind:visible.sync="optionsVisible"
                    v-bind:owners="
                        $refs['button-icon-options-loading'] &&
                            $refs['button-icon-options-loading'].$el
                    "
                    v-on:item-clicked="onOptionsItemClick"
                />
            </template>
            <h1 class="item-invalid" v-if="invalid">
                {{ invalidMessage }}
            </h1>
            <loader loader="line-scale" v-bind:count="5" v-else />
        </container-ripe>
        <container-ripe
            class="details-container"
            v-bind:title="isLoaded && title"
            v-bind:header-buttons="_containerHeaderButtons"
            v-else
            v-on:header-button:click="onHeaderButtonClick"
        >
            <slot v-bind:name="slot" v-for="slot in Object.keys($slots)" v-bind:slot="slot" />
            <template
                v-for="slot in Object.keys($scopedSlots)"
                v-bind:slot="slot"
                slot-scope="scope"
            >
                <slot v-bind:name="slot" v-bind="scope" />
            </template>
            <template v-if="headerButtons" v-slot:header-buttons-extra-after>
                <button-icon
                    v-bind:icon="'options'"
                    v-bind:size="34"
                    v-bind:disabled="optionsItems.length === 0 && loaded !== false"
                    v-bind:active="optionsVisible"
                    ref="button-icon-options"
                    v-bind:key="'options'"
                    v-on:click="toggleOptions"
                />
                <dropdown
                    class="options-dropdown"
                    v-bind:items="optionsItems"
                    v-bind:visible.sync="optionsVisible"
                    v-bind:owners="$refs['button-icon-options'] && $refs['button-icon-options'].$el"
                    v-on:item-clicked="onOptionsItemClick"
                />
            </template>
            <slot name="details-before" />
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
                <div class="details-column" v-for="column in columns" v-bind:key="column">
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
.container-ripe .item-invalid {
    border-top: 1px solid transparent;
    height: 38px;
    line-height: 38px;
    margin: 0px 0px 0px 0px;
    padding-top: 140px;
}

body.tablet .container-ripe .details,
body.mobile .container-ripe .details {
    padding: 0px 20px 20px 20px;
}

.container-ripe .options-dropdown ::v-deep .dropdown {
    margin-top: 6px;
    min-width: 170px;
    position: absolute;
    text-align: left;
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
    width: 15%;
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
    letter-spacing: 0.5px;
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














body.tablet .container-ripe ::v-deep .header-buttons,
body.mobile .container-ripe ::v-deep .header-buttons {
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




body.tablet .container-ripe ::v-deep .header-buttons > .header-button,
body.mobile .container-ripe ::v-deep .header-buttons > .header-button {
    display: inline-block;
    flex: auto;
    margin: 8px 0px 8px 0px;
    text-align: center;
}


body.tablet ::v-deep .header-buttons > .header-button.invisible,
body.mobile ::v-deep .header-buttons > .header-button.invisible {
    display: inline-block;
}


body.tablet .container-ripe ::v-deep.header-buttons > .header-button > span > img,
body.mobile .container-ripe ::v-deep .header-buttons > .header-button > span > img {
    height: 20px;
    width: 20px;
}


body.tablet .container-ripe ::v-deep.header-buttons > .header-button > p,
body.mobile .container-ripe ::v-deep .header-buttons > .header-button > p {
    color: $grey;
    display: block;
    font-size: 11px;
    letter-spacing: 0.25px;
    margin: 0px 0px 0px 0px;
}


body.tablet .container-ripe .options-dropdown ::v-deep .dropdown,
body.mobile .container-ripe .options-dropdown ::v-deep .dropdown {
    bottom: 40px;
    margin: 0px 0px 0px 0px;
    right: 13px;
}



</style>

<script>
export const Details = {
    name: "details-ripe",
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
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
        },
        containerHeaderButtons: {
            type: Array,
            default: () => []
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
        hasIndex() {
            return this.index !== null && this.index !== undefined;
        },
        _containerHeaderButtons() {
            if (!this.headerButtons) return [];

            return this.containerHeaderButtons.length > 0
                ? this.containerHeaderButtons
                : [
                      {
                          id: "stats",
                          icon: "stats",
                          size: 34
                      },
                      {
                          id: "chevron-left",
                          icon: "chevron-left",
                          size: 34,
                          disabled: !this.hasIndex
                      },
                      {
                          id: "chevron-right",
                          icon: "chevron-right",
                          size: 34,
                          disabled: !this.hasIndex
                      },
                      {
                          id: "refresh",
                          icon: "refresh",
                          size: 34
                      }
                  ];
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
        onHeaderButtonClick(event, id) {
            switch (id) {
                case "chevron-left":
                    this.previousItem();
                    break;
                case "chevron-right":
                    this.nextItem();
                    break;
                default:
                    break;
            }

            this.$emit(`click:${id}`);
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
