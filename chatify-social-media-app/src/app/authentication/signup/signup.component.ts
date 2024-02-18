import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signup: FormGroup;
  regionSelected: boolean = false;
  regions: any[] = [];
  countries: any[] = [];
  @ViewChild('signupError') signupError: ElementRef;
  @Output() openSigninEmitter: EventEmitter<boolean> = new EventEmitter();

  // Responsive
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

    // Regions
    this.userService.getRegions().subscribe({
      next: (response: any) => {
        this.regions = response;
      },
      error: (error: any) => {
        console.error(error);
      },
    });

    // Form
    this.signup = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.pattern(this.userService.fullNameRegex),
        ],
      ],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(this.userService.passwordRegex),
        ],
      ],
      region: ['0', Validators.required],
      country: ['', Validators.required],
    });
  }

  onSignupSubmit() {
    const username = this.signup.get('username')?.value.trim();
    this.signup.patchValue({ username: username });
    this.authService.signup(this.signup.value).subscribe({
      next: (response: any) => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.signupError.nativeElement.innerText = error.error.message;
      },
    });
  }

  openSignin() {
    this.openSigninEmitter.emit(false);
  }

  onRegionSelected(value: string) {
    if (value === '0') {
      this.regionSelected = false;
      this.signup.get('country')?.setValue(0);
      return;
    }
    const region = { region: value };
    this.userService.getCountries(region).subscribe({
      next: (response: any) => {
        this.countries = response;
        this.regionSelected = true;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
