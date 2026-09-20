import { CalendarGenerator } from "./calendar-generator";
import { CalendarSettingsHandler } from "./settings-handler";

const calendarGenerator = new CalendarGenerator();
const calendarSettingsHandler = new CalendarSettingsHandler();
calendarSettingsHandler.init(calendarGenerator.generate.bind(calendarGenerator));