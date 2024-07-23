import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Month} from "../../types/month.type";
import {DatePipe} from "@angular/common";
import {NgxCalendarDateComponent} from "../ngx-calendar-date/ngx-calendar-date.component";
import {IsEqualPipe} from "../../pipes/is-equal.pipe";
import {OptionsService} from "../../services/options.service";
import {DateEx} from "../../types/date.class";

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
  private options = inject(OptionsService).options;

  @Input({required: true}) month: Month = 0;

  @Input() allowClickPrevMonthDates = false;

  @Output() selected = new EventEmitter<DateEx>();

  year = new DateEx().getFullYear();
  today = new DateEx();

  prevMonthDates?: DateEx[];
  nextMonthDates?: DateEx[];
  dates?: DateEx[];

  noInteractPrevMonth = !this.options.allowClickDisableDate;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['month']) {
      this.setMonth(this.month);
    }
  }

  get firstDate() {
    return new DateEx(this.year, this.month, 1);
  }

  get lastDate() {
    return new DateEx(this.year, this.month + 1, 0);
  }

  get startDay(): number {
    return Number(this.options.startFromMonday);
  }

  get showAnotherMonths() {
    return this.options.showAnotherMonths;
  }

  setMonth(month: number) {
    const date = new DateEx();
    date.setMonth(month);

    this.prevMonthDates = this.getRestPrevMonthDates();
    this.nextMonthDates = this.getRestNextMonthDates();
    this.dates = this.getCurrentMonthDates();
  }

  private getRestPrevMonthDates(): DateEx[] {
    // get the first day of the month
    const dayOne = this.firstDate.getDay() - this.startDay;

    // get the last date of the previous month
    const prevMonthLastDate = new DateEx(this.year, this.month, 0).getDate();

    // loop to add the last dates of the previous month
    const prevMonthDates: DateEx[] = [];

    for (let i = dayOne; i > 0; i--) {
      const date = prevMonthLastDate - i + 1;
      const cleanDate = new DateEx(this.year, this.month - 1, date);
      prevMonthDates.push(cleanDate);
    }

    return prevMonthDates;
  }

  private getCurrentMonthDates() {
    return Array.from({length: this.lastDate.getDate()}, (_, i) => new DateEx(this.year, this.month, i + 1))
  }

  private getRestNextMonthDates(): DateEx[] {
    // get the day of the last date of the month
    const dayEnd = new DateEx(this.year, this.month, this.lastDate.getDate()).getDay() - this.startDay;

    // loop to add the last dates of the previous month
    const nextMonthDates: DateEx[] = [];

    for (let i = dayEnd; i < 6; i++) {
      const date = i - dayEnd + 1;
      const cleanDate = new DateEx(this.year, this.month - 1, date);
      nextMonthDates.push(cleanDate);
    }

    return nextMonthDates;
  }

  dateClicked(date: DateEx) {
    this.selected.emit(date);
  }
}
