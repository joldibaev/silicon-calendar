import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CalendarService} from "../../services/calendar.service";
import {Month} from "../../types/month.type";
import {DatePipe} from "@angular/common";
import {NgxCalendarDateComponent} from "../ngx-calendar-date/ngx-calendar-date.component";

@Component({
  selector: 'ngx-calendar-month',
  templateUrl: './ngx-calendar-month.component.html',
  styleUrl: './ngx-calendar-month.component.scss',
  standalone: true,
  imports: [
    DatePipe,
    NgxCalendarDateComponent
  ],
})
export class NgxCalendarMonthComponent implements OnChanges {
  private calendarService = inject(CalendarService);

  @Input({required: true}) month: Month = 0;

  @Input() allowClickPrevMonthDates = false;

  year = new Date().getFullYear();


  firstDate?: Date;
  lastDate?: Date;

  prevMonthDates?: Date[];
  dates?: Date[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['month']) {
      const date = new Date();
      date.setMonth(this.month);

      // ** prev
      this.prevMonthDates = this.preparePrevMonth();

      this.firstDate = this.calendarService.getCleanDate(this.year, this.month, 1);
      this.lastDate = this.calendarService.getCleanDate(this.year, this.month + 1, 0);

      this.dates = Array.from({length: this.lastDate.getDate()}, (_, i) => new Date(this.year, this.month, i + 1));
    }
  }

  private preparePrevMonth() {
    // get the first day of the month
    const dayOne = new Date(this.year, this.month, 1).getDay();

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
}
