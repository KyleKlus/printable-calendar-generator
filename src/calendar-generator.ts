import { CalendarSettings } from "./settings-handler";

export class CalendarGenerator {
    generate(settings: CalendarSettings) {
        const generatorEl = document.getElementById('generator');
        if (!generatorEl?.classList.contains('is-hidden')) {
            generatorEl?.classList.add('is-hidden');
        }

        const calendarEl = document.getElementById('calendar-display');
        if (calendarEl?.classList.contains('is-hidden')) {
            calendarEl?.classList.remove('is-hidden');
        }

        const hideCalendarButton = document.getElementById('hide-calendar') as HTMLButtonElement;
        hideCalendarButton.addEventListener('click', () => {
            this.hide();
        });
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
    }
}