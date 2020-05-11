<template>
    <div
        class="search"
        v-bind:style="style"
        v-bind:class="[
            focused ? 'focus' : 'unfocus',
            grow ? 'grow' : '',
            value ? 'filled' : '',
            iconVisible ? 'icon-visible' : 'icon-invisible',
            clearVisible ? 'clear-visible' : 'clear-invisible'
        ]"
    >
        <global-events v-on:keydown.esc="onEscKey" />
        <loader loader="ball-scale-multiple" v-if="loading" />
        <slot name="icon" v-else>
            <svg
                v-bind:style="svgStyle"
                focusable="false"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
                v-show="iconVisible"
            >
                <path
                    d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                />
                <path d="M0 0h24v24H0z" fill="none" />
            </svg>
        </slot>
        <input-ripe
            v-bind:variant="variant"
            v-bind:value.sync="valueData"
            v-bind:placeholder="placeholder"
            v-bind:autofocus="autofocus"
            v-bind:width="width"
            v-bind:height="height"
            v-bind:font-weight="600"
            ref="input"
            v-on:focus="focused = true"
            v-on:blur="focused = false"
        />
        <button-icon
            class="icon-clear"
            v-bind:icon="'close'"
            v-bind:color="'none'"
            v-bind:size="24"
            v-if="clearButtonVisible"
            v-on:click="onClearIconClick"
        />
        <transition name="slide">
            <div class="suggestions" v-show="suggestionsVisible && suggestions.length > 0">
                <div
                    class="suggestion"
                    v-for="suggestion in suggestions"
                    v-bind:key="suggestion.value"
                >
                    <slot name="suggestion" v-bind:suggestion="suggestion">
                        <router-link v-bind:to="suggestion.link">
                            <span>{{ suggestion.label || suggestion.value }}</span>
                        </router-link>
                    </slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.search {
    display: inline-block;
    font-size: 0px;
    overflow: hidden;
    position: relative;
    width: 100%;
}

.search.grow {
    width: auto;
}

.search > .loader {
    left: 38px;
    top: 38px;
}

.search > .loader ::v-deep div {
    height: 20px;
    width: 20px;
}

.search > svg {
    display: inline-block;
    fill: #d0d0d0;
    margin-left: 8px;
    position: absolute;
    width: 20px;
}

.search.focus > svg,
.search.filled > svg {
    fill: #2d2d2d;
}

.search ::v-deep input[type="text"] {
    padding-left: 12px;
    vertical-align: top;
}

.search.grow ::v-deep input[type="text"] {
    width: 280px;
}

.search.icon-visible ::v-deep input[type="text"] {
    padding-left: 33px;
}

.search.clear-visible ::v-deep input[type="text"] {
    padding-right: 33px;
}

.search.grow ::v-deep input[type="text"]:focus {
    width: 340px;
}

.search .icon-clear {
    position: absolute;
    right: 5px;
    top: 5px;
}

.search > .suggestions {
    border: 1px solid $border-color;
    border-radius: 5px;
    font-size: 15px;
    margin-top: -2px;
    overflow: hidden;
}

.search > .suggestions > .suggestion {
    background-color: $white;
    border-bottom: 1px solid $border-color;
    padding: 2px 16px 2px 16px;
    text-transform: capitalize;
}

.search > .suggestions > .suggestion:hover,
.search > .suggestions > .suggestion.selected {
    background-color: $selected-color;
}

.search > .suggestions > .suggestion:last-child {
    border-bottom: none;
}

.search > .suggestions > .suggestion > a {
    border-bottom: none;
    color: #4d4d4d;
    display: block;
    font-weight: 600;
}

.search > .suggestions > .suggestion:hover > a,
.search > .suggestions > .suggestion.selected > a {
    color: $link-hover-color;
}
</style>

<script>
export const Search = {
    name: "search",
    props: {
        variant: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: "Search"
        },
        suggestions: {
            type: Array,
            default: () => []
        },
        width: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: 34
        },
        grow: {
            type: Boolean,
            default: false
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        iconVisible: {
            type: Boolean,
            default: true
        },
        clearVisible: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            focused: false,
            suggestionsVisible: false,
            valueData: this.value
        };
    },
    watch: {
        value(value) {
            this.valueData = value;
        },
        valueData(value) {
            this.$emit("update:value", value);
        },
        focused(value) {
            if (value) {
                this.suggestionsVisible = true;
            } else {
                setTimeout(() => {
                    this.suggestionsVisible = false;
                }, 100);
            }
        }
    },
    computed: {
        style() {
            const base = {};
            if (this.width) base.width = `${this.width}px`;
            if (this.height) base.height = `${this.height}px`;
            return base;
        },
        svgStyle() {
            return {
                "margin-top": `${(this.height - 24) / 2}px`
            };
        },
        clearButtonVisible() {
            return this.valueData && this.clearVisible;
        }
    },
    methods: {
        blur() {
            this.$refs.input.blur();
        },
        clear() {
            this.valueData = "";
        },
        onEscKey() {
            this.blur();
        },
        onClearIconClick() {
            this.clear();
        }
    }
};

export default Search;
</script>
