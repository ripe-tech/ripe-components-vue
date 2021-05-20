<template>
    <div class="input-date-container">
        <global-events v-on:click="onGlobalClick" />
        <input-ripe
            class="input-date"
            type="date"
            v-on:click.prevent
            v-on:focus.prevent="onFocus"
            v-on:blur.prevent="onBlur"
            v-on:keyup.prevent="onKeyup"
        />
        <div class="calendar-container" v-bind:class="calendarClasses">
            <div class="calendar-header">
                <icon icon="chevron-left" v-bind:width="20" v-on:click="onLeftClick" />
                <div class="header-center">
                    <select-ripe v-bind:options="monthOptions" v-bind:value.sync="monthIndex" v-bind:width="120" />
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
                <icon icon="chevron-right" v-bind:width="20" v-on:click="onRightClick" />
            </div>
            <div class="calendar-content">
                <table class="calendar-table">
                    <thead class="table-header">
                        <tr class="row">
                            <th scope="col" v-for="weekLabel in weekLabels" v-bind:key="weekLabel">
                                {{ weekLabel }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="table-body">
                        <tr class="row" v-for="(week, index) in weeks" v-bind:key="index">
                            <td class="cell" v-for="index in 7" v-bind:key="index - 1">
                                <div class="circle">
                                    {{ week[index - 1] }}
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

.input-date-container {
    display: inline-block;
    position: relative;
}

.input-date-container > .calendar-container {
    box-shadow: 0px 0px 30px rgba(21, 21, 21, 0.1);
    display: flex;
    flex-direction: column;
    position: absolute;
    // opacity: 0;
    transition: opacity 0.35s ease-in-out;
    width: 350px;
}

.input-date-container > .calendar-container.visible {
    opacity: 1;
}

.input-date-container > .calendar-container > .calendar-header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0px 10px 0px 10px;
}

.input-date-container > .calendar-container > .calendar-header > .header-center {
    align-items: center;
    display: inline-block;
    display: flex;
}

.input-date-container > .calendar-container > .calendar-content {
    display: flex;
    height: 100%;
}

.input-date-container > .calendar-container > .calendar-content .calendar-table {
    width: 100%;
}

.input-date-container > .calendar-container > .calendar-content .calendar-table .table-body .row .cell {
    height: 40px;
    padding: 0px;
    text-align: center;
    width: 40px;
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
                "Decembeer"
            ]
        },
        weekLabels: {
            type: Array,
            default: () => ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
        },
        /**
         * First day of week in numeric format.
         * Starts at 0 (Sunday) and ends at 6 (Saturday)
         */
        firstWeekDayIndex: {
            type: Number,
            default: 1
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
            monthIndex: 4,
            year: 2021
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
        style() {
            const base = {
                "background-color": this.valueData === null ? null : this.inputValue,
                height: this.height === null ? null : this.height + "px"
            };
            return base;
        },
        monthOptions() {
            return this.monthLabels.map((month, index) => ({ value: index, label: month }));
        },
        weeks() {
            const weeks = [];
            const monthDays = new Date(this.year, this.monthIndex + 1, 0).getDate();
            let dayOfWeekIndex = new Date(this.year, this.monthIndex, 1).getDay();
            for (let day = 1; day <= monthDays; day++, dayOfWeekIndex++) {
                if (dayOfWeekIndex % 7 === this.firstWeekDayIndex || weeks.length === 0) weeks.push({});
                const formatedDayOfWeek = dayOfWeekIndex === 0 ? 6 : (dayOfWeekIndex - this.firstWeekDayIndex) % 7;
                weeks[weeks.length - 1][formatedDayOfWeek] = day;
            }
            return weeks;
        },
        weeksFilled() {
            const weeks = JSON.parse(JSON.stringify(this.weeks));
            while (weeks.length < 6) weeks.push({});
            let lastMonthDays = new Date(this.year, this.monthIndex, 0).getDate();
            for (let i = 6; i >= 0; i--) {
                if (weeks[0][i] !== undefined) continue;
                weeks[0][i] = lastMonthDays;
                lastMonthDays -= 1;
            }
            return weeks;
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
            this.calendarVisibility = 0;
        },
        onLeftClick() {
            if (this.monthIndex === 0) {
                this.monthIndex = 11;
                this.year -= 1;
            } else {
                this.monthIndex -= 1;
            }
        },
        onRightClick() {
            if (this.monthIndex === 11) {
                this.monthIndex = 0;
                this.year += 1;
            } else {
                this.monthIndex += 1;
            }
        },
        onKeyup() {
            console.log("keyup");
        },
        onFocus() {
            this.calendarVisibility = true;
        },
        onBlur() {
            this.calendarVisibility = false;
        }
    }
};

export default InputDate;
</script>
