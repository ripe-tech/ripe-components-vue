<template>
    <div
        class="search"
        v-bind:style="style"
        v-bind:class="[
            focused ? 'focus' : 'unfocus',
            grow ? 'grow' : '',
            iconVisible ? '' : 'icon-invisible'
        ]"
    >
        <global-events v-on:keydown.esc="blur()" />
        <slot name="icon">
            <svg
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
            v-bind:value="value"
            v-bind:placeholder="placeholder"
            v-bind:autofocus="autofocus"
            v-bind:width="width"
            ref="input"
            v-on:update:value="$emit('update:value', $event)"
            v-on:focus="focused = true"
            v-on:blur="focused = false"
        />
        <transition name="slide">
            <div class="suggestions" v-show="suggestionsVisible && suggestions.length > 0">
                <div
                    class="suggestion"
                    v-for="suggestion in suggestions"
                    v-bind:key="suggestion.id"
                >
                    <slot name="suggestion" v-bind:suggestion="suggestion">
                        <router-link v-bind:to="suggestion.link">
                            <span>{{ suggestion.text }}</span>
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
    height: 34px;
    line-height: 34px;
    width: 100%;
}

.search > svg {
    display: inline-block;
    fill: #d0d0d0;
    margin-left: 8px;
    margin-top: 5px;
    position: absolute;
    width: 20px;
}

.search.focus > svg {
    fill: #2d2d2d;
}

.search ::v-deep input[type="text"] {
    padding-left: 33px;
}

.search.icon-invisible ::v-deep input[type="text"] {
    padding-left: 12px;
}

.search.grow ::v-deep input[type="text"]:focus {
    width: 340px;
}

.search > .suggestions {
    border: 1px solid $border-color;
    border-radius: 5px;
    font-size: 15px;
    margin-left: 24px;
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
        width: {
            type: Number,
            default: null
        }
    },
    data: function() {
        return {
            focused: false,
            suggestionsVisible: false
        };
    },
    watch: {
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
            return base;
        }
    },
    methods: {
        blur() {
            this.$refs.input.blur();
        }
    }
};

export default Search;
</script>
