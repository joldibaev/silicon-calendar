import {Pipe, PipeTransform} from '@angular/core';
import {DateEx} from "../types/date.class";

@Pipe({
  name: 'isEqual',
  standalone: true
})
export class IsEqualPipe implements PipeTransform {
  transform(date1: DateEx, date2: DateEx): boolean {
    return date1.isEqual(date2);
  }
}
