export interface CalendarSettings {
    colors: string[];
    cellsPerDay: number;
    columns: number;
    rows: number;
    startDate: Date;
    endDate: Date;
    showCW: boolean;
    colorWeekends: boolean;
}

const defaultCalendarSettings: CalendarSettings = {
    colors: [
        '#5A2328',
        '#ADF7B6',
        '#50808E',
        '#FFEE93',
        '#FF88DC',
        '#B4E1FF',
        '#79ADDC',
        '#06D6A0',
        '#FFC09F',
        '#AB87FF',
        '#ef3f3f',
        '#048A81'
    ],
    cellsPerDay: 5,
    columns: 3,
    rows: 1,
    startDate: new Date(), // Today's date
    endDate: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()), // Next year's date
    showCW: true,
    colorWeekends: true
};


export class CalendarSettingsHandler {
    private calendarSettings: CalendarSettings;

    constructor(settings?: CalendarSettings) {
        this.calendarSettings = settings ?? defaultCalendarSettings;
    }

    getSettings() {
        return this.calendarSettings;
    }

    setSettings(settings: CalendarSettings) {
        this.calendarSettings = settings;
    }

    init(generateFunction: (settings: CalendarSettings) => void) {
        const generateButton = document.getElementById('generate') as HTMLButtonElement;
        const startDateInput = document.getElementById('start-date') as HTMLInputElement;
        const endDateInput = document.getElementById('end-date') as HTMLInputElement;
        const showCWInput = document.getElementById('show-cw') as HTMLInputElement;
        const colorWeekendsInput = document.getElementById('color-weekends') as HTMLInputElement;
        const rowsInput = document.getElementById('rows') as HTMLInputElement;
        const columnsInput = document.getElementById('columns') as HTMLInputElement;
        const cellsPerDayInput = document.getElementById('cells-per-day') as HTMLInputElement;
        const horizontalToggle = document.getElementById('horizontal-toggle') as HTMLButtonElement;
        const verticalToggle = document.getElementById('vertical-toggle') as HTMLButtonElement;

        startDateInput.valueAsDate = this.calendarSettings.startDate;
        endDateInput.valueAsDate = this.calendarSettings.endDate;
        showCWInput.checked = this.calendarSettings.showCW;
        colorWeekendsInput.checked = this.calendarSettings.colorWeekends;
        rowsInput.value = this.calendarSettings.rows.toString();
        columnsInput.value = this.calendarSettings.columns.toString();
        cellsPerDayInput.value = this.calendarSettings.cellsPerDay.toString();

        if (horizontalToggle.getAttribute('selected') === null) {
            horizontalToggle.setAttribute('selected', '');
        }

        if (verticalToggle.getAttribute('selected') !== null) {
            verticalToggle.removeAttribute('selected');
        }

        generateButton.disabled = !this.validateSettings();

        startDateInput.addEventListener('input', () => {
            this.calendarSettings.startDate = startDateInput.valueAsDate ?? new Date();

            generateButton.disabled = !this.validateSettings();
        });

        endDateInput.addEventListener('input', () => {
            this.calendarSettings.endDate = endDateInput.valueAsDate ?? new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate());

            generateButton.disabled = !this.validateSettings();
        });

        showCWInput.addEventListener('input', () => {
            this.calendarSettings.showCW = showCWInput.checked;
            generateButton.disabled = !this.validateSettings();

        });

        colorWeekendsInput.addEventListener('input', () => {
            this.calendarSettings.colorWeekends = colorWeekendsInput.checked;
            generateButton.disabled = !this.validateSettings();

        });

        rowsInput.addEventListener('input', () => {
            this.calendarSettings.rows = parseInt(rowsInput.value) || 1;
            generateButton.disabled = !this.validateSettings();

        });

        columnsInput.addEventListener('input', () => {
            this.calendarSettings.columns = parseInt(columnsInput.value) || 3;
            generateButton.disabled = !this.validateSettings();

        });

        cellsPerDayInput.addEventListener('input', () => {
            this.calendarSettings.cellsPerDay = parseInt(cellsPerDayInput.value) || 5;
            generateButton.disabled = !this.validateSettings();
        });

        horizontalToggle.addEventListener('click', () => {
            if (horizontalToggle.getAttribute('selected') === null) {
                horizontalToggle.setAttribute('selected', '');
                verticalToggle.removeAttribute('selected');
            } else {
                horizontalToggle.removeAttribute('selected');
                verticalToggle.setAttribute('selected', '');
            }
        });

        verticalToggle.addEventListener('click', () => {
            if (verticalToggle.getAttribute('selected') === null) {
                verticalToggle.setAttribute('selected', '');
                horizontalToggle.removeAttribute('selected');
            } else {
                verticalToggle.removeAttribute('selected');
                horizontalToggle.setAttribute('selected', '');
            }
        });

        generateButton.addEventListener('click', () => {
            generateFunction(this.calendarSettings);
        });
    }

    validateSettings() {
        const startDate = this.calendarSettings.startDate;
        const endDate = this.calendarSettings.endDate;

        if (startDate > endDate) {
            alert('Start date must be before end date');
            return false;
        }

        if (this.calendarSettings.rows < 1 || this.calendarSettings.rows > 10) {
            alert('Rows must be between 1 and 10');
            return false;
        }

        if (this.calendarSettings.columns < 1 || this.calendarSettings.columns > 10) {
            alert('Columns must be between 1 and 10');
            return false;
        }

        if (this.calendarSettings.cellsPerDay < 1 || this.calendarSettings.cellsPerDay > 50) {
            alert('Cells per day must be between 1 and 50');
            return false;
        }

        if (this.calendarSettings.colors.length < 12) {
            alert('At least 12 colors must be set');
            return false;
        }

        if (this.calendarSettings.colors.length > 12) {
            alert('At most 12 colors can be set');
            return false;
        }

        for (const color of this.calendarSettings.colors) {
            if (!color.startsWith('#') || color.length !== 7) {
                alert('Colors must be in hex format');
                return false;
            }
        }

        return true;
    }
}
