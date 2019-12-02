<template>
    <transition-group tag="div" v-bind:name="transition" class="lineup">
        <div class="item" v-for="(item, index) in items" v-bind:key="index">
            <slot v-bind:name="value.id" v-bind:item="item" v-for="value in values">
                <div
                    class="label-value"
                    v-bind:class="[value.id, `label-value-${value.id}`]"
                    v-bind:key="value.id"
                >
                    <div class="label-value-component label">
                        <slot v-bind:name="`${value.id}-label`" v-bind:item="item">
                            <p class="label-text">
                                <slot v-bind:name="`${value.id}-label-text`" v-bind:item="item">
                                    {{ value.label || value.id || value.name }}
                                </slot>
                            </p>
                        </slot>
                    </div>
                    <div class="label-value-component value">
                        <slot v-bind:name="`${value.id}-value`" v-bind:item="item">
                            <p class="value-text">
                                <slot v-bind:name="`${value.id}-value-text`" v-bind:item="item">
                                    {{ item[value.value] || item[value.id] || "-" }}
                                </slot>
                            </p>
                        </slot>
                    </div>
                    <div class="label-value-component note">
                        <slot v-bind:name="`${value.id}-note`" v-bind:item="item">
                            <p
                                class="note-text"
                                v-if="value.note || $slots[`${value.id}-note-text`]"
                            >
                                <slot v-bind:name="`${value.id}-note-text`" v-bind:item="item">
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

.lineup .item {
    border-bottom: 1px solid #e4e8f0;
    padding: 30px 15px 30px 15px;
}

.lineup .item:first-child {
    border-top: 1px solid #e4e8f0;
}

.lineup ::v-deep .label-value {
    box-sizing: border-box;
    display: inline-block;
    font-weight: 600;
    min-height: 65px;
    overflow: hidden;
    padding: 20px 20px 0px 0px;
    text-align: left;
    text-transform: uppercase;
}

.lineup ::v-deep .label-value .label-value-component > p {
    margin: 0px 0px 0px 0px;
}

.lineup ::v-deep .label-value .label {
    color: $label-color;
    font-size: 12px;
    margin: 0px 0px 6px 0px;
}

.lineup ::v-deep .label-value .value {
    font-size: 14px;
    line-height: 18px;
    margin: 6px 0px 0px 0px;
    word-break: break-all;
    word-break: break-word;
}

.lineup ::v-deep .label-value .note {
    color: $label-color;
    font-size: 11px;
    line-height: 16px;
    margin-bottom: 0px;
    margin-top: 2px;
}
</style>

<script>
export const LineupPlatforme = {
    name: "lineup-platforme",
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

export default LineupPlatforme;
</script>
