<template>
    <div class="input-date">
        <global-events v-on:click="onGlobalClick" />
        <input-ripe
            type="date"
            v-bind:value="valueDataFormated"
            v-on:update:value="onInputValue"
            v-on:click.prevent.stop="onClick"
            v-on:focus.prevent="onFocus"
            v-on:keyup.prevent
            v-on:keydown="onKeydown"
        />
        <div class="calendar-container" v-bind:class="calendarClasses" ref="calendarContainer">
            <div class="calendar-header">
                <button-icon icon="chevron-left" v-bind:icon-opacity="1" v-on:click="onLeftClick" />
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
                <div class="header-center" v-else>
                    {{ monthName }} {{ year }}
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
    pointer-events: none;
    width: 350px;
}

.input-date > .calendar-container.visible {
    opacity: 1;
    pointer-events: initial;
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
    height: 40px;
    padding: 0px;
    text-align: center;
    width: 40px;
}

.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell.clickable {
    cursor: pointer;
}

.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell .circle {
    border-radius: 50%;
    color: #1d2631;
    height: 40px;
    line-height: 40px;
    user-select: none;
    width: 40px;
}

.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell.clickable:not(.selected):hover .circle,
.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell.clickable:not(.selected):focus .circle,
.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell.clickable:not(.selected):focus-visible .circle {
    background-color: #ecf0f3;
}

.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell:not(.clickable) .circle {
    color: #bac2cb;
}

.input-date > .calendar-container > .calendar-content .calendar-table .table-body .row .cell.selected .circle {
    background-color: #1d2631;
    color: #ffffff;
}

.input-date ::v-deep .select .select-container .select-button {
    background-color: #ffffff;
}
</style>

<script>
export const InputDate = {
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
            year: new Date().getFullYear()
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
                clickable: this.month === month,
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
            this.valueData = value;
        },
        valueData(value) {
            this.$emit("update:value", value);
        }
    },
    created: function() {
        this.setDate(this.value);
    },
    methods: {
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
        onGlobalClick(event) {
            const owners = [this.$refs.calendarContainer];
            const insideOwners = owners.some(owner => {
                owner = owner.$el ? owner.$el : owner;
                return owner.contains(event.target);
            });
            if (insideOwners) return;
            this.calendarVisibility = false;
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
        },
        onClick(event) {
            this.calendarVisibility = true;
        },
        onInputValue(value) {
            const date = new Date(value);
            this.setDate(date);
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