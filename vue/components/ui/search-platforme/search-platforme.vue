<template>
    <div
        class="search-platforme"
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
        <input
            type="text"
            v-bind:value="value"
            v-bind:placeholder="placeholder"
            ref="input"
            v-on:input="$emit('update:value', $event.target.value)"
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

.search-platforme {
    display: inline-block;
    height: 34px;
    line-height: 34px;
}

.search-platforme > svg {
    display: inline-block;
    fill: #d0d0d0;
    margin-left: 32px;
    margin-top: 6px;
    position: absolute;
    width: 20px;
}

.search-platforme.focus > svg {
    fill: #2d2d2d;
}

.search-platforme > input[type="text"] {
    background-color: #f2f2f2;
    border: 1px solid transparent;
    box-sizing: border-box;
    font-size: 13px;
    height: 34px;
    line-height: 34px;
    margin-left: 24px;
    padding-left: 33px;
    padding-right: 12px;
    transition: width 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
    width: 304px;
}

.search-platforme.icon-invisible > input[type="text"] {
    padding-left: 12px;
}

.search-platforme > input[type="text"]:hover {
    border-color: #dddddd;
}

.search-platforme > input[type="text"]:focus {
    background-color: #ffffff;
    border-color: #dddddd;
    box-shadow: 0px 1px 8px 0px rgba(32, 33, 36, 0.14);
}

.search-platforme.grow > input[type="text"]:focus {
    width: 340px;
}

.search-platforme > .suggestions {
    border: 1px solid $border-color;
    border-radius: 5px;
    font-size: 15px;
    margin-left: 24px;
    margin-top: -2px;
    overflow: hidden;
}

.search-platforme > .suggestions > .suggestion {
    background-color: #ffffff;
    border-bottom: 1px solid $border-color;
    padding: 2px 16px 2px 16px;
    text-transform: capitalize;
}

.search-platforme > .suggestions > .suggestion:hover,
.search-platforme > .suggestions > .suggestion.selected {
    background-color: $selected-color;
}

.search-platforme > .suggestions > .suggestion:last-child {
    border-bottom: none;
}

.search-platforme > .suggestions > .suggestion > a {
    border-bottom: none;
    color: #4d4d4d;
    display: block;
    font-weight: 600;
}

.search-platforme > .suggestions > .suggestion:hover > a,
.search-platforme > .suggestions > .suggestion.selected > a {
    color: $link-hover-color;
}
</style>

<script>
export const SearchPlatforme = {
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
    mounted: function() {
        this.autofocus && this.$refs.input.focus();
    },
    methods: {
        blur() {
            this.$refs.input.blur();
        }
    }
};

export default SearchPlatforme;
</script>
