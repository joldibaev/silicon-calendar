import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {NgxCalendarMonthComponent} from "./components/ngx-calendar-month/ngx-calendar-month.component";
import {NgxCalendarOptions} from "./types/options.interface";
import {OptionsService} from "./services/options.service";
import {DateEx} from "./types/date.class";

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

  dateSelected(date: DateEx) {
    this.selected.emit(date)
  }
}
