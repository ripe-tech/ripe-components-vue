<template>
    <div class="calendar">
        <div class="calendar-header">
            <button-icon
                icon="chevron-left"
                icon-color="#1d2631"
                v-bind:icon-opacity="1"
                v-bind:icon-stroke-width="3"
                v-on:click.stop="onLeftClick"
            />
            <div class="header-center">
                {{ headerText }}
            </div>
            <button-icon
                icon="chevron-right"
                icon-color="#1d2631"
                v-bind:icon-opacity="1"
                v-bind:icon-stroke-width="3"
                v-on:click.stop="onRightClick"
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
                            v-bind:class="circleClass(week[day - 1].day, week[day - 1].month)"
                            v-for="day in 7"
                            v-bind:key="day"
                            v-on:click="onCellClick(week[day - 1])"
                        >
                            <div class="circle">
                                {{ week[day - 1].day }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.calendar {
    border: 1px solid #e4e8f0;
    border-radius: 6px 6px 6px 6px;
    box-shadow: 0px 0px 30px rgba(21, 21, 21, 0.1);
    display: flex;
    flex-direction: column;
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
    display: inline-block;
    display: flex;
}

.calendar > .calendar-content {
    display: flex;
    font-weight: 400;
    height: 100%;
    padding: 0px 20px 10px 20px;
}

.calendar > .calendar-content .calendar-table {
    width: 100%;
}

.calendar > .calendar-content .calendar-table .table-header .row {
    height: 40px;
}

.calendar > .calendar-content .calendar-table .table-header .row .heading {
    font-weight: 400;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell {
    height: 40px;
    padding: 0px;
    text-align: center;
    width: 40px;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell.clickable {
    cursor: pointer;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell .circle {
    border: 3px solid transparent;
    border-radius: 50%;
    box-sizing: border-box;
    color: #1d2631;
    height: 40px;
    line-height: 35px;
    margin: auto;
    user-select: none;
    width: 40px;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell.clickable:not(.selected):hover .circle {
    background-color: #ecf0f3;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell:not(.clickable) .circle {
    color: #bac2cb;
}

.calendar > .calendar-content .calendar-table .table-body .row .cell.selected .circle {
    background-color: #1d2631;
    border: 3px solid #ecf0f3;
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
            type: String,
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
        }
    },
    data: function() {
        return {
            valueData: this.value,
            day: 1,
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        };
    },
    computed: {
        headerText() {
            return `${this.monthName} ${this.year}`;
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
        circleClass(day, month) {
            return {
                clickable: this.month === month,
                selected:
                    this.selectedDay === day &&
                    this.selectedMonth === month &&
                    this.selectedYear === this.year
            };
        },
        isValidDate(date) {
            if (!date) return false;
            if (isNaN(date.getTime())) return false;
            if (date.getFullYear().toString().length !== 4) return false;
            return true;
        },
        setDate(date) {
            if (!this.isValidDate(date)) return;
            this.valueData = date;
            this.year = date.getFullYear();
            this.month = date.getMonth();
        },
        onYear(value) {
            if (isNaN(value)) return;
            this.year = parseInt(value);
        },
        onCellClick(date) {
            if (date.month !== this.month) return;
            this.valueData = new Date(this.year, date.month, date.day);
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
        }
    }
};

export default Calendar;
</script>
