import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenTextPipe implements PipeTransform {
  transform(value: string) {
    if (!value) return value;
    if (typeof value !== 'string') {
      throw new Error(
        'Value which the pipe is being called upon is not of type string!'
      );
    }
    if (value.length > 350) {
      const newText = value.substring(0, 300) + '...';
      return newText;
    }
    return value;
  }
}
