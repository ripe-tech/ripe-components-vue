<template>
    <transition-group tag="div" v-bind:name="transition" class="lineup">
        <div
            class="lineup-item"
            v-bind:class="{ clickable: clickable(item) }"
            v-for="(item, index) in items"
            v-bind:key="item.id"
            v-on:click="onItemClick(item, index)"
        >
            <slot
                v-bind:name="value.value"
                v-bind:item="item"
                v-bind:index="index"
                v-for="value in values"
            >
                <div
                    class="lineup-item-value"
                    v-bind:class="[value.value, `lineup-item-value-${value.value}`]"
<<<<<<< HEAD
                    v-bind:style="style"
=======
>>>>>>> parent of d2cc221... Merge branch 'master' into ns/table_row_click_events
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
                                    {{ item[value.value] || item[value.value] || "-" }}
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
    </transition-group>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.lineup {
    text-align: left;
}

.lineup > .lineup-item {
    border-bottom: 1px solid $lighter-grey;
    padding: 16px 20px 16px 20px;
}

.lineup > .lineup-item.clickable {
    cursor: pointer;
}

.lineup > .lineup-item:first-child {
    border-top: 1px solid $lighter-grey;
}

<<<<<<< HEAD
.lineup .lineup-item .lineup-item-value {
    box-sizing: border-box;
    display: inline-block;
    padding: 0px 15px 0px 15px;
}

.lineup .lineup-item .lineup-item-value .key {
    color: #8d8d8d;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.6px;
    text-transform: uppercase;
}

.lineup .lineup-item .lineup-item-value .value {
    color: #0d0d0d;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.7px;
    margin: 6px 0px 0px 0px;
=======
.lineup > .lineup-item ::v-deep .lineup-item-value {
    box-sizing: border-box;
    display: inline-block;
    font-weight: 600;
    min-height: 65px;
    overflow: hidden;
    padding: 20px 20px 0px 0px;
    text-align: left;
    text-transform: uppercase;
}

.lineup > .lineup-item ::v-deep .lineup-item-value .label > p,
.lineup > .lineup-item ::v-deep .lineup-item-value .value > p,
.lineup > .lineup-item ::v-deep .lineup-item-value .note > p {
    margin: 0px 0px 0px 0px;
}

.lineup > .lineup-item .lineup-item-value .label {
    color: $label-color;
    font-size: 12px;
    margin: 0px 0px 6px 0px;
}

.lineup > .lineup-item .lineup-item-value .value {
    font-size: 14px;
    line-height: 18px;
    margin: 6px 0px 0px 0px;
    word-break: break-all;
    word-break: break-word;
}

.lineup > .lineup-item .lineup-item-value .note {
    color: $label-color;
    font-size: 11px;
    line-height: 16px;
    margin-bottom: 0px;
    margin-top: 2px;
>>>>>>> parent of d2cc221... Merge branch 'master' into ns/table_row_click_events
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
        transition: {
            type: String,
            default: null
        },
        getItemUrl: {
            type: Function,
            default: null
        }
    },
<<<<<<< HEAD
    computed: {
        style() {
            const base = {};
            if (this.nrColumns) base.width = `${100 / this.nrColumns}%`;
            return base;
        }
    },
=======
>>>>>>> parent of d2cc221... Merge branch 'master' into ns/table_row_click_events
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
