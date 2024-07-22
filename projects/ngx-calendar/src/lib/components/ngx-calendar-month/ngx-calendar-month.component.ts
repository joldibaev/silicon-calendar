import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CalendarService} from "../../services/calendar.service";
import {Month} from "../../types/month.type";
import {DatePipe} from "@angular/common";
import {NgxCalendarDateComponent} from "../ngx-calendar-date/ngx-calendar-date.component";
import {IsEqualPipe} from "../../pipes/is-equal.pipe";
import {OptionsService} from "../../services/options.service";

@Component({
  selector: 'ngx-calendar-month',
  templateUrl: './ngx-calendar-month.component.html',
  styleUrl: './ngx-calendar-month.component.scss',
  standalone: true,
  imports: [
    DatePipe,
    IsEqualPipe,
    NgxCalendarDateComponent,
  ],
})
export class NgxCalendarMonthComponent implements OnChanges {
  private calendarService = inject(CalendarService);
  private optionsService = inject(OptionsService);

  @Input({required: true}) month: Month = 0;

  @Input() allowClickPrevMonthDates = false;

  year = new Date().getFullYear();
  today = this.calendarService.getCleanTodayDate();

  prevMonthDates?: Date[];
  nextMonthDates?: Date[];
  dates?: Date[];

  noInteractPrevMonth = !this.optionsService.options.allowClickDisableDate;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['month']) {
      this.setMonth(this.month);
    }
  }

  get firstDate() {
    return this.calendarService.getCleanDate(this.year, this.month, 1);
  }

  get lastDate() {
    return this.calendarService.getCleanDate(this.year, this.month + 1, 0);
  }

  private get startDay(): number {
    return Number(this.optionsService.options.startFromMonday);
  }

  setMonth(month: number) {
    const date = new Date();
    date.setMonth(month);

    this.prevMonthDates = this.getRestPrevMonthDates();
    this.nextMonthDates = this.getRestNextMonthDates();
    this.dates = this.getCurrentMonthDates();
  }

  private getRestPrevMonthDates() {
    // get the first day of the month
    const dayOne = this.firstDate.getDay() - this.startDay;

    // get the last date of the previous month
    const prevMonthLastDate = new Date(this.year, this.month, 0).getDate();

    // loop to add the last dates of the previous month
    const prevMonthDates: Date[] = [];

    for (let i = dayOne; i > 0; i--) {
      const date = prevMonthLastDate - i + 1;
      const cleanDate = this.calendarService.getCleanDate(this.year, this.month - 1, date);
      prevMonthDates.push(cleanDate);
    }

    return prevMonthDates;
  }

  private getCurrentMonthDates() {
    return Array.from({length: this.lastDate.getDate()}, (_, i) => new Date(this.year, this.month, i + 1))
  }

  private getRestNextMonthDates() {
    // get the day of the last date of the month
    const dayEnd = new Date(this.year, this.month, this.lastDate.getDate()).getDay() - this.startDay;

    // loop to add the last dates of the previous month
    const nextMonthDates: Date[] = [];

    for (let i = dayEnd; i < 6; i++) {
      const date = i - dayEnd + 1;
      const cleanDate = this.calendarService.getCleanDate(this.year, this.month - 1, date);
      nextMonthDates.push(cleanDate);
    }

    return nextMonthDates;
  }
}
