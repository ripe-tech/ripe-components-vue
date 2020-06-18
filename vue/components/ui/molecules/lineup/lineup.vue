<template>
    <transition-group tag="div" v-bind:name="transition" class="lineup" v-bind:class="classes">
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
                v-bind:class="`lineup-item-container-${field.value}`"
                v-for="field in fields"
                v-bind:key="field.value"
            >
                <slot v-bind:name="field.value" v-bind:item="item" v-bind:index="index">
                    <div
                        class="lineup-item-contents"
                        v-bind:class="`lineup-item-contents-${field.value}`"
                        v-bind:key="field.value"
                    >
                        <div class="key">
                            <slot
                                v-bind:name="`${field.value}-key`"
                                v-bind:item="item"
                                v-bind:index="index"
                            >
                                <div class="label-text">
                                    <slot
                                        v-bind:name="`${field.value}-label-text`"
                                        v-bind:item="item"
                                        v-bind:index="index"
                                    >
                                        {{ field.label || field.value || field.name }}
                                    </slot>
                                </div>
                            </slot>
                        </div>
                        <div class="field">
                            <slot
                                v-bind:name="`${field.value}-field`"
                                v-bind:item="item"
                                v-bind:index="index"
                            >
                                <div class="field-text">
                                    <slot
                                        v-bind:name="`${field.value}-field-text`"
                                        v-bind:item="item"
                                        v-bind:index="index"
                                    >
                                        {{
                                            item[field.value] !== null &&
                                            item[field.value] !== undefined
                                                ? item[field.value]
                                                : "-"
                                        }}
                                    </slot>
                                </div>
                            </slot>
                        </div>
                        <div
                            class="note"
                            v-if="
                                field.note ||
                                    $slots[`${field.value}-note`] ||
                                    $slots[`${field.value}-note-text`]
                            "
                        >
                            <slot
                                v-bind:name="`${field.value}-note`"
                                v-bind:item="item"
                                v-bind:index="index"
                            >
                                <div
                                    class="note-text"
                                    v-if="field.note || $slots[`${field.value}-note-text`]"
                                >
                                    <slot
                                        v-bind:name="`${field.value}-note-text`"
                                        v-bind:item="item"
                                        v-bind:index="index"
                                    >
                                        {{ item[field.note] }}
                                    </slot>
                                </div>
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

.lineup.lineup-spaced > .lineup-item > .lineup-item-container {
    padding: 14px 12px 14px 12px;
}

.lineup > .lineup-item > .lineup-item-container > .lineup-item-contents > .key {
    color: #8d8d8d;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

.lineup > .lineup-item > .lineup-item-container > .lineup-item-contents > .field {
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
        fields: {
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
        },
        variant: {
            type: String,
            default: null
        }
    },
    computed: {
        classes() {
            const base = {};
            if (this.variant) base[`lineup-${this.variant}`] = true;
            return base;
        },
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
