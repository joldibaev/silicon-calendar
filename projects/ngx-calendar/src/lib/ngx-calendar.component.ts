import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {NgxCalendarMonthComponent} from "./components/ngx-calendar-month/ngx-calendar-month.component";
import {NgxCalendarOptions} from "./types/options";
import {OptionsService} from "./services/options.service";
import {DateEx} from "./types/date-ex";
import {Presented} from "./types/presented";
import {MAX_MONTHS_VALUE, MIN_MONTHS_VALUE} from "./types/month";

@Component({
  selector: 'ngx-calendar',
  templateUrl: './ngx-calendar.component.html',
  styleUrl: './ngx-calendar.component.scss',
  standalone: true,
  imports: [NgxCalendarMonthComponent],
  providers: [OptionsService]
})
export class NgxCalendar implements OnInit {
  private optionsService = inject(OptionsService);

  protected presented: Presented = this.todayAsPresented;

  date = new DateEx();

  @Input() options?: Partial<NgxCalendarOptions>;
  @Output() selected = new EventEmitter<DateEx>();

  ngOnInit() {
    if (this.options) {
      this.optionsService.options = {
        ...this.optionsService.options,
        ...this.options
      }
    }
  }

  navigateTo(year: number, month: number) {
    this.checkMonth(month);

    this.presented = {month, year};
  }

  select(year: number, month: number, date: number) {
    this.checkMonth(month);

    this.date = new DateEx(year, month, date);
  }

  toPrevMonth() {
    this.presented.month--;

    if (this.presented.month < 0) {
      this.presented.month = 11;
      this.presented.year--;
    }
  }

  toCurrentMonth() {
    this.presented = this.todayAsPresented;
  }

  toNextMonth() {
    this.presented.month++;

    if (this.presented.month > 11) {
      this.presented.month = 0;
      this.presented.year++;
    }
  }

  private checkMonth(month: number) {
    if (month < MIN_MONTHS_VALUE || month > MAX_MONTHS_VALUE) {
      throw new Error(`Month can be from ${MIN_MONTHS_VALUE} to ${MAX_MONTHS_VALUE}`);
    }
  }

  protected selectedDateChange(date: DateEx) {
    this.selected.emit(date);
  }

  private get todayAsPresented() {
    return new DateEx().toPresented();
  }
}
