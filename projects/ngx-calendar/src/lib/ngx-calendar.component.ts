import {Component, inject, Input, OnInit} from '@angular/core';
import {CalendarService} from "./services/calendar.service";
import {NgxCalendarMonthComponent} from "./components/ngx-calendar-month/ngx-calendar-month.component";
import {NgxCalendarOptions} from "./types/options.interface";
import {OptionsService} from "./services/options.service";

@Component({
  selector: 'ngx-calendar',
  templateUrl: './ngx-calendar.component.html',
  styleUrl: './ngx-calendar.component.scss',
  standalone: true,
  imports: [
    NgxCalendarMonthComponent
  ],
  providers: [CalendarService, OptionsService]
})
export class NgxCalendar implements OnInit {
  private optionsService = inject(OptionsService);

  @Input() options?: Partial<NgxCalendarOptions>;

  ngOnInit() {
    if (this.options) {
      this.optionsService.options = {
        ...this.optionsService.options,
        ...this.options
      }
    }
  }


}
