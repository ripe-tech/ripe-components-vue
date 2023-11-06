<template>
    <div class="details-expandable">
        <section-expandable
            v-bind:title="sectionName"
            v-bind:size="sectionSize"
            v-bind:animated="sectionAnimated"
            v-bind:uppercase="sectionUppercase"
            v-for="(section, sectionName) in data"
            v-bind:key="sectionName"
        >
            <div
                class="row"
                v-for="(value, name, subIndex) in section"
                v-bind:key="subIndex"
            >
                <slot v-bind:name="sectionName + '-label-' + name">
                    <label-ripe
                        class="title"
                        v-bind:text="capitalizeName(name)"
                        v-bind:font-size="labelFontSize"
                    />
                </slot>
                <div class="value">
                    <slot v-bind:name="sectionName + '-' + name" v-bind:field-value="value">
                        <input-ripe v-bind:value="value" />
                    </slot>
                </div>
            </div>
        </section-expandable>
        <div class="btn-container">
            <button-color
                class="btn-discard"
                v-bind:size="'small'"
                v-bind:text="discardButtonText"
                v-bind:secondary="true"
                v-bind:icon="'close'"
                v-on:click="onDiscardClick"
            />
            <button-color
                class="btn-save"
                v-bind:size="'small'"
                v-bind:text="saveButtonText"
                v-bind:icon="'save'"
                v-on:click="onSaveClick"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.details-expandable {
    padding: 0px 16px 0px 16px;
}

.btn-container {
    float: right;
    height: 25px;
    margin-top: 50px;
}

.btn-discard {
    margin-right: 6px;
    min-width: 125px;
}

.button-color.button-color-small {
    min-width: 125px;
}

.title {
    color: #57626e;
}

.value {
    margin-top: 10px;
}

.row {
    margin-top: 25px;
}
</style>
<script>
import { normalize } from "ripe-commons";
export const DetailsExpandable = {
    name: "details-expandable-ripe",
    props: {
        data: {
            type: Object,
            required: true
        },
        sectionSize: {
            type: String,
            default: "small"
        },
        sectionAnimated: {
            type: Boolean,
            default: false
        },
        sectionUppercase: {
            type: Boolean,
            default: true
        },
        labelFontSize: {
            type: Number,
            default: null
        },
        discardButtonText: {
            type: String,
            default: "Discard changes"
        },
        saveButtonText: {
            type: String,
            default: "Save changes"
        }
    },
    data: function() {
        return {
            isExpanded: {}
        };
    },
    mounted: function() {
        Object.keys(this.data).forEach(k => {
            this.isExpanded[k] = false;
        });
    },
    methods: {
        capitalizeName(name) {
            return normalize(name, { capitalize: true });
        },
        toggleSection(sectionName) {
            this.isExpanded[sectionName] = !this.isExpanded[sectionName];
        },
        onSaveClick(event) {
            this.$emit("save:click", event);
        },
        onDiscardClick(event) {
            this.$emit("discard:click", event);
        }
    }
};

export default DetailsExpandable;
</script>
