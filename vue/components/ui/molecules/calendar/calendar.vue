<template>
    <div class="calendar">
        <div class="calendar-header">
            <button-icon
                icon="chevron-left"
                v-bind:icon-opacity="1"
                v-bind:disabled="arrowsDisabled"
                v-on:click="onLeftClick"
            />
            <div class="header-center" v-if="header">
                <select-ripe
                    v-bind:options="monthOptions"
                    v-bind:value.sync="month"
                    v-bind:width="120"
                    v-bind:max-height="300"
                />
                <input-ripe
                    v-bind:placeholder="'Year'"
                    v-bind:value="year"
                    type="number"
                    v-bind:min-width="0"
                    v-bind:width="80"
                    v-on:update:value="onYear"
                />
            </div>
            <div class="header-center" v-else v-on:click="onHeaderClick">
                {{ headerText }}
            </div>
            <button-icon
                icon="chevron-right"
                v-bind:icon-opacity="1"
                v-bind:disabled="arrowsDisabled"
                v-on:click="onRightClick"
            />
        </div>
        <div class="calendar-content">
            <transition name="fade" mode="out-in">
                <table class="calendar-table day" v-if="layerIndex === 0" v-bind:key="0">
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
                                v-bind:class="circleDayClass(week[d - 1].day, week[d - 1].month)"
                                v-for="d in 7"
                                v-bind:key="d - 1"
                                v-on:click="onDayClick($event, week[d - 1])"
                            >
                                <div class="circle">
                                    {{ week[d - 1].day }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="calendar-table month" v-if="layerIndex === 1" v-bind:key="1">
                    <tbody class="table-body">
                        <tr class="row" v-for="(month, index) in monthsTable" v-bind:key="index">
                            <td
                                class="cell clickable"
                                v-bind:class="circleMonthClass(month[i - 1])"
                                v-for="i in month.length"
                                v-bind:key="month[i - 1]"
                                v-on:click="onMonthClick($event, month[i - 1])"
                            >
                                <div class="circle months">
                                    {{ month[i - 1] }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="calendar-table year" v-if="layerIndex === 2" v-bind:key="2">
                    <tbody class="table-body">
                        <tr class="row" v-for="(year, index) in yearsTable" v-bind:key="index">
                            <td
                                class="cell clickable"
                                v-bind:class="circleYearClass(year[i - 1])"
                                v-for="i in year.length"
                                v-bind:key="i - 1"
                                v-on:click="onYearClick($event, year[i - 1])"
                            >
                                <div class="circle year">
                                    {{ year[i - 1] }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="calendar-table decade" v-if="layerIndex === 3" v-bind:key="3">
                    <tbody class="table-body">
                        <tr class="row" v-for="(decade, index) in decadesTable" v-bind:key="index">
                            <td
                                class="cell clickable"
                                v-bind:class="circleDecadeClass(decade[i - 1])"
                                v-for="i in decade.length"
                                v-bind:key="i - 1"
                                v-on:click="onDecadeClick($event, decade[i - 1])"
                            >
                                <div class="circle decade">
                                    {{ `${decade[i - 1]} - ${decade[i - 1] + 9}` }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/all.scss";

.calendar {
    border: 1px solid #e4e8f0;
    border-radius: 6px 6px 6px 6px;
    box-shadow: 0px 0px 30px rgba(21, 21, 21, 0.1);
    display: flex;
    flex-direction: column;
    position: absolute;
    transition: opacity 0.35s ease-in-out;
    width: 350px;
}

.calendar > .calendar-header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 10px 10px;
}

.calendar > .calendar-header > .header-center {
    align-items: center;
    cursor: pointer;
    display: inline-block;
    display: flex;
    user-select: none;
}

.calendar > .calendar-content {
    display: flex;
    font-weight: 400;
    height: 100%;
    padding: 0px 20px 10px 20px;
}

.calendar > .calendar-content .calendar-table {
    position: relative;
    width: 100%;
}

.calendar > .calendar-content .calendar-table .table-header .row {
    height: 40px;
}

.calendar > .calendar-content .calendar-table .table-header .row .heading {
    font-weight: 400;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell {
    box-sizing: border-box;
    height: 40px;
    padding: 0px;
    text-align: center;
    width: 40px;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell.clickable {
    cursor: pointer;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell .circle {
    border-radius: 50%;
    color: #1d2631;
    height: 40px;
    line-height: 40px;
    margin: auto;
    user-select: none;
    width: 40px;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell .circle.months,
.calendar > .calendar-content .calendar-table .table-body .row .cell .circle.decade {
    height: 100%;
    width: 100%;
    border-radius: 20px;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell.clickable:not(.selected):hover .circle,
.calendar > .calendar-content .calendar-table .table-body .row .cell.clickable:not(.selected):focus .circle,
.calendar > .calendar-content .calendar-table .table-body .row .cell.clickable:not(.selected):focus-visible .circle {
    background-color: #ecf0f3;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell:not(.clickable) .circle {
    color: #bac2cb;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell.selected .circle {
    background-color: #1d2631;
    color: #ffffff;
}

.calendar .select ::v-deep .select-container .select-button {
    background-color: #ffffff;
}
</style>

<script>
export const Calendar = {
    props: {
        /**
         * The value of input date in String or Date format.
         * Example: "2020/12/31"
         */
        value: {
            type: Date | String,
            default: null
        },
        /**
         * Month labels to be used directly starting from January.
         */
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
        /**
         * Week labels to be used directly starting from Sunday.
         */
        weekLabels: {
            type: Array,
            default: () => ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        },
        /**
         * Layer labels to be used directly.
         * Value should be in the following order:
         * month, year, decade.
         */
        layerLabels: {
            type: Array,
            default: () => ["Month", "Year", "Decade"]
        },
        /**
         * If weather or not an interactable header should be used
         * to select the month and year from input.
         */
        header: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            valueData: this.value,
            calendarVisibility: true,
            day: 1,
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            layerIndex: 0,
            decade: new Date().getFullYear() - (new Date().getFullYear() % 10)
        };
    },
    computed: {
        circleDayClass() {
            return (day, month) => ({
                clickable: this.month === month,
                selected:
                    this.selectedDay === day &&
                    this.selectedMonth === month &&
                    this.selectedYear === this.year
            });
        },
        circleMonthClass() {
            return month => ({
                selected: this.selectedMonth === this.monthLabels.findIndex(m => m === month)
            });
        },
        circleYearClass() {
            return year => ({
                selected: this.selectedYear === year
            });
        },
        circleDecadeClass() {
            return year => ({
                selected: this.selectedYear < year + 10 && this.selectedYear >= year
            });
        },
        arrowsDisabled() {
            return this.layerIndex === 1;
        },
        headerText() {
            if (this.layerIndex === 0) return `${this.monthName} ${this.year}`;
            return this.layerLabels[this.layerIndex - 1];
        },
        weekLabelsComputed() {
            const weekLabels = [...this.weekLabels];
            const lastDays = weekLabels.splice(0, 1);
            weekLabels.push(...lastDays);
            return weekLabels;
        },
        monthsTable() {
            return this._splitArray(this.monthLabels, 4);
        },
        yearsTable() {
            const startYear = this.year - (this.year % 10);
            const years = Array.from({ length: 10 }, (_, i) => startYear + i);
            return this._splitArray(years, 7);
        },
        decadesTable() {
            const startYear = this.year - (this.year % 10);
            const decades = Array.from({ length: 10 }, (_, i) => startYear + (i * 10));
            return this._splitArray(decades, 4);
        },
        monthOptions() {
            return this.monthLabels.map((month, index) => ({ value: index, label: month }));
        },
        monthName() {
            return this.monthOptions[this.month]?.label;
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
            this.setDate(value);
        },
        valueData(value) {
            this.$emit("update:value", value);
        }
    },
    created: function() {
        this.setDate(this.value);
    },
    methods: {
        _splitArray(array, count) {
            const result = [];
            const copy = [...array];
            while (copy.length) result.push(copy.splice(0, count));
            return result;
        },
        isValidDate(date) {
            if (!date) return false;
            if (isNaN(date.getTime())) return false;
            if (date.getFullYear().toString().length !== 4) return false;
            return true;
        },
        nextMonth() {
            if (this.month === 11) this.year += 1;
            this.setMonth(this.month + 1);
        },
        previousMonth() {
            if (this.month === 0) this.year -= 1;
            this.setMonth(this.month - 1);
        },
        nextYear(increment = 10) {
            this.year += increment;
        },
        previousYear(increment = 10) {
            this.year -= increment;
        },
        setDate(date) {
            if (!this.isValidDate(date)) return;
            this.valueData = date;
            this.year = date.getFullYear();
            this.month = date.getMonth();
        },
        setLayerIndex(index) {
            if (index > 3) return;
            this.layerIndex = index;
        },
        setMonth(month) {
            if (isNaN(month)) return;
            const monthNumber = parseInt(month);
            this.month = monthNumber < 0 ? 11 : parseInt(month) % 12;
        },
        setYear(year) {
            if (isNaN(year)) return;
            this.year = parseInt(year);
        },
        onYear(value) {
            this.setYear(value);
        },
        onHeaderClick(event) {
            const index = this.layerIndex + 1;
            this.setLayerIndex(index);
        },
        onDayClick(event, date) {
            if (date.month !== this.month) return;
            this.valueData = new Date(this.year, date.month, date.day);
        },
        onMonthClick(event, monthName) {
            this.month = this.monthLabels.findIndex(m => m === monthName);
            this.setLayerIndex(this.layerIndex - 1);
        },
        onYearClick(event, year) {
            this.setYear(year);
            this.setLayerIndex(this.layerIndex - 1);
        },
        onDecadeClick(event, decade) {
            this.setYear(decade);
            this.setLayerIndex(this.layerIndex - 1);
        },
        onLeftClick(event) {
            switch (this.layerIndex) {
                case 0:
                    this.previousMonth();
                    break;
                case 2:
                    this.previousYear();
                    break;
                case 3:
                    this.previousYear(100);
                    break;
            }
        },
        onRightClick(event) {
            switch (this.layerIndex) {
                case 0:
                    this.nextMonth();
                    break;
                case 2:
                    this.nextYear();
                    break;
                case 3:
                    this.nextYear(100);
                    break;
            }
        }
    }
};

export default Calendar;
</script>
