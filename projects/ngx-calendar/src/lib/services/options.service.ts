import {Injectable} from '@angular/core';
import {NgxCalendarOptions} from "../types/options.interface";

@Injectable()
export class OptionsService {
  options: Partial<NgxCalendarOptions> = {
    datePipeFormat: 'dd'
  };
}
