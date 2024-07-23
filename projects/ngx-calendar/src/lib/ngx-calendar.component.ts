import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {NgxCalendarMonthComponent} from "./components/ngx-calendar-month/ngx-calendar-month.component";
import {NgxCalendarOptions} from "./types/options.interface";
import {OptionsService} from "./services/options.service";
import {DateEx, Presented} from "./types/date-ex";

@Component({
  selector: 'ngx-calendar',
  templateUrl: './ngx-calendar.component.html',
  styleUrl: './ngx-calendar.component.scss',
  standalone: true,
  imports: [
    NgxCalendarMonthComponent
  ],
  providers: [OptionsService]
})
export class NgxCalendar implements OnInit {
  private optionsService = inject(OptionsService);

  private todayAsPresented = new DateEx().toPresented();
  protected presented: Presented = this.todayAsPresented;

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

  navigateTo(presented: Presented) {
    if (presented.month < 0 || presented.month > 12) {
      throw new Error('Month out of range');
    }

    this.presented = {
      month: presented.month,
      year: presented.year
    };
  }

  toPrevMonth() {
    this.presented.month--;

    if (this.presented.month < 0) {
      this.presented.month = 11;
      this.presented.year--;
    }
  }

  toNextMonth() {
    this.presented.month++;

    if (this.presented.month > 12) {
      this.presented.month = 0;
      this.presented.year++;
    }
  }

  protected dateSelected(date: DateEx) {
    this.selected.emit(date)
  }

  get month() {
    return this.presented.month;
  }

  get year() {
    return this.presented.year;
  }
}
