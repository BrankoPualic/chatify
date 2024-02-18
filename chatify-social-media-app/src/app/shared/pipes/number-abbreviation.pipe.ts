import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberAbbreviation',
})
export class NumberAbbreviationPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1000) {
      const abbrevations = ['', 'k', 'M', 'B', 'T'];
      const step = 1000;
      let i = 0;

      while (value >= step && i < abbrevations.length - 1) {
        value /= step;
        i++;
      }
      if (value >= 1 && value < 10 && value % 1 !== 0) {
        return value.toFixed(3);
      } else {
        return value.toFixed(1) + abbrevations[i];
      }
    } else if (value === 0) {
      return '0';
    } else {
      return value.toFixed(0);
    }
  }
}
