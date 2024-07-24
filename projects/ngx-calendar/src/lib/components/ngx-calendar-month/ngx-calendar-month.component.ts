import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {DatePipe} from "@angular/common";
import {NgxCalendarDateComponent} from "../ngx-calendar-date/ngx-calendar-date.component";
import {IsEqualPipe} from "../../pipes/is-equal.pipe";
import {OptionsService} from "../../services/options.service";
import {DateEx} from "../../types/date-ex";

@Component({
  selector: 'ngx-calendar-month',
  templateUrl: './ngx-calendar-month.component.html',
  styleUrl: './ngx-calendar-month.component.scss',
  standalone: true,
  imports: [DatePipe, IsEqualPipe, NgxCalendarDateComponent,],
})
export class NgxCalendarMonthComponent implements OnChanges {
  protected options = inject(OptionsService).options;

  @Input({required: true}) month!: number;
  @Input({required: true}) year!: number;

  @Input() allowClickPrevMonthDates = false;

  @Input() selectedDate?: DateEx;
  @Output() selectedDateChange = new EventEmitter<DateEx>();

  protected weeks: DateEx[] = [];

  protected prevMonthDates: DateEx[] = [];
  protected nextMonthDates: DateEx[] = [];
  protected dates: DateEx[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['month'] || changes['year']) {
      this.updateDates();

      if (this.options.showWeeks) {
        this.updateWeeks();
      }
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

  updateDates() {
    this.prevMonthDates = this.getRestPrevMonthDates();
    this.nextMonthDates = this.getRestNextMonthDates();
    this.dates = this.getCurrentMonthDates();
  }

  updateWeeks() {
    const totalDays = [...this.prevMonthDates, ...this.dates, ...this.nextMonthDates];

    this.weeks = totalDays.slice(0, 7)
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

    if (dayEnd >= 0) {
      for (let i = dayEnd; i < 6; i++) {
        // console.log(i)
        const date = i - dayEnd + 1;
        const cleanDate = new DateEx(this.year, this.month - 1, date);
        nextMonthDates.push(cleanDate);
      }
    }

    return nextMonthDates;
  }

  dateClicked(date: DateEx) {
    this.selectedDateChange.emit(date);
  }
}
