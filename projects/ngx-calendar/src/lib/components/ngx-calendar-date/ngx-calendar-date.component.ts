import {Component, HostBinding, inject, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {OptionsService} from "../../services/options.service";
import {DateEx} from "../../types/date-ex";

@Component({
  selector: 'ngx-calendar-date',
  templateUrl: './ngx-calendar-date.component.html',
  styleUrl: './ngx-calendar-date.component.scss',
  standalone: true,
  imports: [
    DatePipe,
  ],
})
export class NgxCalendarDateComponent implements OnInit {
  private options = inject(OptionsService).options;

  @Input({required: true}) date!: DateEx;
  @Input() hideDate = false;

  @Input() @HostBinding('class.disabled') disabled = false;
  @Input() @HostBinding('class.active') active = false;

  @Input() @HostBinding('class.no-interact') noInteract = false;

  @HostBinding('class.today') today = false;
  @HostBinding('class.check-today') checkToday = this.options.markToday;

  ngOnInit() {
    this.today = this.date.isEqual(new DateEx())
  }

  get pipeFormat() {
    return this.options.datePipeFormat;
  }
}
