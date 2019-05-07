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

.slide-enter-active,
.slide-leave-active {
    -o-transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    -ms-transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    -moz-transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    -khtml-transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    -webkit-transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.slide-enter,
.slide-leave-to {
    -o-opacity: 0;
    -ms-opacity: 0;
    -moz-opacity: 0;
    -khtml-opacity: 0;
    -webkit-opacity: 0;
    opacity: 0;
    -o-transform: translateY(-10px);
    -ms-transform: translateY(-10px);
    -moz-transform: translateY(-10px);
    -khtml-transform: translateY(-10px);
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
}

.slide-enter-to,
.slide-leave {
    -o-opacity: 1;
    -ms-opacity: 1;
    -moz-opacity: 1;
    -khtml-opacity: 1;
    -webkit-opacity: 1;
    opacity: 1;
}

.dropdown-container {
    position: relative;
    width: 100%;
}

.dropdown-platforme {
    border: 1px solid $border-color;
    border-radius: 5px;
    box-shadow: 0px 6px 15px rgba(36, 37, 38, 0.08);
    font-size: 15px;
    left: 0px;
    list-style: none;
    margin: 0px 0px 0px 0px;
    overflow: hidden;
    padding: 0px;
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
