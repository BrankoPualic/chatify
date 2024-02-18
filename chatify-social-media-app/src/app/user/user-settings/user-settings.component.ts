import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable, map } from 'rxjs';
import { ScaleAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
  animations: [ScaleAnimation],
})
export class UserSettingsComponent implements OnInit {
  @ViewChild('main') mainBlock: ElementRef;
  @Output() closeSettings: EventEmitter<boolean> = new EventEmitter();
  reportModal: boolean = false;

  isPhoneOrTablet$: Observable<boolean>;

  constructor(private responsive: BreakpointObserver) {}

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));
  }

  showReportModal() {
    this.reportModal = true;
    this.mainBlock.nativeElement.style.display = 'none';
  }

  closeModal(value: boolean) {
    this.mainBlock.nativeElement.style.display = 'flex';
    this.reportModal = value;
  }

  closeSettingsModal() {
    this.closeSettings.emit(false);
  }
}
