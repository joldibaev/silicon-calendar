import {Injectable} from '@angular/core';
import {NgxCalendarOptions} from "../types/options";

@Injectable()
export class OptionsService {
  options: NgxCalendarOptions = {
    datePipeFormat: 'dd',
    interactWithAnotherMonthsDates: false,
    showAnotherMonthsDates: {
      previousMonth: true,
      nextMonth: true,
    },
    showWeeks: true,
    startFromMonday: false,
    markToday: true
  };
}
