<template>
    <div class="tag-group" v-on:click="focusInput">
        <transition-group name="list" tag="span">
            <div
                class="tag"
                v-bind:class="getClasses(tag)"
                v-for="(tag, index) in tagsData"
                v-bind:key="`${tag}`"
                v-on:click.stop="onClickTag"
            >
                <button-icon v-bind:icon="'close'" v-bind:size="23" v-on:click="deleteTag(index)" />
                <div
                    class="text"
                    autocorrect="off"
                    spellcheck="false"
                    v-bind:contenteditable="'true'"
                    ref="tag-text"
                    v-on:keydown.enter.prevent="updateTag($event, index)"
                    v-on:keydown.esc.prevent="updateTag($event, index)"
                    v-on:blur="updateTag($event, index)"
                >
                    {{ tag }}
                </div>
            </div>
        </transition-group>
        <input
            v-bind:placeholder="'Write and press enter...'"
            v-if="hasInput"
            ref="input"
            v-model="inputValue"
            v-on:keydown.enter="addTag"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.tag-group {
    border: 2px solid transparent;
    border-radius: 4px;
    transition: border 0.15s ease-in-out;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.15s ease-in-out;
}

.list-enter,
.list-leave-to {
    opacity: 0;
    transform: scale(0);
}

.tag-group:focus-within {
    border-color: $aqcua-blue;
}

.tag {
    align-items: center;
    border: 2px solid transparent;
    border-radius: 4px;
    display: inline-flex;
    flex-direction: row;
    font-size: 12px;
    font-weight: 600;
    justify-content: space-around;
    letter-spacing: 0.45px;
    line-height: 15px;
    margin: 1px;
    overflow: hidden;
    padding: 0px 15px 0px 0px;
    white-space: nowrap;
}

.tag .text {
    display: inline-block;
    outline: none;
    text-transform: uppercase;
    white-space: initial;
    word-break: break-all;
}

.tag:focus-within {
    border: 2px solid $lighter-blue;
}

.tag.tag-small {
    font-size: 10px;
    height: 12px;
    letter-spacing: 0.35px;
    line-height: 12px;
    padding: 4px 10px 4px 10px;
}

.tag.tag-large {
    font-size: 14px;
    height: 17px;
    letter-spacing: 0.65px;
    line-height: 17px;
    padding: 6px 14px 6px 14px;
}

.tag,
.tag.tag-black {
    background-color: $black;
    color: $white;
}

.tag.tag-grey {
    background-color: $grey;
    color: $white;
}

.tag.tag-orange {
    background-color: $orange;
    color: $white;
}

.tag.tag-blue {
    background-color: $blue;
    color: $white;
}

.tag.tag-green {
    background-color: $green;
    color: $white;
}

.tag.tag-red {
    background-color: $red;
    color: $white;
}

.tag.tag-purple {
    background-color: $purple;
    color: $white;
}

.tag.tag-black {
    background-color: $black;
    color: $white;
}

.tag .button-icon:hover {
    background-color: #ffffff59;
}

input {
    border: none;
    box-sizing: border-box;
    height: 27px;
    vertical-align: top;
}
</style>

<script>
export const TagGroup = {
    name: "tag-group",
    props: {
        size: {
            type: String
        },
        color: {
            type: String,
            default: null
        },
        tags: {
            type: Array,
            default: () => ["A", "B", "C"]
        },
        colors: {
            type: Array,
            default: () => ["black", "grey", "orange", "blue", "green", "red", "purple"]
        },
        hasInput: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            tagsData: this.tags,
            inputValue: null
        };
    },
    watch: {
        tags(value) {
            this.tagsData = value;
        },
        tagsValue(value) {
            this.$emit("update:tags", value);
        }
    },
    methods: {
        addTag(val) {
            const value = this.inputValue;
            if (!value || this.tagsData.includes(value.toUpperCase())) {
                this.inputValue = null;
                return;
            }
            this.tagsData.push(this.inputValue.toUpperCase());
            this.inputValue = null;
        },
        getColor(tag) {
            const colorIndex = (Math.abs(tag.toString().charCodeAt(0)) % this.color.length) + 2;
            return this.colors[colorIndex];
        },
        getClasses(tag) {
            const base = {};
            const color = this.getColor(tag);
            if (tag.toString().length < 1) return;
            if (this.color) base["tag-" + color] = color;
            if (this.size) base["tag-" + this.size] = this.size;
            if (this.subtle) base["tag-subtle"] = this.subtle;
            return base;
        },
        deleteTag(index) {
            this.tagsData.splice(index, 1);
        },
        updateTag(event, index) {
            const value = event.target.innerText.toUpperCase();
            if (this.tagsData.includes(value)) return;
            this.$set(this.tagsData, index, value);
            if (!value || value === "\n") {
                this.$delete(this.tagsData, index);
            }
            event.target.blur();
        },
        focusInput() {
            this.$refs.input.focus();
        },
        onClickTag(ev) {
            const toEdit = ev.target.getElementsByClassName("text")[0];
            if (toEdit) toEdit.focus();
        }
    }
};

export default TagGroup;
</script>
