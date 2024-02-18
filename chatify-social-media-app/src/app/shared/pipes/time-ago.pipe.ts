import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string): string {
    const currentDate = new Date();
    // const timeDifference = currentDate.getTime() - new Date(value).getTime();
    const dbDateObj = new Date(value);
    const localDbDate = new Date(
      dbDateObj.getTime() + dbDateObj.getTimezoneOffset() * 60000
    );

    // Get the timestamp (milliseconds) of the converted date
    const dbTimestamp = localDbDate.getTime();

    const timeDifference = currentDate.getTime() - dbTimestamp;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return years + 'y';
    } else if (months > 0) {
      return months + 'm';
    } else if (days > 0) {
      return days + 'd';
    } else if (hours > 0) {
      return hours + 'h';
    } else if (minutes > 0) {
      return minutes + 'min';
    } else {
      return '1min';
    }
  }
}
