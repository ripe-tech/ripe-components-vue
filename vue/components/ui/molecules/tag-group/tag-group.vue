<template>
    <div class="tag-group" v-bind:class="tagGroupClasses" v-on:click="focusInput">
        <transition-group name="tag-container" tag="span">
            <tag
                v-bind:color="generateColor(tag)"
                v-bind:size="size"
                v-bind:subtle="subtle"
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
            </tag>
        </transition-group>
        <input
            class="tag-input"
            v-bind:placeholder="inputPlaceholder"
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
    display: inline-block;
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
    display: inline-flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 3px 2px 3px 2px;
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

.tag-group .tag .button-icon:hover {
    background-color: #ffffff69;
}
</style>

<script>
export const TagGroup = {
    name: "tag-group",
    props: {
        tags: {
            type: Array,
            default: () => []
        },
        hasInput: {
            type: Boolean,
            default: true
        },
        inputPlaceholder: {
            type: String,
            default: "Write and press enter..."
        },
        size: {
            type: String,
            default: "medium"
        },
        subtle: {
            type: Boolean,
            default: true
        },
        colors: {
            type: Array,
            default: () => ["grey", "orange", "blue", "green", "red", "purple"]
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
            if (this.size === "medium") return 22;
            if (this.size === "small") return 19;
            if (this.size === "large") return 28;
        },
        tagClasses(tag) {
            const base = {};
            const color = this.generateColor(tag);
            if (tag.toString().length < 1) return;
            base["tag-" + color] = color;
            if (this.size) base["tag-" + this.size] = this.size;
            return base;
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
        tagsData(value) {
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
        deleteTag(index) {
            this.tagsData.splice(index, 1);
        },
        generateColor(tag) {
            const colorIndex = Math.abs(tag.toString().charCodeAt(0)) % this.colors.length;
            return this.colors[colorIndex];
        },
        focusInput() {
            if (!this.$refs.input) return;
            this.$refs.input.focus();
        },
        onClickTag(event) {
            const toEdit = event.target.getElementsByClassName("text")[0];
            if (toEdit) toEdit.focus();
        }
    }
};

export default TagGroup;
</script>
