<template>
    <div class="dropdown-container">
        <transition name="slide">
            <ul class="dropdown-platforme" v-show="visible">
                <li
                    class="dropdown-item"
                    v-bind:click="() => $emit('item-clicked', item)"
                    v-for="item in items"
                    v-bind:key="item.id"
                >
                    <slot v-bind:item="item">
                        <router-link v-bind:to="item.link" v-if="item.link">
                            {{ item.text }}
                        </router-link>
                        <span v-else>{{ item.text }}</span>
                    </slot>
                </li>
            </ul>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.dropdown-container {
    position: relative;
    width: 100%;
}

.dropdown-platforme {
    border: 1px solid $border-color;
    border-radius: 5px;
    box-shadow: 0px 6px 15px rgba(36, 37, 38, 0.08);
    font-size: 15px;
    list-style: none;
    margin: 0px 0px 0px 0px;
    overflow: hidden;
    position: absolute;
    right: 0px;
    text-align: center;
}

.dropdown-platforme > .dropdown-item {
    background-color: #ffffff;
    cursor: pointer;
    line-height: normal;
    margin: 0px 0px 0px 0px;
    overflow: hidden;
    padding: 12px 16px 12px 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dropdown-platforme > .dropdown-item:hover,
.dropdown-platforme > .dropdown-item.selected {
    background-color: $selected-color;
}

.dropdown-platforme > .dropdown-item > a {
    border-bottom: none;
    color: #4d4d4d;
    display: block;
    font-weight: 600;
    padding-bottom: 0px;
}

.dropdown-platforme > .dropdown-item:hover > a,
.dropdown-platforme > .dropdown-item.selected > a {
    color: #4078c0;
}
</style>

<script>
import Vue from "vue";

export const DropdownPlatforme = {
    name: "dropdown-platforme",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        visible: {
            type: Boolean,
            default: true
        }
    }
};

export default DropdownPlatforme;
</script>
