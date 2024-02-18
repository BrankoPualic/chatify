import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  @ViewChild('signinError') signinError: ElementRef;
  @Output() openSignupEmitter: EventEmitter<boolean> = new EventEmitter();
  signin: FormGroup;
  isFocused: boolean = false;

  // Repsonsive
  isPhoneOrTablet$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));

    this.signin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(this.userService.passwordRegex),
        ],
      ],
    });
  }

  onSigninSubmit() {
    this.authService.signin(this.signin.value).subscribe({
      next: (response: any) => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.signinError.nativeElement.innerText = error.error.message;
      },
    });
  }

  openSignup() {
    this.openSignupEmitter.emit(true);
  }
}
