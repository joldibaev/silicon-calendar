import {Injectable} from '@angular/core';

@Injectable()
export class CalendarService {
  getCleanTodayDate(hours = 0, min = 0, sec = 0, ms = 0): Date {
    const _date = new Date();
    _date.setHours(hours, min, sec, ms);
    return _date;
  }

  getCleanDate(year: number, month: number, date: number, hours = 0, min = 0, sec = 0, ms = 0): Date {
    const _date = new Date(year, month, date);
    _date.setHours(hours, min, sec, ms);
    return _date;
  }

  getMonthDaysCount(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }
}
