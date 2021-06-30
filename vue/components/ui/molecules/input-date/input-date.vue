<template>
    <div class="input-date">
        <global-events v-on:click="onGlobalClick" />
        <input-ripe
            type="date"
            v-bind:value.sync="valueDataFormated"
            v-bind="calendarProps"
            v-on:update:value="onInputValue"
            v-on:click.prevent.stop="onClick"
            v-on:focus.prevent="onFocus"
            v-on:keyup.prevent
            v-on:keydown="onKeydown"
        />
        <calendar v-bind:class="calendarClasses" v-bind:value.sync="valueData" ref="calendar" />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.input-date {
    display: inline-block;
    position: relative;
}

.input-date > .calendar {
    opacity: 0;
    pointer-events: none;
    position: absolute;
}

.input-date > .calendar.visible {
    opacity: 1;
    pointer-events: initial;
}
</style>

<script>
import { utilsMixin } from "../../../../mixins";

export const InputDate = {
    mixins: [utilsMixin],
    props: {
        /**
         * If weather or not an interactable header should be used
         * to select the month and year from input.
         */
        header: {
            type: Boolean,
            default: false
        },
        /**
         * The value of input date in String or Date format.
         * Example: "2020/12/31"
         */
        value: {
            type: Number | String,
            default: null
        },
        /**
         * The props to be passed to calendar
         */
        calendarProps: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
            valueData: this.value,
            calendarVisibility: true
        };
    },
    computed: {
        calendarClasses() {
            const base = {};
            if (this.calendarVisibility) base.visible = true;
            return base;
        },
        valueDataFormated() {
            if (!this.valueData) return;
            const date = new Date(this.valueData * 1000);
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            return `${year}-${("0" + (month + 1)).slice(-2)}-${("0" + day).slice(-2)}`;
        }
    },
    watch: {
        value(value) {
            this.valueData = value;
        },
        valueDataFormated(value) {
            this.$emit("update:value", value);
        }
    },
    methods: {
        isValidDate(date) {
            if (!date) return false;
            if (isNaN(date.getTime())) return false;
            if (date.getFullYear().toString().length !== 4) return false;
            return true;
        },
        onGlobalClick(event) {
            const owners = [this.$refs.calendar];
            const insideOwners = owners.some(owner => {
                owner = owner.$el ? owner.$el : owner;
                return owner.contains(event.target);
            });
            if (insideOwners) return;
            this.calendarVisibility = false;
        },
        onClick(event) {
            this.calendarVisibility = true;
        },
        onFocus(event) {
            this.calendarVisibility = true;
        },
        onKeydown(event) {
            if (event?.key !== "Enter") return;
            event.preventDefault();
            this.calendarVisibility = !this.calendarVisibility;
        }
    }
};

export default InputDate;
</script>
