<template>
    <div class="side-platforme" v-bind:class="visible ? 'visible' : 'invisible'">
        <global-events v-on:keyup.esc="visible = false" />
        <ul>
            <li
                v-bind:class="[link.id, { selected: link.selected }]"
                v-for="(link, index) in links"
                v-bind:key="link.id + index"
            >
                <router-link v-bind:to="link.link" v-if="link.link">
                    {{ link.text }}
                </router-link>
                <span v-else>{{ link.text }}</span>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.side-platforme {
    background: #ffffff;
    border-right: 1px solid #e4e8f0;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0);
    height: 100%;
    left: -280px;
    padding-top: 61px;
    position: fixed;
    top: 0px;
    transition: left 0.25s cubic-bezier(0.645, 0.045, 0.355, 1),
        box-shadow 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 280px;
}

.side-platforme.visible {
    box-shadow: 0px 6px 15px rgba(36, 37, 38, 0.08);
    left: 0px;
}

.side-platforme ul {
    font-size: 15px;
    font-weight: 600;
    margin: 12px 0px 12px 0px;
    text-align: left;
}

.side-platforme ul > li {
    cursor: pointer;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
}

.side-platforme ul > li.separator {
    border-top: 1px solid $border-color;
    cursor: default;
    height: 0px;
    margin: 6px 0px 6px 0px;
    padding: 0px 0px 0px 0px;
}

.side-platforme ul > li:hover,
.side-platforme ul > li.selected {
    background-color: $selected-color;
    color: #4078c0;
}

.side-platforme ul > li a,
.side-platforme ul > li span {
    border: none;
    box-sizing: border-box;
    display: inline-block;
    padding: 12px 24px 12px 24px;
    width: 100%;
}

.side-platforme ul > li.separator span {
    padding: 0px;
}
</style>

<script>
export const SidePlatforme = {
    props: {
        links: {
            type: Array,
            default: () => []
        }
    },
    data: function() {
        return {
            visible: false
        };
    },
    watch: {
        visible(value) {
            const event = value ? "show-overlay" : "hide-overlay";
            this.$bus.$emit(event);
        },
        $route(to, from) {
            this.visible = false;
        }
    },
    mounted: function() {
        this.$bus.$on("toggle-side", payLoad => {
            this.visible = !this.visible;
        });
        this.$bus.$on("overlay-clicked", () => {
            this.visible = false;
        });
    }
};

export default SidePlatforme;
</script>
