import { NgModule } from '@angular/core';
import { NumberAbbreviationPipe } from './pipes/number-abbreviation.pipe';
import { ShortenTextPipe } from './pipes/shorten.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { CommonModule } from '@angular/common';
import { UserReportComponent } from '../user/user-settings/user-report/user-report.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NumberAbbreviationPipe,
    ShortenTextPipe,
    TimeAgoPipe,
    UserReportComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    NumberAbbreviationPipe,
    ShortenTextPipe,
    TimeAgoPipe,
    UserReportComponent,
  ],
})
export class SharedModule {}
