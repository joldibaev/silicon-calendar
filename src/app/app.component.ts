import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgxCalendar} from "../../projects/ngx-calendar/src/lib/ngx-calendar.component";
import {NgxCalendarOptions} from "../../projects/ngx-calendar/src/lib/types/options.interface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxCalendar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  options: Partial<NgxCalendarOptions> = {
    datePipeFormat: 'dd',
  };
}
