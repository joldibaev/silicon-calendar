import {Injectable} from '@angular/core';
import {NgxCalendarOptions} from "../types/options.interface";

@Injectable()
export class OptionsService {
  options: NgxCalendarOptions = {
    datePipeFormat: 'dd',
    allowClickDisableDate: true,
    startFromMonday: true,
    showAnotherMonths: {
      previousMonth: true,
      nextMonth: true,
    },
    checkToday: true
  };
}
