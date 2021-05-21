<template>
    <div class="input-date">
        <global-events v-on:click="onGlobalClick" />
        <input-ripe
            class="input-date"
            type="date"
            v-bind:value="valueDataFormated"
            v-on:update:value="onInputValue"
            v-on:click.prevent.stop="onClick"
            v-on:focus.prevent="onFocus"
            v-on:keyup.prevent="onKeyup"
        />
        <div class="calendar-container" v-bind:class="calendarClasses" ref="calendarContainer">
            <div class="calendar-header">
                <button-icon icon="chevron-left" v-bind:icon-opacity="1" v-on:click="onLeftClick" />
                <div class="header-center">
                    <select-ripe
                        v-bind:options="monthOptions"
                        v-bind:value.sync="month"
                        v-bind:width="120"
                    />
                    <input-ripe
                        v-bind:placeholder="'Year'"
                        v-bind:value="year"
                        type="number"
                        variant="dark"
                        v-bind:min-width="0"
                        v-bind:width="80"
                        v-on:update:value="onYear"
                    />
                </div>
                <button-icon
                    icon="chevron-right"
                    v-bind:icon-opacity="1"
                    v-on:click="onRightClick"
                />
            </div>
            <div class="calendar-content">
                <table class="calendar-table">
                    <thead class="table-header">
                        <tr class="row">
                            <th
                                class="heading"
                                v-for="weekLabel in weekLabelsComputed"
                                v-bind:key="weekLabel"
                            >
                                {{ weekLabel }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="table-body">
                        <tr class="row" v-for="(week, index) in weeks" v-bind:key="index">
                            <td
                                class="cell"
                                v-bind:class="circleClass(week[d - 1].day, week[d - 1].month)"
                                v-for="d in 7"
                                v-bind:key="d - 1"
                                v-on:click="onCellClick(week[d - 1])"
                                v-on:keydown.enter.exact="onCellClick(week[d - 1])"
                            >
                                <div class="circle">
                                    {{ week[d - 1].day }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.input-date {
    display: inline-block;
    position: relative;
}

.input-date > .calendar-container {
    box-shadow: 0px 0px 30px rgba(21, 21, 21, 0.1);
    display: flex;
    flex-direction: column;
    opacity: 0;
    position: absolute;
    transition: opacity 0.35s ease-in-out;
    width: 350px;
}

.input-date > .calendar-container.visible {
    opacity: 1;
}

.input-date > .calendar-container > .calendar-header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 10px 10px;
}

.input-date > .calendar-container > .calendar-header > .header-center {
    align-items: center;
    display: inline-block;
    display: flex;
}

.input-date > .calendar-container > .calendar-content {
    display: flex;
    font-weight: 400;
    height: 100%;
    padding: 0px 20px 10px 20px;
}

.input-date > .calendar-container > .calendar-content .calendar-table {
    width: 100%;
}

.input-date > .calendar-container > .calendar-content .calendar-table .table-header .row {
    height: 40px;
}

.input-date > .calendar-container > .calendar-content .calendar-table .table-header .row .heading {
    font-weight: 400;
}

.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell {
    cursor: pointer;
    height: 40px;
    padding: 0px;
    text-align: center;
    width: 40px;
}

.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell .circle {
    border-radius: 50%;
    color: #1d2631;
    height: 40px;
    line-height: 40px;
    user-select: none;
    width: 40px;
}

.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell:not(.selected):hover,
.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell:not(.selected):focus,
.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell:not(.selected):focus-visible {
    outline: none !important;
}

.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell:not(.selected):hover .circle,
.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell:not(.selected):focus .circle,
.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell:not(.selected):focus-visible .circle {
    background-color: #ecf0f3;
}

.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell.subtle .circle {
    color: #bac2cb;
}

.input-date- > .calendar-container > .calendar-content .calendar-table .table-body .row .cell.selected .circle {
    background-color: #1d2631;
    color: #ffffff;
}
</style>

<script>
export const InputDate = {
    props: {
        value: {
            default: null
        },
        monthLabels: {
            type: Array,
            default: () => [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ]
        },
        weekLabels: {
            type: Array,
            default: () => ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        },
        multiDate: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            valueData: this.value,
            calendarVisibility: true,
            day: 1,
            month: 10,
            year: 2020
        };
    },
    computed: {
        classes() {
            const base = {};
            if (this.inputProps && this.inputProps.disabled) base.disabled = true;
            if (!this.hasValidColor) base.invalid = true;
            return base;
        },
        calendarClasses() {
            const base = {};
            if (this.calendarVisibility) base.visible = true;
            return base;
        },
        circleClass() {
            return (day, month) => ({
                subtle: this.month !== month,
                selected:
                    this.selectedDay === day &&
                    this.selectedMonth === month &&
                    this.selectedYear === this.year
            });
        },
        weekLabelsComputed() {
            const weekLabels = [...this.weekLabels];
            const lastDays = weekLabels.splice(0, 1);
            weekLabels.push(...lastDays);
            return weekLabels;
        },
        monthOptions() {
            return this.monthLabels.map((month, index) => ({ value: index, label: month }));
        },
        weeks() {
            const date = new Date(this.year, this.month, 1);
            const firstMonday = date.getDay() === 0 ? -5 : date.getDate() - date.getDay() + 1;
            date.setDate(firstMonday);
            const weeks = new Array(6).fill(0).map(() =>
                new Array(7).fill(0).map(day => {
                    day = new Date(date);
                    date.setDate(date.getDate() + 1);
                    return { day: day.getDate(), month: day.getMonth() };
                })
            );
            return weeks;
        },
        selectedDay() {
            return this.valueData?.getDate();
        },
        selectedMonth() {
            return this.valueData?.getMonth();
        },
        selectedYear() {
            return this.valueData?.getFullYear();
        },
        valueDataFormated() {
            return `${this.selectedYear}-${("0" + (this.selectedMonth + 1)).slice(-2)}-${(
                "0" + this.selectedDay
            ).slice(-2)}`;
        }
    },
    watch: {
        value(value) {
            this.valueData = value;
        },
        valueData(value) {
            this.$emit("update:value", value);
        }
    },
    methods: {
        onYear(value) {
            if (isNaN(value)) return;
            this.year = parseInt(value);
        },
        onGlobalClick() {
            const owners = [this.$refs.calendarContainer];
            const insideOwners = owners.some(owner => {
                owner = owner.$el ? owner.$el : owner;
                return owner.contains(event.target);
            });
            if (insideOwners) return;
            this.calendarVisibility = false;
        },
        onCellClick(date) {
            this.valueData = new Date(this.year, date.month, date.day);
            this.day = date.day;
        },
        onLeftClick() {
            if (this.month === 0) {
                this.month = 11;
                this.year -= 1;
            } else {
                this.month -= 1;
            }
        },
        onRightClick() {
            if (this.month === 11) {
                this.month = 0;
                this.year += 1;
            } else {
                this.month += 1;
            }
        },
        onKeyup() {},
        onClick(event) {
            this.calendarVisibility = true;
        },
        onInputValue(value) {
            this.valueData = new Date(value);
        },
        onFocus() {
            this.calendarVisibility = true;
        }
    }
};

export default InputDate;
</script>
