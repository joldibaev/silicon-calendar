import {Component, HostBinding, inject, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {OptionsService} from "../../services/options.service";

@Component({
  selector: 'ngx-calendar-date',
  templateUrl: './ngx-calendar-date.component.html',
  styleUrl: './ngx-calendar-date.component.scss',
  standalone: true,
  imports: [
    DatePipe
  ],
})
export class NgxCalendarDateComponent {
  @Input({required: true}) date: Date = new Date();

  @Input() @HostBinding('class.disabled') disabled = false;

  private options = inject(OptionsService).options;

  get pipeFormat() {
    return this.options.datePipeFormat;
  }
}
