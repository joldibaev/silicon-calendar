import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getMonthDaysCount',
  standalone: true
})
export class GetMonthDaysCountPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
