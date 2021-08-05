<template>
    <div class="calendar">
        <div class="calendar-header" v-bind:class="headerClasses" v-on:click="onHeaderClick">
            <button-icon
                icon="chevron-left"
                icon-color="#1d2631"
                v-bind:icon-opacity="1"
                v-bind:icon-stroke-width="3"
                v-bind:disabled="arrowsDisabled"
                v-on:click.stop="onLeftClick"
            />
            <div class="header-center">
                {{ headerText }}
            </div>
            <button-icon
                icon="chevron-right"
                icon-color="#1d2631"
                v-bind:icon-stroke-width="3"
                v-bind:icon-opacity="1"
                v-bind:disabled="arrowsDisabled"
                v-on:click.stop="onRightClick"
            />
        </div>
        <transition-group
            class="calendar-content"
            v-bind:class="calendarContentClasses"
            tag="div"
            name="fade"
            mode="out-in"
        >
            <table class="calendar-table day" v-show="layerIndex === 0" v-bind:key="0">
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
                            v-bind:class="
                                circleDayClass(week[dayIndex - 1].day, week[dayIndex - 1].month)
                            "
                            v-for="dayIndex in 7"
                            v-bind:key="dayIndex"
                            v-on:click="onDayClick($event, week[dayIndex - 1])"
                        >
                            <div class="circle days">
                                {{ week[dayIndex - 1].day }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="calendar-table month" v-show="layerIndex === 1" v-bind:key="1">
                <tbody class="table-body">
                    <tr class="row" v-for="(month, index) in monthsTable" v-bind:key="index">
                        <td
                            class="cell clickable"
                            v-bind:class="circleMonthClass(month[monthIndex - 1])"
                            v-for="monthIndex in month.length"
                            v-bind:key="monthIndex"
                            v-on:click="onMonthClick($event, month[monthIndex - 1])"
                        >
                            <div class="circle months">
                                {{ month[monthIndex - 1] }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="calendar-table year" v-show="layerIndex === 2" v-bind:key="2">
                <tbody class="table-body">
                    <tr class="row" v-for="(year, index) in yearsTable" v-bind:key="index">
                        <td
                            class="cell clickable"
                            v-bind:class="circleYearClass(year[yearIndex - 1])"
                            v-for="yearIndex in year.length"
                            v-bind:key="yearIndex"
                            v-on:click="onYearClick($event, year[yearIndex - 1])"
                        >
                            <div class="circle years">
                                {{ year[yearIndex - 1] }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="calendar-table decades" v-show="layerIndex === 3" v-bind:key="3">
                <tbody class="table-body">
                    <tr class="row" v-for="(decade, index) in decadesTable" v-bind:key="index">
                        <td
                            class="cell clickable"
                            v-bind:class="circleDecadeClass(decade[decadeIndex - 1])"
                            v-for="decadeIndex in decade.length"
                            v-bind:key="decadeIndex"
                            v-on:click="onDecadeClick($event, decade[decadeIndex - 1])"
                        >
                            <div class="circle decades">
                                {{ `${decade[decadeIndex - 1]} - ${decade[decadeIndex - 1] + 9}` }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </transition-group>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.calendar {
    border: 1px solid #e4e8f0;
    border-radius: 6px 6px 6px 6px;
    box-shadow: 0px 0px 12px rgba(21, 21, 21, 0.1);
    display: flex;
    flex-direction: column;
    transition: opacity 0.125s ease-in-out;
    width: 350px;
}

.calendar > .calendar-header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 10px 10px;
}

.calendar > .calendar-header.clickable {
    cursor: pointer;
}

.calendar > .calendar-header > .header-center {
    align-items: center;
    border: 3px solid transparent;
    border-radius: 20px;
    display: flex;
    font-weight: 400;
    height: 26px;
    justify-content: center;
    transition: color 0.35s ease-in-out, background-color 0.35s ease-in-out, opacity 0.125s;
    -webkit-user-select: none;
    user-select: none;
    width: 100%;
}

.calendar > .calendar-header.dark > .header-center {
    background-color: $dark-blue;
    border-color: #ecf0f3;
    color: $white;
}

.calendar > .calendar-header.clickable > .header-center:hover {
    opacity: 0.6;
}

.calendar > .calendar-content {
    display: grid;
    grid-column: 1 / 1;
    grid-row: 1 / 1;
    height: 300px;
    padding: 0px 20px 10px 20px;
}

.calendar > .calendar-content .calendar-table {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
    height: 100%;
    width: 100%;
}

.calendar > .calendar-content .calendar-table .table-header .row {
    height: 40px;
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
    align-items: center;
    border-radius: 50%;
    box-sizing: border-box;
    color: $dark-blue;
    display: flex;
    height: 40px;
    justify-content: center;
    margin: auto;
    user-select: none;
    width: 40px;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell .circle.months,
.calendar > .calendar-content .calendar-table .table-body .row .cell .circle.years,
.calendar > .calendar-content .calendar-table .table-body .row .cell .circle.decades {
    border-radius: 20px;
    font-weight: bold;
    width: 100%;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell.clickable:not(.selected):hover .circle {
    background-color: #ecf0f3;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell:not(.clickable) .circle {
    color: #bac2cb;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell.selected .circle {
    background-color: $dark-blue;
    border: 3px solid #ecf0f3;
    color: $white;
    line-height: 35px;
    transition: background-color 0.35s ease-in-out;
}

.calendar .select ::v-deep .select-container .select-button {
    background-color: $white;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.35s, transform 0.35s;
}

.calendar-content.expand .fade-leave-to,
.calendar-content.collapse .fade-enter {
    opacity: 0;
    transform: scale(1.2);
}

.calendar-content.expand .fade-enter,
.calendar-content.collapse .fade-leave-to {
    opacity: 0;
    transform: scale(0.8);
}
</style>

<script>
export const Calendar = {
    props: {
        /**
         * The value of input date in epoch format.
         */
        value: {
            type: Number,
            default: null
        },
        /**
         * Month labels to be used directly starting from January.
         */
        monthLabels: {
            type: Array,
            default: () => [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
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
         * to select the month, year and decade.
         */
        header: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            valueData: this.value,
            day: 1,
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            layerIndex: 0,
            decade: new Date().getFullYear() - (new Date().getFullYear() % 10),
            layerIndexOperation: null
        };
    },
    computed: {
        calendarContentClasses() {
            const base = {
                collapse: this.layerIndexOperation === "collapse",
                expand: this.layerIndexOperation === "expand"
            };
            return base;
        },
        headerClasses() {
            const base = {
                clickable: this.header,
                dark: this.layerIndex === 0
            };
            return base;
        },
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
            return this._splitArray(years, 4);
        },
        decadesTable() {
            const startYear = this.year - (this.year % 10);
            const decades = Array.from({ length: 10 }, (_, i) => startYear + i * 10);
            return this._splitArray(decades, 3);
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
                new Array(7).fill(0).map(_ => {
                    const day = new Date(date);
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
        valueEpoch() {
            if (!this.valueData) return;
            return Math.round(this.valueData.getTime() / 1000);
        }
    },
    watch: {
        value(value) {
            const date = new Date(parseInt(value) * 1000);
            this.setDate(date);
        },
        valueEpoch(value) {
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
            if (index < 0 || index > 3) return;

            if (this.layerIndex > index) this.layerIndexOperation = "expand";
            else if (this.layerIndex < index) this.layerIndexOperation = "collapse";
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
            if (!this.header) return;
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
