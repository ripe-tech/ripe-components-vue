<template>
    <div class="tag-group" v-bind:class="tagGroupClasses" v-on:click="focusInput">
        <transition-group name="tag-container" tag="span">
            <div
                class="tag"
                v-bind:class="tagClasses(tag)"
                v-for="(tag, index) in tagsData"
                v-bind:key="`${tag}`"
                v-on:click.stop="onClickTag"
            >
                <button-icon
                    v-bind:icon="'close'"
                    v-bind:size="buttonSize"
                    v-if="hasInput"
                    v-on:click="deleteTag(index)"
                />
                <div
                    class="text"
                    autocorrect="off"
                    spellcheck="false"
                    v-bind:contenteditable="hasInput"
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
            class="tag-input"
            v-bind:placeholder="placeholder"
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
    border: 2px solid $light-white;
    border-radius: 4px;
    transition: border 0.125s ease-in-out;
}

.tag-group:focus-within {
    border-color: $aqcua-blue;
}

.tag-group .tag-container-enter-active,
.tag-group .tag-container-leave-active {
    transition: all 0.125s ease-in-out;
}

.tag-group .tag-container-enter,
.tag-group .tag-container-leave-to {
    opacity: 0;
    transform: scale(0);
}

.tag-group .tag {
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
    margin: 3px 2px 3px 2px;
    overflow: hidden;
    padding: 0px 15px 0px 0px;
    white-space: nowrap;
}

.tag-group .tag .text {
    display: inline-block;
    margin-left: 5px;
    outline: none;
    text-transform: uppercase;
    white-space: initial;
    word-break: break-all;
}

.tag-group .tag:focus-within {
    border: 2px solid $lighter-blue;
}

.tag-group.tag-group-small .tag {
    font-size: 10px;
    height: 12px;
    letter-spacing: 0.35px;
    line-height: 12px;
    padding: 4px 10px 4px 10px;
}

.tag-group.tag-group-large .tag {
    font-size: 14px;
    height: 17px;
    letter-spacing: 0.65px;
    line-height: 17px;
    padding: 6px 14px 6px 14px;
}

.tag-group .tag,
.tag-group .tag.tag-black {
    background-color: $black;
    color: $white;
}

.tag-group .tag.tag-grey {
    background-color: $grey;
    color: $white;
}

.tag-group .tag.tag-orange {
    background-color: $orange;
    color: $white;
}

.tag-group .tag.tag-blue {
    background-color: $blue;
    color: $white;
}

.tag-group .tag.tag-green {
    background-color: $green;
    color: $white;
}

.tag-group .tag.tag-red {
    background-color: $red;
    color: $white;
}

.tag-group .tag.tag-purple {
    background-color: $purple;
    color: $white;
}

.tag-group .tag.tag-black {
    background-color: $black;
    color: $white;
}

.tag-group .tag .button-icon:hover {
    background-color: #ffffff59;
}

.tag-group .tag-input {
    border: none;
    box-sizing: border-box;
    font-size: 14px;
    height: 32px;
    vertical-align: top;
}

.tag-group.tag-group-small .tag-input {
    font-size: 12px;
    height: 28px;
}

.tag-group.tag-group-large .tag-input {
    font-size: 16px;
    height: 37px;
}
</style>

<script>
export const TagGroup = {
    name: "tag-group",
    props: {
        size: {
            type: String,
            default: "medium"
        },
        tags: {
            type: Array,
            default: () => []
        },
        colors: {
            type: Array,
            default: () => ["grey", "orange", "blue", "green", "red", "purple"]
        },
        hasInput: {
            type: Boolean,
            default: true
        },
        placeholder: {
            type: String,
            default: "Write and press enter..."
        }
    },
    data: function() {
        return {
            tagsData: this.tags,
            inputValue: null,
            count: 0
        };
    },
    computed: {
        buttonSize() {
            if (this.size === "medium") return 23;
            if (this.size === "small") return 19;
            if (this.size === "large") return 28;
        },
        tagGroupClasses() {
            const base = {};
            if (this.size) base["tag-group-" + this.size] = this.size;
            return base;
        }
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
            const colorIndex = Math.abs(tag.toString().charCodeAt(0)) % this.colors.length;
            return this.colors[colorIndex];
        },
        tagClasses(tag) {
            const base = {};
            const color = this.getColor(tag);
            if (tag.toString().length < 1) return;
            base["tag-" + color] = color;
            if (this.size) base["tag-" + this.size] = this.size;
            return base;
        },
        deleteTag(index) {
            this.tagsData.splice(index, 1);
        },
        updateTag(event, index) {
            const value = event.target.innerText.toUpperCase();
            if (this.tagsData.includes(value)) {
                event.target.innerText = this.tagsData[index];
                return;
            }
            this.$set(this.tagsData, index, value);
            if (!value || value === "\n") {
                this.$delete(this.tagsData, index);
            }
            event.target.blur();
        },
        focusInput() {
            if (!this.$refs.input) return;
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
