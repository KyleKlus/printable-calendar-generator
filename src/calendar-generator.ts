import { DateTime } from "luxon";
import { CalendarSettings } from "./settings-handler";

interface IDateRange {
    start: DateTime;
    end: DateTime;
}

export class CalendarGenerator {
    generate(settings: CalendarSettings) {
        const generatorEl = document.getElementById('generator');
        if (!generatorEl?.classList.contains('is-hidden')) {
            generatorEl?.classList.add('is-hidden');
        }

        const calendarEl = document.getElementById('calendar-display') as HTMLDivElement;
        calendarEl?.replaceChildren();
        if (calendarEl?.classList.contains('is-hidden')) {
            calendarEl?.classList.remove('is-hidden');
        }

        const hideCalendarButton = document.getElementById('hide-calendar') as HTMLButtonElement;
        if (hideCalendarButton?.classList.contains('is-hidden')) {
            hideCalendarButton?.classList.remove('is-hidden');
        }
        hideCalendarButton.addEventListener('click', () => {
            this.hide();
        });

        const dateRange = this.getDateRange();

        if (dateRange === null) return;

        this.buildMonths(dateRange, settings, calendarEl);
    }

    hide() {
        const generatorEl = document.getElementById('generator');
        if (generatorEl?.classList.contains('is-hidden')) {
            generatorEl?.classList.remove('is-hidden');
        }

        const calendarEl = document.getElementById('calendar-display');
        if (!calendarEl?.classList.contains('is-hidden')) {
            calendarEl?.classList.add('is-hidden');
        }

        const hideCalendarButton = document.getElementById('hide-calendar') as HTMLButtonElement;
        if (!hideCalendarButton?.classList.contains('is-hidden')) {
            hideCalendarButton?.classList.add('is-hidden');
        }
    }

    private buildMonths(dateRange: IDateRange, settings: CalendarSettings, parent: HTMLElement) {
        let columnCnt = 0;
        let currentPage = this.appendPage(parent);

        const startDate = dateRange.start.startOf('month');
        const endDate = dateRange.end.startOf('month');
        let currentDate = startDate;
        let monthIndex = 0;

        // TODO: Add row number support
        // TODO: Choose fg color based on bg color to have the best contrast (hint: use the css lch function)

        do {
            if (columnCnt >= settings.columns && columnCnt > 0) {
                currentPage = this.appendPage(parent);
                columnCnt = 0;
            }

            const monthEl = document.createElement("div") as HTMLDivElement;
            monthEl.classList.add("month-container");
            monthEl.style.width = `calc(100% / ${settings.columns})`;

            // Set up title
            const monthTitleEl = document.createElement("div");
            monthTitleEl.classList.add("month-title");
            monthTitleEl.style.backgroundColor = settings.colors[monthIndex % 12];

            const titleSpan = document.createElement("span") as HTMLSpanElement;
            titleSpan.classList.add("month-title-inner");
            titleSpan.insertAdjacentText("afterbegin", currentDate.monthLong ?? "");

            monthTitleEl.appendChild(titleSpan);
            monthEl.appendChild(monthTitleEl);

            for (let i = 0; i < 31; i++) {
                this.buildDay((currentDate.daysInMonth ?? 0) < i + 1 ? null : currentDate.plus({ days: i }), monthIndex, settings, monthEl);
            }

            // Set up footer
            const monthFooter = document.createElement("div");
            monthFooter.classList.add("month-footer");
            monthFooter.style.backgroundColor = settings.colors[monthIndex % 12];

            monthEl.appendChild(monthFooter);
            currentPage.appendChild(monthEl);

            columnCnt++
            monthIndex++;
            currentDate = startDate.plus({ month: monthIndex });
        } while (currentDate < endDate)
    }

    private appendPage(parent: HTMLElement): HTMLElement {
        const newPage = document.createElement("section");
        newPage.classList.add("page");

        parent.appendChild(newPage);
        return newPage;
    }

    private buildDay(date: DateTime | null, monthIndex: number, settings: CalendarSettings, parent: HTMLElement) {
        const dayEl = document.createElement("div");
        dayEl.classList.add("day-container");

        const dayNum = document.createElement("div");
        dayNum.classList.add("day-cell");
        dayNum.classList.add("day-num");
        dayEl.appendChild(dayNum);

        const weekDay = document.createElement("div");
        weekDay.classList.add("day-cell");
        weekDay.classList.add("week-day");
        dayEl.appendChild(weekDay);

        if (date !== null) {
            // Insert current day and weekday if we have a date
            dayNum.insertAdjacentText("afterbegin", date.day.toString());
            weekDay.insertAdjacentText("afterbegin", date.weekdayLong ?? "");

            if (date.isWeekend && settings.colorWeekends) {
                // Color in weekends
                dayEl.style.backgroundColor = settings.colors[monthIndex % 12];
            }
        }

        for (let i = 0; i < settings.cellsPerDay; i++) {
            // Add cells to enter events
            const eventCell = document.createElement("div");
            eventCell.classList.add("day-cell");
            eventCell.classList.add("event-cell");
            dayEl.appendChild(eventCell);
        }

        parent.appendChild(dayEl);
    }

    private getDateRange(): IDateRange | null {
        const startDateEl = document.getElementById('start-date');
        const endDateEl = document.getElementById('end-date');

        if (startDateEl === null || endDateEl === null) return null;

        const startDate = (startDateEl as HTMLInputElement).valueAsDate;
        const endDate = (endDateEl as HTMLInputElement).valueAsDate;

        if (startDate === null || endDate === null) return null;

        const dateRange: IDateRange = { start: DateTime.fromJSDate(startDate), end: DateTime.fromJSDate(endDate) }

        if (dateRange.start.isValid && dateRange.end.isValid) {
            return dateRange;
        }

        return null;
    }
}