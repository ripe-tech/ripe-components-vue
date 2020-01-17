<template>
    <transition-group tag="div" v-bind:name="transition" class="lineup">
        <div
            class="lineup-item"
            v-bind:class="{ clickable: clickable(item) }"
            v-for="(item, index) in items"
            v-bind:key="item.id"
            v-on:click="onItemClick(item, index)"
        >
            <div
                class="lineup-item-container"
                v-bind:style="lineupItemStyle"
                v-bind:class="`lineup-item-container-${value.value}`"
                v-for="value in values"
                v-bind:key="value.value"
            >
                <slot v-bind:name="value.value" v-bind:item="item" v-bind:index="index">
                    <div
                        class="lineup-item-contents"
                        v-bind:class="[value.value, `lineup-item-contents-${value.value}`]"
                        v-bind:key="value.value"
                    >
                        <div class="key">
                            <slot
                                v-bind:name="`${value.value}-key`"
                                v-bind:item="item"
                                v-bind:index="index"
                            >
                                <p class="label-text">
                                    <slot
                                        v-bind:name="`${value.value}-label-text`"
                                        v-bind:item="item"
                                        v-bind:index="index"
                                    >
                                        {{ value.label || value.value || value.name }}
                                    </slot>
                                </p>
                            </slot>
                        </div>
                        <div class="value">
                            <slot
                                v-bind:name="`${value.value}-value`"
                                v-bind:item="item"
                                v-bind:index="index"
                            >
                                <p class="value-text">
                                    <slot
                                        v-bind:name="`${value.value}-value-text`"
                                        v-bind:item="item"
                                        v-bind:index="index"
                                    >
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
                        <div class="note">
                            <slot
                                v-bind:name="`${value.value}-note`"
                                v-bind:item="item"
                                v-bind:index="index"
                            >
                                <p
                                    class="note-text"
                                    v-if="value.note || $slots[`${value.value}-note-text`]"
                                >
                                    <slot
                                        v-bind:name="`${value.value}-note-text`"
                                        v-bind:item="item"
                                        v-bind:index="index"
                                    >
                                        {{ item[value.note] }}
                                    </slot>
                                </p>
                            </slot>
                        </div>
                    </div>
                </slot>
            </div>
        </div>
    </transition-group>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.lineup {
    text-align: left;
}

.lineup > .lineup-item {
    border-bottom: 1px solid $lighter-grey;
}

.lineup > .lineup-item.clickable {
    cursor: pointer;
}

.lineup > .lineup-item:first-child {
    border-top: 1px solid $lighter-grey;
}

.lineup > .lineup-item > .lineup-item-container {
    box-sizing: border-box;
    display: inline-block;
    padding: 6px 12px 6px 12px;
    vertical-align: top;
}

.lineup > .lineup-item > .lineup-item-container > .lineup-item-contents > .key {
    color: #8d8d8d;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

.lineup > .lineup-item > .lineup-item-container > .lineup-item-contents > .key > .label-text {
    margin: 0px 0px 0px 0px;
}

.lineup > .lineup-item > .lineup-item-container > .lineup-item-contents > .value {
    color: #0d0d0d;
    font-size: 14px;
    font-weight: 600;
    margin: 6px 0px 0px 0px;
}

.lineup > .lineup-item > .lineup-item-container > .lineup-item-contents > .note {
    color: $label-color;
    font-size: 11px;
    margin: 2px 0px 0px 0px;
}
</style>

<script>
export const Lineup = {
    name: "lineup",
    props: {
        items: {
            type: Array,
            required: true
        },
        values: {
            type: Array,
            required: true
        },
        columns: {
            type: Number,
            default: null
        },
        transition: {
            type: String,
            default: null
        },
        getItemUrl: {
            type: Function,
            default: null
        }
    },
    computed: {
        lineupItemStyle() {
            const base = {};
            base.width = this.columns === null ? null : `${100 / this.columns}%`;
            return base;
        }
    },
    methods: {
        clickable(item) {
            return item.url || this.getItemUrl;
        },
        onItemClick(item, index) {
            const url = this.getItemUrl ? this.getItemUrl(item, index) : item.url;
            if (url) this.$router.push(url);
            this.$emit("click", item, index);
        }
    }
};

export default Lineup;
</script>
