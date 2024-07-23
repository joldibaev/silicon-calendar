import {Component, HostBinding, inject, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {OptionsService} from "../../services/options.service";
import {DateEx} from "../../types/date.class";

@Component({
  selector: 'ngx-calendar-date',
  templateUrl: './ngx-calendar-date.component.html',
  styleUrl: './ngx-calendar-date.component.scss',
  standalone: true,
  imports: [
    DatePipe,
  ],
})
export class NgxCalendarDateComponent {
  private options = inject(OptionsService).options;

  @Input({required: true}) date = new DateEx();
  @Input() hideDate = false;

  @Input() @HostBinding('class.disabled') disabled = false;
  // @Input() @HostBinding('class.active') active = false;
  @Input() @HostBinding('class.today') today = false;

  @Input() @HostBinding('class.no-interact') noInteract = false;

  @HostBinding('class.check-today') checkToday = this.options.checkToday;

  get pipeFormat() {
    return this.options.datePipeFormat;
  }
}
