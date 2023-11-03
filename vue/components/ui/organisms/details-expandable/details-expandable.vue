<template>
    <div class="details-expandable">
        <div
            v-bind:class="
                isExpanded[sectionName]
                    ? 'details-expandable-section-show'
                    : 'details-expandable-section-hide'
            "
            v-for="(section, sectionName, index) in data"
            v-bind:key="index"
        >
            <div class="details-expandable-section" v-on:click="toggleSection(sectionName)">
                <h2 class="details-expandable-header">
                    <slot v-bind:name="sectionName">{{ sectionName }}</slot>
                </h2>
                <icon
                    class="details-expandable-caret"
                    v-bind:icon="isExpanded[sectionName] ? 'chevron-up' : 'chevron-down'"
                />
            </div>
            <div
                class="details-expandable-row"
                v-for="(value, name, subIndex) in section"
                v-bind:key="subIndex"
            >
                <slot v-bind:name="sectionName + '-label-' + name">
                    <label-ripe
                        class="details-expandable-title"
                        v-bind:text="capitalizeName(name)"
                        v-bind:font-size="labelFontSize"
                    />
                </slot>
                <div class="details-expandable-value">
                    <slot v-bind:name="sectionName + '-' + name" v-bind:field-value="value">
                        <input-ripe v-bind:value="value" />
                    </slot>
                </div>
            </div>
        </div>
        <div class="details-expandable-btn-container">
            <button-color
                class="details-expandable-btn-discard"
                v-bind:size="'small'"
                v-bind:text="discardButtonText"
                v-bind:secondary="true"
                v-bind:icon="'close'"
                v-on:click="onDiscardHandler"
            />
            <button-color
                class="details-expandable-btn-save"
                v-bind:size="'small'"
                v-bind:text="saveButtonText"
                v-bind:icon="'save'"
                v-on:click="onSaveHandler"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.details-expandable {
    padding: 0px 16px 0px 16px;
}

.details-expandable-caret {
    height: 24px;
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
}

.details-expandable-btn-container {
    float: right;
    height: 25px;
    margin-top: 50px;
}

.details-expandable-btn-discard {
    margin-right: 6px;
    min-width: 125px;
}

.button-color.button-color-small {
    min-width: 125px;
}

.details-expandable-section {
    cursor: pointer;
    display: flex;
}

.details-expandable-section-hide {
    border-bottom: 1px solid #e4e8f0;
    height: 25px;
    margin-top: 25px;
    overflow: hidden;
    padding-bottom: 25px;
    position: relative;
}

.details-expandable-section-show {
    height: auto;
    margin-top: 25px;
    overflow: visible;
    padding-bottom: 25px;
    position: relative;
}

.details-expandable-header {
    color: #0d0d0d;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.6px;
    text-transform: uppercase;
}

.details-expandable-title {
    color: #57626e;
}

.details-expandable-value {
    margin-top: 10px;
}

.details-expandable-row {
    margin-top: 25px;
}
</style>
<script>
export const DetailsExpandable = {
    name: "details-expandable-ripe",
    props: {
        data: {
            type: Object,
            required: true
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
        const isExpanded = {};
        Object.keys(this.data).forEach(k => {
            isExpanded[k] = false;
        });

        return {
            isExpanded
        };
    },
    methods: {
        capitalizeName(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
        toggleSection(sectionName) {
            this.isExpanded[sectionName] = !this.isExpanded[sectionName];
        },
        onSaveHandler(event) {
            this.$emit("save:click", event);
        },
        onDiscardHandler(event) {
            this.$emit("discard:click", event);
        }
    }
};

export default DetailsExpandable;
</script>
