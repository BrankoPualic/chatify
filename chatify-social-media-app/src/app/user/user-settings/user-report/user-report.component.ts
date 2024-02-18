import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ScaleAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css'],
  animations: [ScaleAnimation],
})
export class UserReportComponent implements OnInit {
  @Input() showModal: boolean;
  @Output() closeModalEmit: EventEmitter<boolean> = new EventEmitter();
  report: FormGroup;
  reasons: any[] = [];
  reasonSelected: string = '';

  isPhoneOrTablet$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));

    this.report = this.fb.group({
      reason: ['0', Validators.required],
      report_data: [''],
    });

    // Fetch report reasons
    this.userService.getReportReasons().subscribe({
      next: (reposnse: any) => {
        this.reasons = reposnse;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // Showing details for selected reason
  onReasonSelected(value: string) {
    if (value === '0') {
      this.reasonSelected = '';
      this.report.get('reason')?.setValue(0);
      return;
    }
    const detail = this.reasons.filter((el) => {
      if (el.report_reason_id == value) return el.detail;
    });
    this.reasonSelected = detail[0].detail;
  }

  // Submiting a report
  submitReport() {
    if (this.report.get('reason')?.value !== '0') {
      const user = this.authService.getUserFromToken() as { userId: number };
      const reporterId = user.userId;

      this.route.params.subscribe((params: Params) => {
        const reportedId = +params['id'];
        const pack = {
          you: reporterId,
          him: reportedId,
          report: this.report.value,
        };
        this.userService.sendReport(pack).subscribe({
          next: (response: any) => {
            console.log(response.message);
            this.closeModalEmit.emit(false);
          },
          error: (error) => {
            console.error(error);
          },
        });
      });
    }
  }

  // Modal closing
  closeModal() {
    this.closeModalEmit.emit(false);
  }
}
