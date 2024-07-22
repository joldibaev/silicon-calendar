import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'isEqual',
  standalone: true
})
export class IsEqualPipe implements PipeTransform {
  transform(date1: Date, date2: Date): boolean {
    return date1.toLocaleDateString() === date2.toLocaleDateString();
  }
}
