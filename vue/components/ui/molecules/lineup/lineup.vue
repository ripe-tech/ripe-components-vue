<template>
    <transition-group tag="div" v-bind:name="transition" class="lineup">
        <div class="lineup-item" v-for="item in items" v-bind:key="item.id">
            <slot v-bind:name="value.value" v-bind:item="item" v-for="value in values">
                <div
                    class="lineup-item-value"
                    v-bind:class="[value.value, `lineup-item-value-${value.value}`]"
                    v-bind:key="value.value"
                >
                    <div class="key">
                        <slot v-bind:name="`${value.value}-key`" v-bind:item="item">
                            <p class="label-text">
                                <slot v-bind:name="`${value.value}-label-text`" v-bind:item="item">
                                    {{ value.label || value.value || value.name }}
                                </slot>
                            </p>
                        </slot>
                    </div>
                    <div class="value">
                        <slot v-bind:name="`${value.value}-value`" v-bind:item="item">
                            <p class="value-text">
                                <slot v-bind:name="`${value.value}-value-text`" v-bind:item="item">
                                    {{ item[value.value] || item[value.value] || "-" }}
                                </slot>
                            </p>
                        </slot>
                    </div>
                    <div class="note">
                        <slot v-bind:name="`${value.value}-note`" v-bind:item="item">
                            <p
                                class="note-text"
                                v-if="value.note || $slots[`${value.value}-note-text`]"
                            >
                                <slot v-bind:name="`${value.value}-note-text`" v-bind:item="item">
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
    border-bottom: 1px solid #e4e8f0;
    padding: 30px 15px 30px 15px;
}

.lineup > .lineup-item:first-child {
    border-top: 1px solid #e4e8f0;
}

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
        }
    }
};

export default Lineup;
</script>
